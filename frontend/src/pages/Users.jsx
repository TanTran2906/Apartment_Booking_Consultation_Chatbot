import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UserTable from "../features/users/UserTable";
import UserTableOperations from "../features/users/UserTableOperations";

function Users() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All users</Heading>

                <UserTableOperations />
            </Row>

            <Row>
                <UserTable />
            </Row>
        </>
    );
}

export default Users;
