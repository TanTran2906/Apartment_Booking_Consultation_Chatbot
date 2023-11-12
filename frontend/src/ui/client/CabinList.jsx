import styled from "styled-components";
import CabinItem from "./CabinItem";
import { useGetCabinsQuery } from "../../slices/cabinSlice";
import { useSearchParams } from "react-router-dom";
import Spinner from "../Spinner";
import Empty from "../Empty";
import Pagination from "./Pagination";
import { PAGE_SIZE_CABINS } from "../../utils/constants";

const StyledCabinList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

function CabinList({ dataForSearch }) {
    const { data, isLoading, error } = useGetCabinsQuery();
    const [searchParams] = useSearchParams();

    let cabins = dataForSearch || data;

    if (isLoading) return <Spinner />;
    if (error) return <Empty resource="cabin" />;
    if (!cabins.length) return <Empty resource="cabin" />;

    //1)FILTER
    const filterValue = searchParams.get("discount") || "all";
    let filteredCabins;

    if (filterValue === "all") filteredCabins = cabins;
    if (filterValue === "no-discount")
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    if (filterValue === "with-discount")
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

    //2)SORT
    const sortBy = searchParams.get("sortBy") || "createdAt-asc";
    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedCabins = [...filteredCabins].sort(
        (a, b) => (a[field] - b[field]) * modifier
    );

    //3)PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    //Ví dụ : page = 1 thì sẽ lấy 10 kết quả đầu trong bảng dữ liệu (0-9 theo chỉ mục)
    const from = (page - 1) * PAGE_SIZE_CABINS;
    const to = from + PAGE_SIZE_CABINS;
    // Lấy chỉ dữ liệu từ chỉ mục "from" đến "to" để hiển thị trên trang này
    const dataToDisplay = sortedCabins.slice(from, to);

    return (
        <StyledCabinList>
            {dataToDisplay.map((cabin) => (
                <CabinItem cabin={cabin} key={cabin._id} />
            ))}

            {sortedCabins.length > 3 && (
                <Pagination count={sortedCabins.length} />
            )}
        </StyledCabinList>
    );
}

export default CabinList;
