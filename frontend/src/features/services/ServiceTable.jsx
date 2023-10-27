import ServiceRow from "./ServiceRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
// import Menus from "ui/Menus";
import Empty from "../../ui/Empty";

// import { useSearchParams } from "react-router-dom";
// import styled from "styled-components";
import { useGetServicesQuery } from "../../slices/serviceSlice";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

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
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;
    if (error) return <Empty resource="service" />;

    //1)FILTER
    const filterValue = searchParams.get("discount") || "all";
    let filteredServices;

    if (filterValue === "all") filteredServices = services;
    if (filterValue === "no-discount")
        filteredServices = services.filter((service) => service.discount === 0);
    if (filterValue === "with-discount")
        filteredServices = services.filter((service) => service.discount > 0);

    //2)SORT
    const sortBy = searchParams.get("sortBy") || "createdAt-asc";
    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedServices = [...filteredServices].sort((a, b) => {
        if (field === "name") {
            if (a[field] < b[field]) return -1 * modifier;
            if (a[field] > b[field]) return 1 * modifier;
            return 0;
        }
        return (a[field] - b[field]) * modifier;
    });
    //Sắp xếp với chuỗi kí tự
    // if (field === "name") {
    //     const sortedServices = [...filteredServices].sort((a, b) => {
    //         if (a[field] < b[field]) return -1 * modifier;
    //         if (a[field] > b[field]) return 1 * modifier;
    //         return 0;
    //     });
    // } else {
    //     const sortedServices = [...filteredServices].sort(
    //         (a, b) => (a[field] - b[field]) * modifier
    //     );
    // }
    // console.log(sortBy, field, direction);

    return (
        <Menus>
            <Table columns="0.6fr 1.2fr 3.6fr 0.5fr 0.5fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Service</div>
                    <div>Description</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                <Table.Body>
                    {sortedServices.map((service) => (
                        <ServiceRow
                            service={service}
                            key={service.id}
                            refetch={refetch}
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
