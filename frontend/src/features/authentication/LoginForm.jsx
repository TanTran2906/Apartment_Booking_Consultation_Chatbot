import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/userSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";

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

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    // const { userInfo } = useSelector((state) => state.auth);

    // const { search } = useLocation();
    // const sp = new URLSearchParams(search);
    // const redirect = sp.get("redirect") || "/";

    // // useEffect(() => {
    // //     if (userInfo) {
    // //         navigate(redirect);
    // //     }
    // // }, [navigate, redirect, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return;
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Login successfully");
            setEmail("");
            setPassword("");
            if (res.isAdmin) {
                navigate("/admin/dashboard");
            } else navigate("/home");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address" orientation="vertical">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormRow>
            <FormRow label="Password" orientation="vertical">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormRow>
            <FormRow orientation="vertical">
                <Button size="large" disabled={isLoading}>
                    {!isLoading ? "Log in" : <SpinnerMini />}
                </Button>
            </FormRow>

            <CustomRow className="py-3">
                <CustomCol>New Customer?</CustomCol>
                <CustomCol>
                    <Button style={{ width: "100px" }} size="small">
                        <CustomLink to="/register">Register</CustomLink>
                    </Button>
                </CustomCol>
            </CustomRow>
        </Form>
    );
}

export default LoginForm;
