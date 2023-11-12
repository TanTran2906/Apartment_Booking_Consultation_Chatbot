import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import styled from "styled-components";
// import TableOperations from "../../ui/TableOperations";

const TableOperations = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1.6rem;
`;

const Heading = styled.h3`
    color: #191e3b;
    font-size: 2rem;
    font-weight: 500;
    /* text-align: center; */

    line-height: 24px;
`;

function ServiceTableOperations() {
    return (
        <TableOperations>
            <Heading>Filter By</Heading>
            <Filter
                filterField="discount"
                options={[
                    { value: "all", label: "All" },
                    { value: "no-discount", label: "No discount" },
                    { value: "with-discount", label: "With discount" },
                ]}
            />

            <Heading>Sort By</Heading>
            <SortBy
                options={[
                    { value: "name-asc", label: "Sort by name (A-Z)" },
                    { value: "name-desc", label: "Sort by name (Z-A)" },
                    {
                        value: "regularPrice-asc",
                        label: "Sort by price (low first)",
                    },
                    {
                        value: "regularPrice-desc",
                        label: "Sort by price (high first)",
                    },
                ]}
            />
        </TableOperations>
    );
}

export default ServiceTableOperations;
