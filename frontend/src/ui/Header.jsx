import styled from "styled-components";

// import { useNavigate } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "./UseAvatar";

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);

    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: flex-end;
`;

function Header() {
    // const navigate = useNavigate();
    return (
        <StyledHeader>
            <HeaderMenu />
            <UserAvatar />
        </StyledHeader>
    );
}

export default Header;
