import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import BookingDataBox from "../../features/bookings/BookingDataBox";

// import { useBooking } from "../../features/bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
// import { useCheckin } from "./useCheckin";

import styled from "styled-components";
import { useGetBookingDetailsQuery } from "../../slices/bookingSlice";
import { useParams } from "react-router-dom";
// import { box } from "styles/styles";
// import { useSettings } from "features/settings/useSettings";

const Box = styled.div`
    padding: 3.2rem 4rem;

    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);

    // const { booking, isLoading } = useBooking();
    const { bookingId } = useParams();
    const { data: booking = {}, isLoading } =
        useGetBookingDetailsQuery(bookingId);
    // const { mutate: checkin, isLoading: isCheckingIn } = useCheckin();
    const moveBack = useMoveBack();
    // const { isLoading: isLoadingSettings, settings } = useSettings();

    useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

    if (isLoading) return <Spinner />;

    // const { _id, guests, totalPrice, numGuests, hasBreakfast, numNights } =
    //     booking;
    const {
        _id,
        // bookingDate,
        // startDate,
        // endDate,
        // numNights,
        numGuests,
        totalPrice,
        // status,
        // observations,
        // isPaid,
        user,
        services,
    } = booking;

    const hasService = Boolean(services.length);

    // const optionalBreakfastPrice =
    //     numNights * settings.breakfastPrice * numGuests;

    // function handleCheckin() {
    //     if (!confirmPaid) return;

    //     if (addBreakfast)
    //         checkin({
    //             bookingId,
    //             breakfast: {
    //                 hasBreakfast: true,
    //                 extrasPrice: optionalBreakfastPrice,
    //                 totalPrice: totalPrice + optionalBreakfastPrice,
    //             },
    //         });
    //     else checkin({ bookingId, breakfast: {} });
    // }

    // We return a fragment so that these elements fit into the page's layout
    return (
        <>
            <Row type="horizontal">
                <Heading type="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {/* LATER */}
            {/* {!hasService && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((add) => !add);
                            setConfirmPaid(false);
                        }}
                        id="breakfast"
                    >
                        Want to add breakfast for{" "}
                        {formatCurrency(optionalBreakfastPrice)}?
                    </Checkbox>
                </Box>
            )} */}

            {/* <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    // If the guest has already paid online, we can't even undo this
                    disabled={isCheckingIn || confirmPaid}
                    id="confirm"
                >
                    I confirm that {guests.fullName} has paid the total amount
                    of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(
                              totalPrice + optionalBreakfastPrice
                          )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                              optionalBreakfastPrice
                          )} for breakfast)`}
                </Checkbox>
            </Box> */}

            <ButtonGroup>
                {/* <Button
                    onClick={handleCheckin}
                    disabled={isCheckingIn || !confirmPaid}
                >
                    Check in booking #{bookingId}
                </Button> */}
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
