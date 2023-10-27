import UserRow from "./UserRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
// import Menus from "ui/Menus";
import Empty from "../../ui/Empty";

// import { useSearchParams } from "react-router-dom";
// import styled from "styled-components";
import { useGetUsersQuery } from "../../slices/userSlice";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";

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

function UserTable() {
    const { data: users, isLoading, error, refetch } = useGetUsersQuery();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;
    if (error) return <Empty resource="user" />;

    //1)FILTER
    const filterValue = searchParams.get("active") || "all";
    let filteredUsers;

    if (filterValue === "all") filteredUsers = users;
    if (filterValue === "no-active")
        filteredUsers = users.filter((user) => user.active === false);
    if (filterValue === "with-active")
        filteredUsers = users.filter((user) => user.active === true);

    //2)SORT
    const sortBy = searchParams.get("sortBy") || "createdAt-asc";
    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (field === "fullName") {
            if (a[field] < b[field]) return -1 * modifier;
            if (a[field] > b[field]) return 1 * modifier;
            return 0;
        }
        return (a[field] - b[field]) * modifier;
    });

    //3)PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    //Ví dụ : page = 1 thì sẽ lấy 10 kết quả đầu trong bảng dữ liệu (0-9 theo chỉ mục)
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    // Lấy chỉ dữ liệu từ chỉ mục "from" đến "to" để hiển thị trên trang này
    const dataToDisplay = sortedUsers.slice(from, to);

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 1.8fr 1.2fr 0.5fr 0.5fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Full Name</div>
                    <div>Email</div>
                    <div>National ID</div>
                    <div>Admin</div>
                    <div>Active</div>
                    <div></div>
                </Table.Header>

                <Table.Body>
                    {dataToDisplay.map((user) => (
                        <UserRow user={user} key={user._id} refetch={refetch} />
                    ))}
                </Table.Body>

                {/* Render props pattern - tham khảo */}
                {/* <Table.Body
                data={cabins}
                render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
            /> */}
                <Table.Footer>
                    {sortedUsers.length > 10 && (
                        <Pagination count={sortedUsers.length} />
                    )}
                </Table.Footer>
            </Table>
        </Menus>
    );
}

export default UserTable;
