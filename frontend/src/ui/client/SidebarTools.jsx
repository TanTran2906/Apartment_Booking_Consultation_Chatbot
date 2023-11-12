import styled from "styled-components";
// import { FaSearch } from "react-icons/fa";
import ServiceTableOperations from "./ServiceTableOperations";

const StyledSidebarTools = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;

const StyledFindTool = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: #191e3b;

    line-height: 18px;
    /* margin: 24px 0px 0px;
    padding: 24px 0px; */
`;

const Heading = styled.h3`
    color: #191e3b;
    font-size: 2rem;
    font-weight: 500;
    /* text-align: center; */

    line-height: 24px;
`;

const StyledFind = styled.div`
    display: flex;
    gap: 20px;
`;

const Input = styled.input`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-radius: 8px;
    color: #191e3b;
    font-size: 1.8rem;
    font-weight: 500;

    /* line-height: 20px; */
    padding: 12px 16px;
`;

// const Button = styled.button`
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
//     color: #ffffff;
//     background-color: #1668e3;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;

function SidebarTools({ search, setSearch }) {
    return (
        <>
            <StyledSidebarTools>
                <StyledFindTool>
                    <Heading>Search by property name</Heading>
                    <StyledFind>
                        <Input
                            type="text"
                            placeholder="e.g.Wood"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {/* <Button disabled={isSearching}>
                            <FaSearch />
                        </Button> */}
                    </StyledFind>
                </StyledFindTool>

                <ServiceTableOperations />
            </StyledSidebarTools>
        </>
    );
}

export default SidebarTools;
