import ServiceRow from "./ServiceRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
// import Menus from "ui/Menus";
import Empty from "../../ui/Empty";

// import { useSearchParams } from "react-router-dom";
// import styled from "styled-components";
import { useGetServicesQuery } from "../../slices/serviceSlice";
import Menus from "../../ui/Menus";

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

function ServiceTable() {
    const { data: services, isLoading, error, refetch } = useGetServicesQuery();

    if (isLoading) return <Spinner />;
    if (error) return <Empty resource="service" />;

    return (
        <Menus>
            <Table columns="0.5fr 0.5fr 2.5fr 0.3fr 0.3fr 0.3fr">
                <Table.Header>
                    <div></div>
                    <div>Service</div>
                    <div>Description</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div>Add Service</div>
                </Table.Header>

                <Table.Body>
                    {services.map((service) => (
                        <ServiceRow
                            service={service}
                            key={service.id}
                            // refetch={refetch}
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

export default ServiceTable;
