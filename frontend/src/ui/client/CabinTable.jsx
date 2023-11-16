import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
// import Menus from "ui/Menus";

// import { useSearchParams } from "react-router-dom";
// import styled from "styled-components";

import Menus from "../../ui/Menus";
import { useSelector } from "react-redux";

// v2

// v1
// const TableHeader = styled.header`
//     display: grid;
//     grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//     column-gap: 2.4rem;
//     align-items: center;

//     background-color: var(--color-grey-50);
//     border-bottom: 1px solid var(--color-grey-100);
//     text-transform: uppercase;
//     letter-spacing: 0.4px;
//     font-weight: 600;
//     color: var(--color-grey-600);
//     padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
    const { cabin, infomation, paymentMethod } = useSelector(
        (state) => state.booking
    );

    let data = [];
    data.push(cabin);

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div>Total</div>
                </Table.Header>

                <Table.Body>
                    {data.map((cabin) => (
                        <CabinRow
                            cabin={cabin}
                            key={cabin.id}
                            infomation={infomation}
                            paymentMethod={paymentMethod}
                        />
                    ))}
                </Table.Body>

                {/* Render props pattern - tham khảo */}
                {/* <Table.Body
                data={cabins}
                render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
            /> */}
            </Table>
        </Menus>
    );
}

export default CabinTable;
