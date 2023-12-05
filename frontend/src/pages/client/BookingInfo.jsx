import styled from "styled-components";
import Heading from "../../ui/Heading";
import CreateBookingForm from "../../ui/client/CreateBookingForm";
import CheckoutSteps from "../../ui/client/CheckoutSteps";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo.email) {
            navigate("/login");
        }
    }, [navigate, userInfo.email]);

    return (
        <>
            <CheckoutSteps step1 step2 currentStep={2}/>
            <StyledContainer>
                <Heading as="h1">Information </Heading>
                <CreateBookingForm />
            </StyledContainer>
        </>
    );
}

export default BookingInfo;
