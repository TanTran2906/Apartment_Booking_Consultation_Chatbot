import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { useGetStaysAfterDateQuery } from "../../slices/bookingSlice"
import { NEW_DATE } from "../../utils/constants"



export function useRecentStays() {
    const [searchParams] = useSearchParams()

    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"))

    const queryDate = subDays(NEW_DATE, numDays).toISOString()

    const { data, isLoading, isError } = useGetStaysAfterDateQuery(queryDate, {
        refetchOnMountOrArgChange: true, //tự động gọi lại getBookingsAfterDate khi queryDate thay đổi hoặc khi component được mount.
    })

    const confirmedStays = data?.filter(stay => stay.status === "checked-in" || stay.status === "checked-out")


    return { confirmedStays, isLoading, isError }
}
