import styled from "styled-components";
import Heading from "../ui/Heading";
import SignUpForm from "../features/authentication/SignUpForm";

const SignupLayout = styled.main`
    min-height: 100vh;
    width: 151.9rem;
    display: grid;
    grid-template-columns: 76rem;
    align-content: center;
    justify-content: center;
    gap: 3.2rem;
    background-color: var(--color-grey-50);

    /* text-align: center; */
`;

function Signup() {
    return (
        <SignupLayout>
            <Heading as="h4" style={{ paddingTop: "8px" }}>
                Sign up
            </Heading>
            <SignUpForm />
        </SignupLayout>
    );
}

export default Signup;
