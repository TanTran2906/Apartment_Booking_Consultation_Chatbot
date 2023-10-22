import Button from "../../ui/Button";
// import { useCheckout } from './useCheckout';
import {
    useGetBookingsQuery,
    useUpdateCheckOutBookingMutation,
} from "../../slices/bookingSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CheckoutButton({ bookingId }) {
    const { refetch } = useGetBookingsQuery();
    const navigate = useNavigate();

    const [updateCheckOutBooking, { isLoading: isUpdating }] =
        useUpdateCheckOutBookingMutation();

    async function handleCheckOut() {
        await updateCheckOutBooking(bookingId);
        toast.success(`Booking successfully checked out`);
        refetch();
        navigate("/admin/bookings");
    }

    return (
        <Button
            variation="primary"
            size="small"
            onClick={handleCheckOut}
            disabled={isUpdating}
        >
            Check out
        </Button>
    );
}

export default CheckoutButton;
