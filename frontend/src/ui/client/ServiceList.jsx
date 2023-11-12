import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Spinner from "../Spinner";
import Empty from "../Empty";
import Pagination from "./Pagination";
import { PAGE_SIZE_SERVICES } from "../../utils/constants";
import ServiceItem from "./ServiceItem";
import { useGetServicesQuery } from "../../slices/serviceSlice";

const StyledServiceList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

function ServiceList({ dataForSearch }) {
    const { data, isLoading, error } = useGetServicesQuery();
    const [searchParams] = useSearchParams();

    let services = dataForSearch || data;

    if (isLoading) return <Spinner />;
    if (error) return <Empty resource="service" />;
    if (!services.length) return <Empty resource="service" />;

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

    //3)PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    //Ví dụ : page = 1 thì sẽ lấy 10 kết quả đầu trong bảng dữ liệu (0-9 theo chỉ mục)
    const from = (page - 1) * PAGE_SIZE_SERVICES;
    const to = from + PAGE_SIZE_SERVICES;
    // Lấy chỉ dữ liệu từ chỉ mục "from" đến "to" để hiển thị trên trang này
    const dataToDisplay = sortedServices.slice(from, to);

    return (
        <StyledServiceList>
            {dataToDisplay.map((service) => (
                <ServiceItem service={service} key={service._id} />
            ))}

            {sortedServices.length > 3 && (
                <Pagination count={sortedServices.length} />
            )}
        </StyledServiceList>
    );
}

export default ServiceList;
