import styled from "styled-components";

const StyledLogo = styled.div`
    text-align: center;
`;

const Img = styled.img`
    height: 14.6rem;
    width: auto;
`;

function Logo() {
    return (
        <StyledLogo>
            <Img src="/logo_light_transparent.png" alt="Logo" />
        </StyledLogo>
    );
}

export default Logo;
