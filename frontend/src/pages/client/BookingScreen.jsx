import styled, { css } from "styled-components";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { Quanity, Rate, StyleQuanityAndRate } from "../../ui/client/CabinItem";
import { Cost, ShortLine } from "./NewBooking";
import { useParams } from "react-router-dom";
import {
    useGetBookingDetailsQuery,
    useGetPaypalClientIdQuery,
    usePayBookingMutation,
} from "../../slices/bookingSlice";
import Spinner from "../../ui/Spinner";
import { IoDiamondOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { FaPeopleRoof } from "react-icons/fa6";
import { formatCurrency } from "../../utils/helpers";
import { useEffect } from "react";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";
import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";
import {
    HiOutlineChatBubbleBottomCenterText,
    HiOutlineCheckCircle,
    HiOutlineCurrencyDollar,
} from "react-icons/hi2";

const StyledContainer = styled.div`
    max-width: calc(100% - 300px);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 70px;
`;

const StyledCost = styled.div`
    height: fit-content;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: #222222;
    grid-area: auto;
    line-height: 20px;
    padding: 20px;
    background-color: #fff;
`;

const Heading = styled.h1`
    ${(props) =>
        props.as === "h1" &&
        css`
            font-size: 3rem;
            font-weight: 600;
            padding: 0 50px 50px;
            margin-left: 100px;
        `}
    ${(props) =>
        props.as === "h2" &&
        css`
            font-size: 2.2rem;
            font-weight: 600;
        `}
    line-height: 1.4;
`;

const ColLetf = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Attraction = styled.div`
    color: #222222;
    border: 1px solid #ccc;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    padding: 25px;
`;

const Title = styled.p`
    color: #222222;
    font-weight: 600;
    line-height: 20px;
`;

const Paragraph = styled.p`
    color: #222222;
    margin-top: 3px;
    /* line-height: 20px; */

    ${(props) =>
        props.type === "room-in" &&
        css`
            display: block;
            color: #717171;
            font-size: 1.2rem;
            line-height: 16px;
            margin-top: 0px;
        `}

    ${(props) =>
        props.type === "desc" &&
        css`
            color: #222222;
            font-size: 1.4rem;
            line-height: 16px;
            margin-bottom: 30px;
        `}
`;

const Dates = styled.div`
    color: #222222;
    display: flex;
    justify-content: space-between;

    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 25px;
`;

const Guest = styled.div`
    color: #222222;
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 25px;
`;

const Icon = styled.div`
    min-width: 40px;
    min-height: 40px;
    font-size: 3rem;

    & svg {
        color: #e31c5f;
    }
`;

const StyledCabin = styled.div`
    display: flex;
    gap: 10px;
`;

const Img = styled.img`
    width: 124px;
    height: 104px;
    border-radius: 10px;
    object-fit: cover; /* Đảm bảo hình ảnh điền đầy đối tượng không làm méo hoặc căng hình */
    object-position: center center; /* Canh giữa hình ảnh */
`;

const Section = styled.section`
    /* padding: 3.2rem 4rem 1.2rem; */
`;

const Price = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 3.2rem;
    border-radius: var(--border-radius-sm);
    margin-top: 2.4rem;

    background-color: ${(props) =>
        props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
    color: ${(props) =>
        props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

    & p:last-child {
        text-transform: uppercase;
        font-size: 1.4rem;
        font-weight: 600;
    }

    svg {
        height: 2.4rem;
        width: 2.4rem;
        color: currentColor !important;
    }
`;

function BookingScreen() {
    const { bookingId } = useParams();
    // const { userInfo } = useSelector((state) => state.auth);

    const {
        data: booking,
        refetch,
        isLoading,
    } = useGetBookingDetailsQuery(bookingId);
    const [payBooking, { isLoading: isPaying }] = usePayBookingMutation();

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const {
        data: paypal,
        isLoading: loadingPayPal,
        error: errorPayPal,
    } = useGetPaypalClientIdQuery();

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                        "client-id": paypal.clientId,
                        currency: "USD",
                    },
                });
                paypalDispatch({ type: "setLoadingStatus", value: "pending" });
            };
            if (booking && !booking.isPaid) {
                if (!window.paypal) {
                    loadPaypalScript();
                }
            }
        }
    }, [errorPayPal, loadingPayPal, booking, paypal, paypalDispatch]);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payBooking({ bookingId, details });
                refetch();
                toast.success("Booking is successfully paid");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        });
    }

    //Thanh toán fake
    // async function onApproveTest() {
    //     await payBooking({ bookingId, details: { payer: {} } });
    //     refetch();

    //     toast.success("Booking is successfully paid");
    // }

    function onError(err) {
        toast.error(err.message);
    }

    //Tạo một đơn hàng PayPal
    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: booking.totalPrice },
                    },
                ],
            })
            .then((orderID) => {
                return orderID;
            });
    }

    if (isLoading) return <Spinner />;

    const servicesPrice = booking.services.reduce(
        (acc, service) => acc + (service.regularPrice - service.discount),
        0
    );

    const hasServices = Boolean(booking.services.length);

    return (
        <>
            <Heading as="h1">Comfirm pay</Heading>
            <StyledContainer>
                <ColLetf>
                    <Attraction>
                        <div>
                            <Title>This is a rare find.</Title>
                            <Paragraph>
                                Cabin's place is usually booked.
                            </Paragraph>
                        </div>
                        <Icon>
                            <IoDiamondOutline />
                        </Icon>
                    </Attraction>

                    <Heading as="h2">Your trip</Heading>

                    <Dates>
                        <div>
                            <Title>Dates</Title>
                            <Paragraph>
                                {"From "}
                                {
                                    new Date(booking.startDate)
                                        .toISOString()
                                        .split("T")[0]
                                }{" "}
                                {"to"}{" "}
                                {
                                    new Date(booking.endDate)
                                        .toISOString()
                                        .split("T")[0]
                                }
                            </Paragraph>
                        </div>
                        <Icon>
                            <IoCalendarOutline />
                        </Icon>
                    </Dates>

                    <Guest>
                        <div>
                            <Title>Guests</Title>
                            <Paragraph>{booking.numGuests} guest</Paragraph>
                        </div>
                        <Icon>
                            <FaPeopleRoof />
                        </Icon>
                    </Guest>

                    <Section>
                        {booking.observations && (
                            <DataItem
                                icon={<HiOutlineChatBubbleBottomCenterText />}
                                label="Observations"
                            >
                                {booking.observations}
                            </DataItem>
                        )}

                        <DataItem
                            icon={<HiOutlineCheckCircle />}
                            label="Services included?"
                        >
                            {hasServices ? "Yes" : "No"}
                        </DataItem>

                        <Price isPaid={booking.isPaid}>
                            <DataItem
                                icon={<HiOutlineCurrencyDollar />}
                                label={`Total price`}
                            >
                                {formatCurrency(booking.totalPrice)}

                                {hasServices && (
                                    <>
                                        {" ("}
                                        {formatCurrency(
                                            (booking.cabin.regularPrice -
                                                booking.cabin.discount) *
                                                booking.numNights
                                        )}{" "}
                                        cabin +{" "}
                                        {booking.services
                                            .map(
                                                (service) =>
                                                    `${formatCurrency(
                                                        (service.regularPrice -
                                                            service.discount) *
                                                            booking.numGuests *
                                                            booking.numNights
                                                    )} ${service.name}`
                                            )
                                            .join(" + ")}
                                        {")"}
                                    </>
                                )}
                            </DataItem>

                            <p>
                                {booking.isPaid
                                    ? "Paid"
                                    : "Will pay at property"}
                            </p>
                        </Price>
                    </Section>
                </ColLetf>
                <StyledCost>
                    <StyledCabin>
                        <Img src={booking.cabin.image} />
                        <div>
                            <Paragraph type="room-in">
                                Cabin {booking.cabin.name}
                            </Paragraph>
                            <Paragraph type="desc">
                                Enjoy the fresh air and mysterious natural
                                scenery in a warm cabin
                            </Paragraph>

                            <StyleQuanityAndRate type="left">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="15"
                                    viewBox="0 0 14 15"
                                    fill="none"
                                >
                                    <path
                                        d="M6.28671 1.19529C6.51122 0.504306 7.48878 0.504305 7.71329 1.19529L8.85224 4.70061C8.95265 5.00963 9.24061 5.21885 9.56553 5.21885H13.2512C13.9778 5.21885 14.2799 6.14856 13.6921 6.57561L10.7103 8.74202C10.4474 8.933 10.3374 9.27153 10.4378 9.58054L11.5768 13.0859C11.8013 13.7768 11.0104 14.3514 10.4226 13.9244L7.44084 11.758C7.17797 11.567 6.82203 11.567 6.55916 11.758L3.57736 13.9244C2.98957 14.3514 2.19871 13.7768 2.42322 13.0859L3.56217 9.58054C3.66258 9.27153 3.55259 8.933 3.28972 8.74202L0.307916 6.57561C-0.279869 6.14856 0.022212 5.21885 0.748755 5.21885H4.43447C4.75939 5.21885 5.04735 5.00963 5.14776 4.70061L6.28671 1.19529Z"
                                        fill="#B89146"
                                    />
                                </svg>
                                <Rate>{booking.cabin.ratingsAverage}</Rate>
                                <Quanity>
                                    ({booking.cabin.ratingQuantity} reviews)
                                </Quanity>
                            </StyleQuanityAndRate>
                        </div>
                    </StyledCabin>

                    <ShortLine type="cost" />

                    <Heading as="h2">Price details</Heading>

                    <Cost>
                        <span>
                            {formatCurrency(
                                booking.cabin.regularPrice -
                                    booking.cabin.discount
                            )}{" "}
                            x {booking.numNights} Nights:
                        </span>
                        <span>
                            {formatCurrency(
                                (booking.cabin.regularPrice -
                                    booking.cabin.discount) *
                                    booking.numNights
                            )}
                        </span>
                    </Cost>

                    <Cost>
                        <span>Services fee:</span>
                        <span>
                            {formatCurrency(
                                servicesPrice *
                                    booking.numGuests *
                                    booking.numNights || 0
                            )}
                        </span>
                    </Cost>

                    <ShortLine type="cost" />

                    <Cost type="total">
                        <span>Total price:</span>
                        <span>{formatCurrency(booking.totalPrice)}</span>
                    </Cost>

                    {/* PAY ORDER PLACEHOLDER */}
                    {!booking.isPaid && (
                        <ListGroup.Item>
                            {isPaying && <SpinnerMini />}

                            {isPending ? (
                                <SpinnerMini />
                            ) : (
                                <div>
                                    {/* <Button
                                                style={{ marginBottom: "10px" }}
                                                onClick={onApproveTest}
                                            >
                                                Test Pay Order
                                            </Button> */}

                                    <div>
                                        <PayPalButtons
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                            onError={onError}
                                        ></PayPalButtons>
                                    </div>
                                </div>
                            )}
                        </ListGroup.Item>
                    )}
                </StyledCost>
            </StyledContainer>
        </>
    );
}

export default BookingScreen;
