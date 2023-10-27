import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useDispatch, useSelector } from "react-redux";
import {
    useProfileMutation,
    useUploadProfileImageMutation,
} from "../../slices/userSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { setCredentials } from "../../slices/authSlice";

function UpdateUserDataForm() {
    const { userInfo } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [nationalID, setNationalID] = useState("");
    const [avatar, setAvatar] = useState("/default-user.jpg");

    const [profile, { isLoading: isUpdating }] = useProfileMutation();
    const [uploadProfileImage, { isLoading: isUploadImage }] =
        useUploadProfileImageMutation();

    useEffect(() => {
        setFullName(userInfo.fullName);
        setEmail(userInfo.email);
        setNationalID(userInfo.nationalID);
    }, [userInfo.email, userInfo.fullName, userInfo.nationalID]);

    const dispatch = useDispatch();
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (!fullName || !nationalID) return;

            const photo = await uploadFileHandler(avatar);

            const res = await profile({
                _id: userInfo._id,
                fullName,
                nationalID,
                photo,
                email,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    const uploadFileHandler = async (avatar) => {
        const formData = new FormData();
        formData.append("image", avatar);
        try {
            const res = await uploadProfileImage(formData).unwrap();
            setAvatar(res.image);
            toast.success(res.message);
            return res.image;
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    function handleCancel(e) {
        setFullName(userInfo.fullName);
        setEmail(userInfo.email);
        setNationalID(userInfo.nationalID);
        setAvatar("/default-user.jpg");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address">
                <Input value={email} disabled />
            </FormRow>
            <FormRow label="Full name">
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isUpdating}
                    id="fullName"
                />
            </FormRow>
            <FormRow label="National ID">
                <Input
                    type="text"
                    value={nationalID}
                    onChange={(e) => setNationalID(e.target.value)}
                    disabled={isUpdating}
                    id="nationalID"
                />
            </FormRow>
            <FormRow label="Avatar image">
                <FileInput
                    disabled={isUpdating}
                    id="avatar"
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                        setAvatar(e.target.files[0]);
                    }}
                />
            </FormRow>
            <FormRow>
                <Button
                    onClick={handleCancel}
                    type="reset"
                    variation="secondary"
                >
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update account</Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
