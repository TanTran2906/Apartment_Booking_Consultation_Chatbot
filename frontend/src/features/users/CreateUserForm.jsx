import { useForm } from "react-hook-form";
import styled from "styled-components";

// import { useCreateCabin } from "features/cabins/useCreateCabin";
// import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";

import { toast } from "react-hot-toast";

import {
    useGetUsersQuery,
    useUpdateUserMutation,
} from "../../slices/userSlice";

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
function CreateUserForm({ userToEdit, onCloseModal }) {
    const { _id: editId, ...editValues } = userToEdit;
    const isEditSession = Boolean(editId);

    // console.log(editValues);

    const { register, handleSubmit, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const { refetch } = useGetUsersQuery();

    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    async function onSubmit(data) {
        if (!data.fullName || !data.nationalID) return;

        try {
            await updateUser({ ...data, editId });
            toast.success("User successfully updated");
            onCloseModal?.();
            refetch();
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
                <Label htmlFor="fullName">User name</Label>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isUpdating}
                    defaultValue=""
                    {...register("fullName", {
                        required: "This field is required",
                    })}
                />
                {errors?.name?.message && <Error>{errors.name.message}</Error>}
            </FormRow>

            <FormRow>
                <Label htmlFor="nationalID">National ID</Label>
                <Input
                    type="text"
                    id="nationalID"
                    disabled={isUpdating}
                    defaultValue=""
                    {...register("nationalID", {
                        required: "This field is required",
                    })}
                />
                {errors?.name?.message && <Error>{errors.name.message}</Error>}
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update user</Button>
            </FormRow>
        </Form>
    );
}

export default CreateUserForm;
