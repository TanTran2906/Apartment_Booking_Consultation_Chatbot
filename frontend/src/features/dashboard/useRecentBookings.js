import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { useGetBookingsAfterDateQuery } from "../../slices/bookingSlice"
import { NEW_DATE } from "../../utils/constants"
// import { useQuery } from "@tanstack/react-query"


export function useRecentBookings() {
    const [searchParams] = useSearchParams()

    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"))

    const queryDate = subDays(NEW_DATE, numDays).toISOString()

    //Có thể sài React Query để lấy dữ liệu
    //async function fetchBookingsAfterDate(date) {
    //     const response = await fetch(`/api/bookings/getBookingsAfterDate/${date}`);
    //     const data = await response.json();
    //     return data;
    // }

    // const { data, isLoading, isError } = useQuery(
    //     {
    //         queryKey: ["Bookings", numDays],
    //         queryFn: () => fetchBookingsAfterDate(queryDate)
    //     }
    // );

    const { data, isLoading, isError } = useGetBookingsAfterDateQuery(queryDate, {
        refetchOnMountOrArgChange: true, //tự động gọi lại getBookingsAfterDate khi queryDate thay đổi hoặc khi component được mount.
    })

    return { data, isLoading, numDays, isError }
}
