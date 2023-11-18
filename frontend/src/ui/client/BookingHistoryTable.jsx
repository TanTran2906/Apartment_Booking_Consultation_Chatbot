import Table from "../../ui/Table";
// import Menus from "ui/Menus";

// import { useSearchParams } from "react-router-dom";
// import styled from "styled-components";

import Menus from "../../ui/Menus";
import { useGetMyBookingsQuery } from "../../slices/bookingSlice";
import { Spinner } from "react-bootstrap";
import BookingHistoryRow from "./BookingHistoryRow";
import Empty from "../Empty";

// v2

// v1
// const TableHeader = styled.header`
//     display: grid;
//     grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//     column-gap: 2.4rem;
//     align-items: center;

//     background-color: var(--color-grey-50);
//     border-bottom: 1px solid var(--color-grey-100);
//     text-transform: uppercase;
//     letter-spacing: 0.4px;
//     font-weight: 600;
//     color: var(--color-grey-600);
//     padding: 1.6rem 2.4rem;
// `;

function BookingHistoryTable() {
    const { data: mybookings = [], isLoading } = useGetMyBookingsQuery();

    if (isLoading) return <Spinner />;

    if (mybookings?.length === 0) return <Empty resource="booking" />;

    return (
        <Menus>
            <Table columns="1fr 1.5fr 1.5fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Check-in</div>
                    <div>Check-out</div>
                    <div>Total</div>
                    <div>Paid</div>
                    <div></div>
                </Table.Header>

                <Table.Body>
                    {mybookings.map((booking) => (
                        <BookingHistoryRow
                            booking={booking}
                            key={booking._id}
                        />
                    ))}
                </Table.Body>

                {/* Render props pattern - tham khảo */}
                {/* <Table.Body
                data={cabins}
                render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
            /> */}
            </Table>
        </Menus>
    );
}

export default BookingHistoryTable;
