import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useProfileMutation } from "../../slices/userSlice";
import toast from "react-hot-toast";
import { setCredentials } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
// import { useUpdateUser } from './useUpdateUser';

function UpdatePasswordForm() {
    const { register, handleSubmit, formState, getValues, reset } = useForm();
    const { errors } = formState;

    const [profile, { isLoading: isUpdating }] = useProfileMutation();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    async function onSubmit(data) {
        try {
            const res = await profile({
                _id: userInfo._id,
                ...data,
            });
            console.log(res);

            dispatch(setCredentials({ ...res }));
            toast.success("Password successfully updated");

            reset();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    function handleReset() {
        reset();
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={isUpdating}
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password needs a minimum of 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Confirm password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    autoComplete="new-password"
                    id="passwordConfirm"
                    disabled={isUpdating}
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            getValues().password === value ||
                            "Passwords need to match",
                    })}
                />
            </FormRow>
            <FormRow>
                <Button
                    onClick={handleReset}
                    type="reset"
                    variation="secondary"
                >
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update password</Button>
            </FormRow>
        </Form>
    );
}

export default UpdatePasswordForm;
