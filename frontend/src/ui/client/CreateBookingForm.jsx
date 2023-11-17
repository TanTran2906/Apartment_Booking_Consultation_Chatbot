import { useForm } from "react-hook-form";
import styled from "styled-components";

// import FormRow from "../../ui/FormRow";
import Input from "../Input";
import Form from "../Form";
import Button from "../Button";

import { Textarea } from "../Textarea";

import { toast } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToInfomation } from "../../slices/bookingLocalStorage";
import { useGetBookingsQuery } from "../../slices/bookingSlice";
import Spinner from "../Spinner";

const FormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem auto;
    /* grid-template-columns: 24rem 1fr 1.2fr; */
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

const today = new Date().toISOString();

// Receives closeModal directly from Modal
function CreateBookingForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const { data: bookings = [], isLoading } = useGetBookingsQuery();
    const { cabin } = useSelector((state) => state.booking);

    const { maxCapacity } = cabin;

    if (isLoading) return <Spinner />;

    const identifyCabinValidate = bookings.filter(
        (booking) => booking.cabin._id === cabin._id
    );

    function validateBookingDates(startDate, endDate) {
        // Duyệt qua các đặt phòng hiện có để kiểm tra xem có sự trùng lắp không
        for (const booking of identifyCabinValidate) {
            const existingStartDate = new Date(booking.startDate);
            const existingEndDate = new Date(booking.endDate);

            // Kiểm tra các phạm vi ngày trùng nhau
            if (
                (new Date(startDate) >= existingStartDate &&
                    new Date(startDate) <= existingEndDate) ||
                (new Date(endDate) >= existingStartDate &&
                    new Date(endDate) <= existingEndDate) ||
                (new Date(startDate) <= existingStartDate &&
                    new Date(endDate) >= existingEndDate)
            ) {
                return false; // Có ngày trùng nhau được tìm thấy
            }
        }

        return true; // Không có ngày trùng nhau
    }

    async function onSubmit(data) {
        if (data.endDate <= data.startDate) {
            return toast.error(
                "Check-out date must be greater than Check-in date"
            );
        }
        if (!validateBookingDates(data.startDate, data.endDate))
            return toast.error(
                `Cabin ${cabin.name} was booked during this time period. Please choose another time period!`
            );
        try {
            dispatch(addToInfomation({ ...data }));
            navigate("/payment");
            toast.success("Info successfully updated");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow>
                <Label htmlFor="startDate">Check-in</Label>
                <Input
                    type="date"
                    id="startDate"
                    defaultValue=""
                    {...register("startDate", {
                        required: "This field is required",
                    })}
                    min={today.split("T")[0]}
                />
                {errors?.startDate?.message && (
                    <Error>{errors.startDate.message}</Error>
                )}
            </FormRow>

            <FormRow>
                <Label htmlFor="endDate">Check-out</Label>
                <Input
                    type="date"
                    id="endDate"
                    {...register("endDate", {
                        required: "This field is required",
                    })}
                    min={today.split("T")[0]}
                />
                {errors?.endDate?.message && (
                    <Error>{errors.endDate.message}</Error>
                )}
            </FormRow>

            <FormRow>
                <Label htmlFor="numGuests">Travelers</Label>
                <Input
                    type="number"
                    id="numGuests"
                    defaultValue={1}
                    {...register("numGuests", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: `Travelers should be at least 1`,
                        },
                        max: {
                            value: maxCapacity,
                            message: `The number of travelers must be less than the cabin capacity of ${maxCapacity}`,
                        },
                    })}
                />
                {errors?.numGuests?.message && (
                    <Error>{errors.numGuests.message}</Error>
                )}
            </FormRow>

            <FormRow>
                <Label htmlFor="observations">Notes</Label>
                <Textarea
                    type="text"
                    id="observations"
                    defaultValue=""
                    {...register("observations")}
                />
                {errors?.observations?.message && (
                    <Error>{errors.observations.message}</Error>
                )}
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Continue</Button>
            </FormRow>
        </Form>
    );
}

export default CreateBookingForm;
