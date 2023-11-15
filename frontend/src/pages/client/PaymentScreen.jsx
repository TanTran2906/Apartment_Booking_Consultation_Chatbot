import { useEffect } from "react";
// import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import styled from "styled-components";

// import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";

import { toast } from "react-hot-toast";
import { savePaymentMethod } from "../../slices/bookingLocalStorage";
import Heading from "../../ui/Heading";

const StyledContainer = styled.div`
    width: 2990px;
    max-width: calc(100% - 50px);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
`;

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

const PaymentScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const { infomation } = useSelector((state) => state.booking);

    useEffect(() => {
        if (!infomation.numGuests) {
            navigate("/bookingInfo");
        }
    }, [navigate, infomation]);

    async function onSubmit(data) {
        try {
            dispatch(savePaymentMethod(data.PayPal));
            // navigate("/booking");
            toast.success("Payment method successfully updated");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <StyledContainer>
            <Heading as="h1">Payment Methods </Heading>
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                <FormRow>
                    <Label htmlFor="PayPal">PayPal or Credit Card</Label>
                    <Input
                        type="radio"
                        id="PayPal"
                        checked
                        defaultValue="PayPal"
                        {...register("PayPal", {
                            required: "This field is required",
                        })}
                    />
                    {errors?.PayPal?.message && (
                        <Error>{errors.PayPal.message}</Error>
                    )}
                </FormRow>

                <FormRow>
                    {/* type is an HTML attribute! */}
                    {/* <Button variation="secondary" type="reset">
                Cancel
            </Button> */}
                    <Button>Continue</Button>
                </FormRow>
            </Form>
        </StyledContainer>
        // <FormContainer>
        //     {/* <CheckoutSteps step1 step2 step3 /> */}
        //     <h1>Payment Method</h1>
        //     <Form onSubmit={submitHandler}>
        //         <Form.Group>
        //             <Form.Label as="legend">Select Method</Form.Label>
        //             <Col>
        //                 <Form.Check
        //                     className="my-2"
        //                     type="radio"
        //                     label="PayPal or Credit Card"
        //                     id="PayPal"
        //                     name="paymentMethod"
        //                     value="PayPal"
        //                     checked
        //                     onChange={(e) => setPaymentMethod(e.target.value)}
        //                 ></Form.Check>
        //             </Col>
        //         </Form.Group>

        //         <Button type="submit" variant="primary">
        //             Continue
        //         </Button>
        //     </Form>
        // </FormContainer>
    );
};

export default PaymentScreen;
