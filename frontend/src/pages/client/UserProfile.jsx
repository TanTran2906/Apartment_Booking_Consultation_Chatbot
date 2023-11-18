import styled from "styled-components";
import Account from "../Account";
import BookingHistoryTable from "../../ui/client/BookingHistoryTable";
import Heading from "../../ui/Heading";

const StyledContainer = styled.div`
    max-width: calc(100% - 48px);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 45% 55%;
    gap: 30px;
`;

const StyleBooking = styled.div`
    display: flex;
    flex-direction: column;
    gap: 43px;
`;

function UserProfile() {
    return (
        <StyledContainer>
            <div>
                <Account />
            </div>

            <StyleBooking>
                <Heading as="h1">Your Bookings</Heading>
                <BookingHistoryTable />
            </StyleBooking>
        </StyledContainer>
    );
}

export default UserProfile;
