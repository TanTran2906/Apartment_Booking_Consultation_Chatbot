import styled from "styled-components";
import CabinItem from "./CabinItem";

const StyledCabinList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

function CabinList() {
    return (
        <StyledCabinList>
            <CabinItem />
            <CabinItem />
            <CabinItem />
        </StyledCabinList>
    );
}

export default CabinList;
