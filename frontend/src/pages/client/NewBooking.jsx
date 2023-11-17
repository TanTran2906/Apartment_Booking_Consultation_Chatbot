import styled, { css } from "styled-components";
import { toast } from "react-hot-toast";

import Heading from "../../ui/Heading";
import CabinTable from "../../ui/client/CabinTable";
import ServiceTable from "../../ui/client/ServiceTable";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency, subtractDates } from "../../utils/helpers";
import { useCreateBookingMutation } from "../../slices/bookingSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearServiceItems } from "../../slices/bookingLocalStorage";

const StyledContainer = styled.div`
    max-width: calc(100% - 50px);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1000px 372px;
    gap: 30px;
`;

const StyledCol = styled.div`
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const Line = styled.div`
    width: 1000px;
    margin: 10px 0px;
    height: 2px;
    background: var(--primary-color-01, #b89146);
`;

export const ShortLine = styled.div`
    width: 305px;
    margin: 0 auto;
    height: 1px;
    background: var(--primary-color-01, #b89146);
    margin-bottom: 15px;

    ${(props) =>
        props.type === "cost" &&
        css`
            width: 381px;
        `}
`;

const StyledCost = styled.div`
    color: #222222;
    height: fit-content;
    grid-area: auto;
    line-height: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2); /* box-shadow với màu đen, độ mờ và bóng đổ nhẹ */
    margin-top: 70px;
    position: sticky;
    top: 100px;
`;

const StyledInfo = styled.div`
    padding: 35px;
`;

const StyledInfomation = styled.div`
    color: #222222;
    display: flex;
    flex-direction: column;
    grid-area: auto;
    line-height: 20px;
`;

const CabinPrice = styled.div`
    align-items: baseline;
    color: #222222;
    display: flex;
    gap: 3px;
    margin: 0px 0px 24px;
`;

const Span = styled.span`
    ${(props) =>
        props.type === "price" &&
        css`
            font-size: 2.2rem;
            font-weight: 600;
        `}

    ${(props) =>
        props.type === "text" &&
        css`
            font-size: 1.6rem;
            font-weight: 400;
        `}
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-rows: auto auto; /* 2 hàng */
    grid-template-columns: 1fr 1fr; /* 2 cột bằng nhau */
    border: 1px solid #ccc; /* Kẻ border với màu xám nhạt */
    border-radius: 10px;
    margin-bottom: 15px;

    & > *:nth-child(3) {
        grid-column: span 2; /* Hàng thứ hai chiếm 2 cột */
    }
`;

const InfoBooking = styled.div`
    font-size: 1.4rem;
    line-height: 18px;
    padding: 10px 12px 10px;
    text-align: left;
    border: 1px solid #ccc;
    ${(props) =>
        props.type === "top-left" &&
        css`
            border-radius: 10px 0 0 0;
        `}
    ${(props) =>
        props.type === "top-right" &&
        css`
            border-radius: 0 10px 0 0;
        `}
    
    ${(props) =>
        props.type === "bottom-left-right" &&
        css`
            border-radius: 0 0 10px 10px;
            text-align: center;
        `}
`;

const Paragraph = styled.p`
    padding: 8px 10px;
    text-align: center;
    margin: 10px 0 20px;
`;

export const Cost = styled.div`
    color: #222222;
    display: flex;
    grid-area: auto;
    justify-content: space-between;
    line-height: 20px;
    margin-bottom: 20px;

    & > *:nth-child(1) {
        text-decoration: underline;
    }

    &:last-child {
        margin-bottom: 0px;
    }

    ${(props) =>
        props.type === "total" &&
        css`
            font-weight: 600;
            & > *:nth-child(1) {
                text-decoration: none;
            }
            font-size: 2rem;
        `}
`;

function NewBooking() {
    const navigate = useNavigate();
    const {
        cabin: yourCabin,
        paymentMethod,
        infomation,
        servicesPrice = 0,
        serviceItems,
    } = useSelector((state) => state.booking);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!infomation.numGuests) {
            navigate("/bookingInfo");
        } else if (!paymentMethod) {
            navigate("/payment");
        }
    }, [paymentMethod, infomation.numGuests, navigate]);

    const [createBooking, isLoading] = useCreateBookingMutation();

    const numNights = subtractDates(
        new Date(infomation.endDate).toISOString(),
        new Date(infomation.startDate).toISOString()
    );

    const total = formatCurrency(
        (yourCabin.regularPrice - yourCabin.discount) * numNights +
            (servicesPrice * infomation.numGuests * numNights || 0)
    );

    const dispatch = useDispatch();
    const reserveHandler = async () => {
        try {
            const services = serviceItems;
            const user = userInfo._id;
            const cabin = yourCabin._id;
            const numGuests = infomation.numGuests;
            const startDate = new Date(infomation.startDate).toISOString();
            const endDate = new Date(infomation.endDate).toISOString();
            const observations = infomation.observations;
            const totalPrice =
                (yourCabin.regularPrice - yourCabin.discount) * numNights +
                (servicesPrice * infomation.numGuests * numNights || 0);

            console.log(user, cabin);

            const res = await createBooking({
                services,
                user,
                cabin,
                paymentMethod,
                totalPrice,
                numNights,
                numGuests,
                startDate,
                endDate,
                observations,
            }).unwrap();
            dispatch(clearServiceItems());
            navigate(`/booking/${res._id}`);
            toast.success("Booking successfully created");
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <StyledContainer>
            <StyledCol>
                <Heading as="h1">Your cabin</Heading>
                <CabinTable />
                <Line />

                <Heading as="h1">Choose services (Optional)</Heading>
                <ServiceTable />
                <Line />
            </StyledCol>

            <StyledCost>
                <StyledInfo>
                    <StyledInfomation>
                        <CabinPrice>
                            <Span type="price">
                                {formatCurrency(
                                    yourCabin.regularPrice - yourCabin.discount
                                )}{" "}
                            </Span>
                            <Span type="text">Night</Span>
                        </CabinPrice>

                        <GridContainer>
                            <InfoBooking type="top-left">
                                <b>CHECK-IN </b>{" "}
                                <div>{infomation.startDate}</div>
                            </InfoBooking>
                            <InfoBooking type="top-right">
                                <b>CHECK-OUT</b> <div>{infomation.endDate}</div>
                            </InfoBooking>
                            <InfoBooking type="bottom-left-right">
                                <b>GUESTS</b>{" "}
                                <div>{infomation.numGuests} guest</div>
                            </InfoBooking>
                        </GridContainer>

                        <Button
                            size="large"
                            onClick={reserveHandler}
                            // disabled={isLoading}
                        >
                            Reserve
                        </Button>

                        <Paragraph>You won't be charged yet</Paragraph>

                        <Cost>
                            <span>
                                {formatCurrency(
                                    yourCabin.regularPrice - yourCabin.discount
                                )}{" "}
                                x {numNights} Nights:
                            </span>
                            <span>
                                {formatCurrency(
                                    (yourCabin.regularPrice -
                                        yourCabin.discount) *
                                        numNights
                                )}
                            </span>
                        </Cost>

                        <Cost>
                            <span>Services fee:</span>
                            <span>
                                {formatCurrency(
                                    servicesPrice *
                                        infomation.numGuests *
                                        numNights || 0
                                )}
                            </span>
                        </Cost>

                        <ShortLine />

                        <Cost type="total">
                            <span>Total price:</span>
                            <span>{total}</span>
                        </Cost>
                    </StyledInfomation>
                </StyledInfo>
            </StyledCost>
        </StyledContainer>
    );
}

export default NewBooking;
