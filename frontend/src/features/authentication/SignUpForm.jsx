// Email regex: /\S+@\S+\.\S+/
import { useForm } from "react-hook-form";
import styled from "styled-components";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import { Textarea } from "../../ui/Textarea";

import { toast } from "react-hot-toast";

import { setCredentials } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterAccountMutation } from "../../slices/userSlice";
// import Select from "../../ui/Select";
import { countryFlags, nationalities } from "../../utils/constants";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";

//=========Custom Bootstrap
const CustomRow = styled(Row)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: lightblue;
    padding: 8px;
    font-weight: 500;
    border-radius: var(--border-radius-sm);
`;

const CustomCol = styled(Col)``;

const CustomLink = styled(Link)`
    text-decoration: none;
`;
//=========Custom Bootstrap

// Create a styled select component
const StyledSelect = styled.select`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

// Create a styled option component
const StyledOption = styled.option``;

const StyledSelectLabel = styled.label`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

const StyledFlagImage = styled.img`
    max-width: 24rem;
    max-height: 24rem;
    margin-right: 8px;
`;

const StyledCustomSelect = styled.div`
    display: inline-block;
    background-color: white;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    position: relative;
    z-index: 1;
`;

function SignUpForm() {
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [registerAccount, { isLoading }] = useRegisterAccountMutation();

    // const { userInfo } = useSelector((state) => state.auth);

    // const { search } = useLocation();
    // const sp = new URLSearchParams(search);
    // const redirect = sp.get("redirect") || "/";

    async function onSubmit({
        fullName,
        nationalID,
        nationality,
        countryFlag,
        email,
        password,
    }) {
        try {
            const res = await registerAccount({
                fullName,
                nationalID,
                nationality,
                countryFlag,
                email,
                password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success(
                "Account successfully created! Please verify the new account from the user's email address"
            );
            navigate("/login");
            reset();
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    }

    const [selectedCountryFlag, setSelectedCountryFlag] = useState(
        "https://flagcdn.com/gb.svg"
    );

    const handleCountryFlagChange = (e) => {
        setSelectedCountryFlag(e.target.value);
    };

    if (isLoading) return <Spinner />;

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type="register">
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    {...register("fullName", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Passport" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="nationalID"
                    {...register("nationalID", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Nationality" error={errors.nationality?.message}>
                <StyledSelect
                    id="nationality"
                    {...register("nationality", {
                        required: "This field is required",
                    })}
                >
                    <StyledOption value="" disabled>
                        Select Nationality
                    </StyledOption>
                    {nationalities.map((nationality) => (
                        <StyledOption value={nationality} key={nationality}>
                            {nationality}
                        </StyledOption>
                    ))}
                </StyledSelect>
            </FormRow>

            <FormRow label="Country Flag" error={errors.countryFlag?.message}>
                <StyledCustomSelect>
                    <StyledSelectLabel>
                        {selectedCountryFlag ? (
                            <StyledFlagImage
                                src={selectedCountryFlag}
                                alt="Selected Country"
                            />
                        ) : (
                            "Select Country Flag"
                        )}
                    </StyledSelectLabel>
                    <StyledSelect
                        id="countryFlag"
                        {...register("countryFlag", {
                            required: "This field is required",
                        })}
                        onChange={handleCountryFlagChange}
                    >
                        {countryFlags.map((flag) => (
                            <StyledOption value={flag.value} key={flag.name}>
                                {flag.name}
                            </StyledOption>
                        ))}
                    </StyledSelect>
                </StyledCustomSelect>
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please provide a valid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
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
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            value === getValues().password ||
                            "Passwords need to match",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Create new user</Button>
            </FormRow>

            <CustomRow className="py-3">
                <CustomCol>Already have an account? </CustomCol>
                <CustomCol>
                    <Button style={{ width: "100px" }} size="medium">
                        <CustomLink to="/login">Login</CustomLink>
                    </Button>
                </CustomCol>
            </CustomRow>
        </Form>
    );
}

export default SignUpForm;
