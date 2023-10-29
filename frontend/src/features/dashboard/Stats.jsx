import {
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineBanknotes,
    HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
    // Stat 1)
    const numBookings = bookings.length;

    // Stat 2)
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

    // Stat 3)
    const checkins = confirmedStays.length;

    // Stat 4) Tỉ lệ chiếm đóng(căn hộ được sử dụng) giữa số ngày đã stay(check-in or check-out) / tổng số ngày có sẵn (numDays * cabinCount) => trong khoảng thời gian đã cho, chỉ có khoảng X% các căn hộ đã được sử dụng.
    const occupation =
        confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabinCount);

    return (
        <>
            <Stat
                icon={<HiOutlineBriefcase />}
                title="Bookings"
                value={numBookings}
                color="blue"
            />
            <Stat
                icon={<HiOutlineBanknotes />}
                title="Sales"
                value={formatCurrency(sales)}
                color="green"
            />
            <Stat
                icon={<HiOutlineCalendarDays />}
                title="Check ins"
                value={checkins}
                color="indigo"
            />
            <Stat
                icon={<HiOutlineChartBar />}
                title="Occupancy rate"
                value={Math.round(occupation * 100) + "%"}
                color="yellow"
            />
        </>
    );
}

export default Stats;
