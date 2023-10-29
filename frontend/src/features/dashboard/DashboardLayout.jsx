import styled from "styled-components";

import DurationChart from "../../features/dashboard/DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import TodayActivity from "../../features/check-in-out/TodayActivity";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { useGetCabinsQuery } from "../../slices/cabinSlice";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const { data: cabins, isLoading } = useGetCabinsQuery();

    const {
        data: bookings,
        isLoading: isLoading1,
        numDays,
    } = useRecentBookings();

    const { confirmedStays, isLoading: isLoading2 } = useRecentStays();

    if (isLoading1 || isLoading2 || isLoading) return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays}
                cabinCount={cabins?.length}
            />
            {/* Liệt kê tất cả các khách đến khách sạn để nhận phòng hoặc trả phòng vào ngày hiện tại  */}
            <TodayActivity />
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart bookings={bookings} numDays={numDays} />
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
