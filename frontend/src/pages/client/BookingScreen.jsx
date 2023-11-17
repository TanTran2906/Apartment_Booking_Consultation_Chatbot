import styled, { css } from "styled-components";
import { Quanity, Rate, StyleQuanityAndRate } from "../../ui/client/CabinItem";
import { Cost, ShortLine } from "./NewBooking";
import { useParams } from "react-router-dom";
import { useGetBookingDetailsQuery } from "../../slices/bookingSlice";
import Spinner from "../../ui/Spinner";
import { IoDiamondOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { FaPeopleRoof } from "react-icons/fa6";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { da } from "date-fns/locale";

const StyledContainer = styled.div`
    max-width: calc(100% - 300px);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 70px;
`;

const StyledCost = styled.div`
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 30px;
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
    gap: 30px;
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

function BookingScreen() {
    const { bookingId } = useParams();

    const { data, isLoading } = useGetBookingDetailsQuery(bookingId);

    if (isLoading) return <Spinner />;

    const servicesPrice = data.services.reduce(
        (acc, service) => acc + (service.regularPrice - service.discount),
        0
    );

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
                                    new Date(data.startDate)
                                        .toISOString()
                                        .split("T")[0]
                                }{" "}
                                {"to"}{" "}
                                {
                                    new Date(data.endDate)
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
                            <Paragraph>{data.numGuests} guest</Paragraph>
                        </div>
                        <Icon>
                            <FaPeopleRoof />
                        </Icon>
                    </Guest>
                </ColLetf>
                <StyledCost>
                    <StyledCabin>
                        <Img src="/cabins/cabin-001.jpg" />
                        <div>
                            <Paragraph type="room-in">
                                Cabin {data.cabin.name}
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
                                <Rate>{data.cabin.ratingsAverage}</Rate>
                                <Quanity>
                                    ({data.cabin.ratingQuantity} reviews)
                                </Quanity>
                            </StyleQuanityAndRate>
                        </div>
                    </StyledCabin>

                    <ShortLine type="cost" />

                    <Heading as="h2">Price details</Heading>

                    <Cost>
                        <span>
                            {formatCurrency(
                                data.cabin.regularPrice - data.cabin.discount
                            )}{" "}
                            x {data.numNights} Nights:
                        </span>
                        <span>
                            {formatCurrency(
                                (data.cabin.regularPrice -
                                    data.cabin.discount) *
                                    data.numNights
                            )}
                        </span>
                    </Cost>

                    <Cost>
                        <span>Services fee:</span>
                        <span>
                            {formatCurrency(
                                servicesPrice *
                                    data.numGuests *
                                    data.numNights || 0
                            )}
                        </span>
                    </Cost>

                    <ShortLine type="cost" />

                    <Cost type="total">
                        <span>Total price:</span>
                        <span>{formatCurrency(data.totalPrice)}</span>
                    </Cost>
                </StyledCost>
            </StyledContainer>
        </>
    );
}

export default BookingScreen;
