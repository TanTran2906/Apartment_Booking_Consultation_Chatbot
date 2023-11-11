import styled from "styled-components";
import SidebarTools from "../../ui/client/SidebarTools";
import CabinList from "../../ui/client/CabinList";

const StyledContainer = styled.div`
    width: 1170px;
    max-width: calc(100% - 200px);
    margin: 0 auto;
    display: flex;
    gap: 30px;
`;

function CabinsToDisplay() {
    return (
        <StyledContainer>
            <SidebarTools />
            <CabinList />
        </StyledContainer>
    );
}

export default CabinsToDisplay;
