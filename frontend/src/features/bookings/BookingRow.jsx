import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
    HiPencil,
    HiTrash,
    HiEye,
    HiArrowUpOnSquare,
    HiArrowDownOnSquare,
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// import { useDeleteBooking } from "../../features/bookings/useDeleteBooking";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
// import { useCheckout } from "../../features/check-in-out/useCheckout";
import { format, isToday } from "date-fns";
import { useEffect, useState } from "react";
import CheckoutButton from "../check-in-out/CheckoutButton";
import {
    useGetBookingsQuery,
    useUpdateCheckOutBookingMutation,
    useDeleteBookingMutation,
} from "../../slices/bookingSlice";
import { toast } from "react-hot-toast";

// v1
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

function BookingRow({ booking }) {
    const {
        _id: bookingId,
        startDate,
        endDate,
        numNights,
        // numGuests,
        totalPrice,
        status,
        user: { fullName: guestName, email },
        cabin: {
            name: cabinName,
            // regularPrice: regularPriceForCabin,
            // discount: discountForCabin,
        },
        // services,
    } = booking;

    const navigate = useNavigate();

    const { refetch } = useGetBookingsQuery();
    const [updateCheckOutBooking, { isLoading: isUpdating }] =
        useUpdateCheckOutBookingMutation();
    const [deleteBooking, { isLoading: isDeleting }] =
        useDeleteBookingMutation();

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    async function handleCheckOut() {
        await updateCheckOutBooking(bookingId);
        toast.success(`Booking successfully checked out`);
        refetch();
        // navigate("/admin/bookings");
    }

    async function handleDelete() {
        await deleteBooking(bookingId);
        toast.success(`Booking successfully deleted`);
        refetch();
        // navigate("/admin/bookings");
    }

    return (
        <Table.Row role="row">
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate))
                        ? "Today"
                        : formatDistanceFromNow(startDate)}{" "}
                    &rarr; {numNights} night stay
                </span>
                <span>
                    {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                    {format(new Date(endDate), "MMM dd yyyy")}
                </span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>

            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={bookingId} />

                    <Menus.List id={bookingId}>
                        <Menus.Button
                            icon={<HiEye />}
                            onClick={() =>
                                navigate(`/admin/bookings/${bookingId}`)
                            }
                        >
                            See details
                        </Menus.Button>

                        {status === "unconfirmed" && (
                            <Menus.Button
                                icon={<HiArrowDownOnSquare />}
                                onClick={() =>
                                    navigate(`/admin/checkin/${bookingId}`)
                                }
                            >
                                Check in
                            </Menus.Button>
                        )}

                        {status === "checked-in" && (
                            <Menus.Button
                                onClick={handleCheckOut}
                                disabled={isUpdating}
                                icon={<HiArrowUpOnSquare />}
                            >
                                Check out
                            </Menus.Button>
                        )}

                        <Modal.Open opens="delete">
                            <Menus.Button icon={<HiTrash />}>
                                Delete booking
                            </Menus.Button>
                        </Modal.Open>
                    </Menus.List>
                </Menus.Menu>

                <Modal.Window name="delete">
                    <ConfirmDelete
                        resourceName="booking"
                        onConfirm={handleDelete}
                        disabled={isDeleting}
                    />
                </Modal.Window>
            </Modal>

            {/* <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={bookingId} />
                    <Menus.List id={bookingId}>
                        <Menus.Button
                            onClick={() => navigate(`/bookings/${bookingId}`)}
                            icon={<HiEye />}
                        >
                            See details
                        </Menus.Button>

                        {status === "unconfirmed" && (
                            <Menus.Button
                                onClick={() =>
                                    navigate(`/checkin/${bookingId}`)
                                }
                                icon={<HiArrowDownOnSquare />}
                            >
                                Check in
                            </Menus.Button>
                        )}

                        {status === "checked-in" && (
                            <Menus.Button
                                onClick={() => checkout(bookingId)}
                                disabled={isCheckingOut}
                                icon={<HiArrowUpOnSquare />}
                            >
                                Check out
                            </Menus.Button>
                        )}

                        <Menus.Button icon={<HiPencil />}>
                            Edit booking
                        </Menus.Button>
                        


                        <Modal.Toggle opens="delete">
                            <Menus.Button icon={<HiTrash />}>
                                Delete booking
                            </Menus.Button>
                        </Modal.Toggle>
                    </Menus.List>
                </Menus.Menu>


                <Modal.Window name="delete">
                    <ConfirmDelete
                        resource="booking"
                        onConfirm={(options) =>
                            deleteBooking(bookingId, options)
                        }
                        disabled={isDeleting}
                    />
                </Modal.Window>
            </Modal> */}

            {/* <div>
        <ButtonWithConfirm
          title='Delete booking'
          description='Are you sure you want to delete this booking? This action can NOT be undone.'
          confirmBtnLabel='Delete'
          onConfirm={() => deleteBooking(bookingId)}
          disabled={isDeleting}
        >
          Delete
        </ButtonWithConfirm>

        <Link to={`/bookings/${bookingId}`}>Details &rarr;</Link>
      </div> */}
        </Table.Row>
    );
}

export default BookingRow;
