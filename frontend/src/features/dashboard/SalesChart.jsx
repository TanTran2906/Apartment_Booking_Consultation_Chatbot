import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import DashboardBox from "./DashboardBox";
import { NEW_DATE } from "../../utils/constants";
import { useGetBookingDetailsQuery } from "../../slices/bookingSlice";

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    /* Hack to change grid line colors */
    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`;

function SalesChart({ bookings, numDays }) {
    const { isDarkMode } = useDarkMode();

    // Tạo mảng chứa tất cả các ngày trong khoảng thời gian cần hiển thị
    const allDates = eachDayOfInterval({
        start: subDays(NEW_DATE, numDays - 1),
        end: NEW_DATE,
    });

    // Tạo dữ liệu cho biểu đồ dựa trên thông tin đặt phòng và ngày
    const data = allDates.map((date) => {
        const salesDataForDate = {
            // Định dạng ngày thành "Tháng Ngày" (VD: "Aug 01")
            label: format(date, "MMM dd"),
            totalSales: 0,
            servicesSales: 0,
        };

        bookings.forEach((booking) => {
            if (isSameDay(date, new Date(booking.bookingDate))) {
                // Tổng doanh số bookings có cùng ngày (ngày booking trùng với date trong mảng allDates)
                salesDataForDate.totalSales += booking.totalPrice;

                // Kiểm tra xem booking.services có dữ liệu không
                if (booking.services && booking.services.length > 0) {
                    console.log(booking);
                    salesDataForDate.servicesSales += booking.services.reduce(
                        (total, service) => {
                            return (
                                total +
                                (service?.regularPrice - service?.discount)
                            );
                        },
                        0
                    );
                }
            }
        });

        return salesDataForDate;
    });

    const colors = isDarkMode
        ? {
              totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
              servicesSales: { stroke: "#22c55e", fill: "#22c55e" },
              text: "#e5e7eb",
              background: "#18212f",
          }
        : {
              totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
              servicesSales: { stroke: "#16a34a", fill: "#dcfce7" },
              text: "#374151",
              background: "#fff",
          };

    return (
        <StyledSalesChart>
            <Heading type="h2">
                Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
                {format(allDates.at(-1), "MMM dd yyyy")}
            </Heading>

            {/* Tạo vùng hiển thị biểu đồ tự động điều chỉnh */}
            <ResponsiveContainer width="100%" height={300}>
                {/* <AreaChart data={data} width={700} height={300}> */}
                <AreaChart data={data}>
                    {/* Trục X (ngang) */}
                    <XAxis
                        dataKey="label"
                        tick={{ fill: colors.text }} // Màu của dấu tick, dấu gạch tại móc
                        tickLine={{ stroke: colors.text }} // Màu của đường tick
                    />
                    <YAxis
                        unit="$" // Đơn vị cho trục Y
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    {/* Đường lưới Cartesian */}
                    <CartesianGrid strokeDasharray="4" />
                    {/* Tooltip (Popup Chú thích khi hover) */}
                    <Tooltip
                        contentStyle={{ backgroundColor: colors.background }}
                    />
                    {/* Dữ liệu Total sales */}
                    <Area
                        dataKey="totalSales"
                        type="monotone" // Loại dữ liệu của biểu đồ
                        stroke={colors.totalSales.stroke} // Màu của đường
                        fill={colors.totalSales.fill} // Màu của diện tích dưới đường
                        strokeWidth={2} // Độ dày của đường
                        name="Total sales" // Tên hiển thị trong tooltip
                        unit="$" // Đơn vị
                    />

                    <Area
                        type="monotone"
                        dataKey="servicesSales"
                        // stroke='#15803d'
                        // fill='#dcfce7'
                        stroke={colors.servicesSales.stroke}
                        fill={colors.servicesSales.fill}
                        strokeWidth={2}
                        unit="$"
                        name="Service sales"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
}

export default SalesChart;

// const OLDdata = [
//     { label: "Jan 09", totalSales: 480, servicesSales: 320 - 300 },
//     { label: "Jan 10", totalSales: 580, servicesSales: 400 - 300 },
//     { label: "Jan 11", totalSales: 550, servicesSales: 450 - 300 },
//     { label: "Jan 12", totalSales: 600, servicesSales: 350 - 300 },
//     { label: "Jan 13", totalSales: 700, servicesSales: 550 - 300 },
//     { label: "Jan 14", totalSales: 800, servicesSales: 650 - 500 },
//     { label: "Jan 15", totalSales: 700, servicesSales: 700 - 500 },
//     { label: "Jan 16", totalSales: 650, servicesSales: 500 - 300 },
//     { label: "Jan 17", totalSales: 600, servicesSales: 600 - 300 },
//     { label: "Jan 18", totalSales: 550, servicesSales: 400 - 300 },
//     { label: "Jan 19", totalSales: 700, servicesSales: 600 - 500 },
//     { label: "Jan 20", totalSales: 800, servicesSales: 700 - 500 },
//     { label: "Jan 21", totalSales: 700, servicesSales: 600 - 500 },
//     { label: "Jan 22", totalSales: 810, servicesSales: 550 - 500 },
//     { label: "Jan 23", totalSales: 950, servicesSales: 750 - 500 },
//     { label: "Jan 24", totalSales: 970, servicesSales: 600 - 500 },
//     { label: "Jan 25", totalSales: 900, servicesSales: 700 - 500 },
//     { label: "Jan 26", totalSales: 950, servicesSales: 800 - 500 },
//     { label: "Jan 27", totalSales: 850, servicesSales: 700 - 500 },
//     { label: "Jan 28", totalSales: 900, servicesSales: 600 - 500 },
//     { label: "Jan 29", totalSales: 800, servicesSales: 800 - 500 },
//     { label: "Jan 30", totalSales: 950, servicesSales: 700 - 500 },
//     { label: "Jan 31", totalSales: 1100, servicesSales: 800 - 500 },
//     { label: "Feb 01", totalSales: 1200, servicesSales: 900 - 500 },
//     { label: "Feb 02", totalSales: 1250, servicesSales: 800 - 500 },
//     { label: "Feb 03", totalSales: 1400, servicesSales: 950 - 500 },
//     { label: "Feb 04", totalSales: 1500, servicesSales: 1000 - 500 },
//     { label: "Feb 05", totalSales: 1400, servicesSales: 1100 - 500 },
//     { label: "Feb 06", totalSales: 1450, servicesSales: 900 - 500 },
// ];
