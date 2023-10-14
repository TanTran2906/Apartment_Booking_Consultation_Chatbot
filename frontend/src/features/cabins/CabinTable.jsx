import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { StyledTable } from "../../ui/Table";
// import Menus from "ui/Menus";
import Empty from "../../ui/Empty";

// import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useGetCabinsQuery } from "../../slices/cabinSlice";

// v2

// v1
const TableHeader = styled.header`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;

    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;

function CabinTable() {
    const { data: cabins, isLoading, error, refetch } = useGetCabinsQuery();

    if (isLoading) return <Spinner />;
    if (error) return <Empty resource="cabin" />;

    return (
        <StyledTable role="table">
            <TableHeader role="row">
                <div></div>
                <div>Cabin</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </TableHeader>
            {cabins.map((cabin) => (
                <CabinRow cabin={cabin} refetch={refetch} key={cabin._id} />
            ))}
        </StyledTable>
    );
}

export default CabinTable;
