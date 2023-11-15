import styled from "styled-components";
import Heading from "../../ui/Heading";
import CreateBookingForm from "../../ui/client/CreateBookingForm";

const StyledContainer = styled.div`
    width: 2990px;
    max-width: calc(100% - 50px);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
`;

function BookingInfo() {
    return (
        <StyledContainer>
            <Heading as="h1">Information </Heading>
            <CreateBookingForm />
        </StyledContainer>
    );
}

export default BookingInfo;
