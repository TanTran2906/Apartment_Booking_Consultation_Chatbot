// import styled from 'styled-components';
import BookingRow from "../../features/bookings/BookingRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

import { useGetBookingsQuery } from "../../slices/bookingSlice";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";

// v2

// v1
// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function BookingTable() {
    const { data: bookings, isLoading } = useGetBookingsQuery();

    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;
    if (!bookings) return <Empty resource={"bookings"} />;

    //1)FILTER
    const filterValue = searchParams.get("status");

    //Dùng cho BACKEND (nếu muốn)
    // const filter =
    //     !filterValue || filterValue === "all"
    //         ? null
    //         : { field: "status", value: filterValue };
    // :  { field: "totalPrice", value: 5000, method: "gte" };

    let filteredBookings;

    if (filterValue === "all") filteredBookings = bookings;
    if (filterValue === "unconfirmed")
        filteredBookings = bookings.filter(
            (booking) => booking.status === "unconfirmed"
        );
    if (filterValue === "checked-out")
        filteredBookings = bookings.filter(
            (booking) => booking.status === "checked-out"
        );
    if (filterValue === "checked-in")
        filteredBookings = bookings.filter(
            (booking) => booking.status === "checked-in"
        );

    if (!filteredBookings) filteredBookings = bookings;

    //2)SORT
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedBookings = [...filteredBookings].sort((a, b) => {
        if (field === "startDate" || field === "endDate") {
            return (new Date(a[field]) - new Date(b[field])) * modifier;
        }
        return (a[field] - b[field]) * modifier;
    });

    //3)PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    //Ví dụ : page = 1 thì sẽ lấy 10 kết quả đầu trong bảng dữ liệu (0-9 theo chỉ mục)
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    // Lấy chỉ dữ liệu từ chỉ mục "from" đến "to" để hiển thị trên trang này
    const dataToDisplay = sortedBookings.slice(from, to);

    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                <Table.Body>
                    {dataToDisplay.map((booking) => (
                        <BookingRow key={booking.id} booking={booking} />
                    ))}
                </Table.Body>
                {/* Render props! */}
                {/* <Table.Body
                    data={bookings}
                    render={(booking) => (
                        <BookingRow key={booking.id} booking={booking} />
                    )}
                /> */}

                <Table.Footer>
                    {sortedBookings.length > 10 && (
                        <Pagination count={sortedBookings.length} />
                    )}
                </Table.Footer>
            </Table>
        </Menus>
    );
}

export default BookingTable;
