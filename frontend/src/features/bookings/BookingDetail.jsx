import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import { useGetBookingDetailsQuery } from "../../slices/bookingSlice";
import CheckoutButton from "../check-in-out/CheckoutButton";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    // const { booking } = useBooking();
    // const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
    // const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();
    const { bookingId } = useParams();
    const { data: booking, isLoading } = useGetBookingDetailsQuery(bookingId, {
        refetchOnMountOrArgChange: true, //tự động gọi lại getBookingDetails khi bookingId thay đổi hoặc khi component được mount.
    });

    const moveBack = useMoveBack();
    const navigate = useNavigate();

    if (isLoading) return <Spinner />;
    if (!booking) return <Empty resource="booking" />;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    const { _id, status } = booking;

    // We return a fragment so that these elements fit into the page's layout
    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading type="h1">Booking #{_id}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status?.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            {!isLoading && <BookingDataBox booking={booking} />}

            <ButtonGroup>
                {status === "unconfirmed" && (
                    <Button onClick={() => navigate(`/admin/checkin/${_id}`)}>
                        Check in
                    </Button>
                )}

                {status === "checked-in" && (
                    <CheckoutButton bookingId={bookingId} />
                )}

                {/* <Modal>
                    <Modal.Toggle opens="delete">
                        <Button variation="danger">Delete booking</Button>
                    </Modal.Toggle>
                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resource="booking"
                            // These options will be passed wherever the function gets called, and they determine what happens next
                            onConfirm={(options) => deleteBooking(id, options)}
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </Modal> */}

                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
