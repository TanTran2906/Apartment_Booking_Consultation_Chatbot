import { useForm } from "react-hook-form";
import styled from "styled-components";

// import { useCreateCabin } from "features/cabins/useCreateCabin";
// import { useEditCabin } from "./useEditCabin";

// import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";

import { toast } from "react-hot-toast";
import {
    useGetCabinsQuery,
    useUpdateCabinMutation,
    useUploadCabinImageMutation,
} from "../../slices/cabinSlice";

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

// Receives closeModal directly from Modal
function CreateCabinForm({ cabinToEdit, onCloseModal }) {
    const { _id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    // console.log(editValues);

    const { register, handleSubmit, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const { refetch } = useGetCabinsQuery();
    const [updateCabin, { isLoading: isUpdating }] = useUpdateCabinMutation();
    const [uploadCabinImage] = useUploadCabinImageMutation();

    async function onSubmit(data) {
        let image;

        try {
            // Kiểm tra xem người dùng đã chọn tệp hình ảnh mới hay chưa
            if (data.image && data.image[0]) {
                // Nếu có, tải lên hình ảnh mới
                image = await uploadFileHandler(data.image[0]);
            } else {
                // Nếu không, sử dụng đường dẫn hình ảnh hiện có
                image = data.image;
            }

            // Cập nhật cabin với dữ liệu và hình ảnh (có thể mới hoặc cũ)
            await updateCabin({
                ...data,
                editId,
                image,
            });
            toast.success("Cabin successfully updated");
            onCloseModal?.();
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    const uploadFileHandler = async (image) => {
        const formData = new FormData();
        formData.append("image", image);
        try {
            const res = await uploadCabinImage(formData).unwrap();

            toast.success(res.message);
            return res.image;
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow>
                <Label htmlFor="name">Cabin name</Label>
                <Input
                    type="text"
                    id="name"
                    disabled={isUpdating}
                    defaultValue=""
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
                {errors?.name?.message && <Error>{errors.name.message}</Error>}
            </FormRow>

            <FormRow>
                <Label htmlFor="maxCapacity">Maximum capacity</Label>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isUpdating}
                    defaultValue={1}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
                {errors?.maxCapacity?.message && (
                    <Error>{errors.maxCapacity.message}</Error>
                )}
            </FormRow>

            <FormRow>
                <Label htmlFor="regularPrice">Regular price</Label>
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isUpdating}
                    defaultValue={1}
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Regular price should be at least 1",
                        },
                    })}
                />
                {errors?.regularPrice?.message && (
                    <Error>{errors.regularPrice.message}</Error>
                )}
            </FormRow>

            <FormRow>
                <Label htmlFor="discount">Discount</Label>
                <Input
                    type="number"
                    id="discount"
                    disabled={isUpdating}
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) =>
                            Number(value) <= getValues().regularPrice ||
                            "Discount should be less than regular price",
                    })}
                />
                {errors?.discount?.message && (
                    <Error>{errors.discount.message}</Error>
                )}
            </FormRow>

            <FormRow>
                <Label htmlFor="description">Description for website</Label>
                <Textarea
                    type="number"
                    id="description"
                    disabled={isUpdating}
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
                {errors?.description?.message && (
                    <Error>{errors.description.message}</Error>
                )}
            </FormRow>

            <FormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput
                    id="image"
                    accept="image/*"
                    type="file"
                    // {...register("image", {
                    //     required: "This field is required",
                    // })}
                    {...register("image")}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
