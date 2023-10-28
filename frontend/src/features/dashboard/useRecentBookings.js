import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { useGetBookingsAfterDateQuery } from "../../slices/bookingSlice"

export function useRecentBookings() {
    const [searchParams] = useSearchParams()

    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"))

    const queryDate = subDays(new Date(), numDays).toISOString()

    const { data, isLoading, error } = useGetBookingsAfterDateQuery(queryDate, {
        refetchOnMountOrArgChange: true, //tự động gọi lại getBookingsAfterDate khi queryDate thay đổi hoặc khi component được mount.
    })

    console.log(data)

    return { data, isLoading, numDays, error }
}
