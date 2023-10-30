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

import { useMoveBack } from "../../hooks/useMoveBack";

import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
    useGetBookingsQuery,
    useGetBookingDetailsQuery,
    useUpdateCheckinBookingMutation,
} from "../../slices/bookingSlice";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
// import { ComponentToPrint } from "./ComponentToPrint";
// import { useGetServicesQuery } from "../../slices/serviceSlice";

const Box = styled.div`
    padding: 3.2rem 4rem;

    padding: 2.4rem 4rem;
`;

const ComponentToPrint = styled.div``;

function CheckinBooking() {
    const { bookingId } = useParams();
    const moveBack = useMoveBack();
    const navigate = useNavigate();
    const componentRef = useRef();

    const [confirmPaid, setConfirmPaid] = useState(false);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // const [addService, setAddService] = useState(false);

    // const { data: servicesData, isLoading: isLoadingServices } =
    //     useGetServicesQuery();

    const { refetch } = useGetBookingsQuery();
    const [updateCheckinBooking, { isLoading: isUpdating }] =
        useUpdateCheckinBookingMutation();
    const { data: booking, isLoading: isLoadingBooking } =
        useGetBookingDetailsQuery(bookingId);

    useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

    if (isLoadingBooking) return <Spinner />;

    const { totalPrice, user } = booking;

    // const hasService = Boolean(services.length);

    async function handleCheckin() {
        if (!confirmPaid) return;
        await updateCheckinBooking(bookingId);
        toast.success(`Booking successfully checked in`);
        refetch();
        navigate("/admin/bookings");
        handlePrint();
    }

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
            <ComponentToPrint ref={componentRef}>
                <Row type="horizontal">
                    <Heading type="h1">Check in booking #{bookingId}</Heading>
                    {/* <ButtonText onClick={moveBack}>&larr; Back</ButtonText> */}
                </Row>

                <BookingDataBox booking={booking} />

                <Box>
                    <Checkbox
                        checked={confirmPaid}
                        disabled={confirmPaid || isUpdating}
                        onChange={() => setConfirmPaid((confirm) => !confirm)}
                        id="confirm"
                    >
                        I confirm that {user.fullName} has paid the total amount
                        of {formatCurrency(totalPrice)}
                    </Checkbox>
                </Box>
            </ComponentToPrint>

            {/* LATER */}
            {/* {!hasService &&
                servicesData.map((service) => (
                    <Box>
                        <Checkbox
                            checked={addService}
                            onChange={() => {
                                setAddService((add) => !add);
                                setConfirmPaid(false);
                            }}
                            id={service.name}
                            key={service._id}
                        >
                            Want to add {service.name} for{" "}
                            {formatCurrency(
                                service.regularPrice - service.discount
                            )}
                            ?
                        </Checkbox>
                    </Box>
                ))} */}

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
                <Button
                    onClick={handleCheckin}
                    disabled={isUpdating || !confirmPaid}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
