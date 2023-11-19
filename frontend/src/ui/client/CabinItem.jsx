import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Rating from "./Rating";

const StyleCabinItem = styled.div`
    display: flex;
    width: 960px;
    height: 250px;
    flex-shrink: 0;
    gap: 50px;
    border: 1px solid var(--text-color-01, rgba(14, 19, 23, 0.1));
    /* opacity: 0.1; */
`;

const Img = styled.img`
    width: 300px;
    height: 250px;
    object-fit: cover; /* Đảm bảo hình ảnh điền đầy đối tượng không làm méo hoặc căng hình */
    object-position: center center; /* Canh giữa hình ảnh */
`;

const StyledCabinInformation = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 40px 0;
`;

const Heading = styled.h4`
    color: var(--text-color-01, #0e1317);

    /* Heading/H4 */
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 500;
    line-height: 34px; /* 141.667% */
`;

const Description = styled.p`
    width: 330px;
    /* height: 80px; */
    color: var(--text-color-03, #666667);

    overflow: hidden;
    text-overflow: ellipsis; /* Hiển thị dấu ba chấm khi văn bản vượt quá kích thước */
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Số dòng tối đa */
    -webkit-box-orient: vertical;

    /* Paragraph/02 */
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 173.333% */
`;

const StyleMaxCapacity = styled.div`
    display: flex;
    align-items: center;
    /* justify-content: center; */
    gap: 10px;
`;

const MaxCapacity = styled.p`
    color: var(--text-color-02, #333334);

    /* Paragraph/02 */
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 173.333% */
`;

const Line = styled.div`
    width: 1px;
    height: 170px;
    margin: 40px 0px;
    opacity: 0.1;
    background: var(--text-color-01, #0e1317);
`;

const StylePriceAndRate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: -15px;
    gap: 10px;
    padding: 0px;
`;

const Price = styled.p`
    ${(props) => (props.discount ? "color: red;" : "color: #b89146;")}

    /* Tagline/05 */
    text-align: center;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
`;

export const StyleQuanityAndRate = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px;

    ${(props) =>
        props.type === "left" &&
        css`
            justify-content: flex-start;
        `}
`;

export const Rate = styled.p`
    color: var(--text-color-01, #0e1317);

    /* Tagline/05 */
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
`;

export const Quanity = styled.p`
    color: var(--text-color-02, #333334);

    /* Paragraph/03 */
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 24px; /* 184.615% */
`;

const StyleLinkToDetail = styled.a`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const LinkTo = styled.button`
    color: var(--primary-color-01, #b89146);
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
    text-transform: uppercase;
    padding: 2px 5px;
    border: 1px solid #b89146;
    border-radius: 10px;
`;

function CabinItem({ cabin }) {
    const navigate = useNavigate();

    const {
        _id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
        ratingsAverage,
        ratingQuantity,
    } = cabin;

    return (
        <StyleCabinItem>
            <Img src={image} />
            <StyledCabinInformation>
                <Heading>Cabin {name}</Heading>
                <Description>{description}</Description>
                <StyleMaxCapacity>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M17.5 8.91125V4.0625C17.4995 3.64824 17.3348 3.25108 17.0418 2.95816C16.7489 2.66523 16.3518 2.50047 15.9375 2.5H4.0625C3.64824 2.50047 3.25108 2.66523 2.95816 2.95816C2.66523 3.25108 2.50047 3.64824 2.5 4.0625V8.91125C1.95208 9.10566 1.47774 9.46484 1.14204 9.93952C0.806344 10.4142 0.625738 10.9811 0.625 11.5625V15.3125C0.625 15.3954 0.657924 15.4749 0.716529 15.5335C0.775134 15.5921 0.85462 15.625 0.9375 15.625H1.875V17.1875C1.875 17.2704 1.90792 17.3499 1.96653 17.4085C2.02513 17.4671 2.10462 17.5 2.1875 17.5H5.3125C5.39538 17.5 5.47487 17.4671 5.53347 17.4085C5.59208 17.3499 5.625 17.2704 5.625 17.1875V15.625H14.375V17.1875C14.375 17.2704 14.4079 17.3499 14.4665 17.4085C14.5251 17.4671 14.6046 17.5 14.6875 17.5H17.8125C17.8954 17.5 17.9749 17.4671 18.0335 17.4085C18.0921 17.3499 18.125 17.2704 18.125 17.1875V15.625H19.0625C19.1454 15.625 19.2249 15.5921 19.2835 15.5335C19.3421 15.4749 19.375 15.3954 19.375 15.3125V11.5625C19.3743 10.9811 19.1937 10.4142 18.858 9.93952C18.5223 9.46484 18.0479 9.10566 17.5 8.91125ZM3.125 4.0625C3.12528 3.81395 3.22414 3.57565 3.3999 3.3999C3.57565 3.22414 3.81395 3.12528 4.0625 3.125H15.9375C16.1861 3.12528 16.4243 3.22414 16.6001 3.3999C16.7759 3.57565 16.8747 3.81395 16.875 4.0625V8.76777C16.7712 8.75608 16.6669 8.75015 16.5625 8.75H15.9375V7.8125C15.937 7.39824 15.7723 7.00108 15.4793 6.70816C15.1864 6.41523 14.7893 6.25047 14.375 6.25H11.875C11.4607 6.25047 11.0636 6.41523 10.7707 6.70816C10.4777 7.00108 10.313 7.39824 10.3125 7.8125V8.75H9.6875V7.8125C9.68703 7.39824 9.52227 7.00108 9.22934 6.70816C8.93642 6.41523 8.53926 6.25047 8.125 6.25H5.625C5.21074 6.25047 4.81358 6.41523 4.52066 6.70816C4.22773 7.00108 4.06297 7.39824 4.0625 7.8125V8.75H3.4375C3.33309 8.75015 3.22876 8.75608 3.125 8.76777V4.0625ZM15.3125 7.8125V8.75H10.9375V7.8125C10.9378 7.56395 11.0366 7.32565 11.2124 7.1499C11.3882 6.97414 11.6264 6.87528 11.875 6.875H14.375C14.6236 6.87528 14.8618 6.97414 15.0376 7.1499C15.2134 7.32565 15.3122 7.56395 15.3125 7.8125ZM9.0625 7.8125V8.75H4.6875V7.8125C4.68778 7.56395 4.78664 7.32565 4.9624 7.1499C5.13815 6.97414 5.37645 6.87528 5.625 6.875H8.125C8.37355 6.87528 8.61185 6.97414 8.7876 7.1499C8.96336 7.32565 9.06222 7.56395 9.0625 7.8125ZM5 16.875H2.5V15.625H5V16.875ZM17.5 16.875H15V15.625H17.5V16.875ZM18.75 15H1.25V13.75H18.75V15ZM18.75 13.125H1.25V11.875H18.75V13.125ZM1.2727 11.25C1.34844 10.7297 1.6088 10.254 2.00625 9.90973C2.40369 9.56549 2.9117 9.3757 3.4375 9.375H16.5625C17.0883 9.3757 17.5963 9.56549 17.9938 9.90973C18.3912 10.254 18.6516 10.7297 18.7273 11.25H1.2727Z"
                            fill="#B89146"
                        />
                        <path
                            d="M9.0625 4.375H10.9375C11.0204 4.375 11.0999 4.34208 11.1585 4.28347C11.2171 4.22487 11.25 4.14538 11.25 4.0625C11.25 3.97962 11.2171 3.90013 11.1585 3.84153C11.0999 3.78292 11.0204 3.75 10.9375 3.75H9.0625C8.97962 3.75 8.90013 3.78292 8.84153 3.84153C8.78292 3.90013 8.75 3.97962 8.75 4.0625C8.75 4.14538 8.78292 4.22487 8.84153 4.28347C8.90013 4.34208 8.97962 4.375 9.0625 4.375Z"
                            fill="#B89146"
                        />
                    </svg>
                    <MaxCapacity>
                        ({Math.ceil(maxCapacity / 2)}) Bed's
                    </MaxCapacity>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M17.2972 9.23829C17.8829 8.82673 18.2707 8.14213 18.2707 7.37046C18.2707 6.10809 17.2497 5.08712 15.9873 5.08712C14.725 5.08712 13.704 6.10809 13.704 7.37046C13.704 8.14213 14.0879 8.82673 14.6775 9.23829C14.1749 9.41241 13.7159 9.6815 13.3281 10.0297C12.7938 9.57466 12.1646 9.22642 11.4761 9.02064C12.311 8.51411 12.873 7.59207 12.873 6.54339C12.873 4.94466 11.5789 3.65063 9.98021 3.65063C8.38148 3.65063 7.08746 4.94862 7.08746 6.54339C7.08746 7.59207 7.64543 8.51411 8.48437 9.02064C7.80372 9.22642 7.18243 9.5707 6.65216 10.0179C6.26435 9.67754 5.81322 9.41241 5.31856 9.24225C5.90423 8.83069 6.29205 8.14608 6.29205 7.37442C6.29205 6.11205 5.27107 5.09108 4.00871 5.09108C2.74634 5.09108 1.72537 6.11205 1.72537 7.37442C1.72537 8.14608 2.10922 8.83069 2.69885 9.24225C1.12782 9.78439 0 11.2763 0 13.0293V13.2905C0 13.2984 0.00791452 13.3064 0.015829 13.3064H4.85556C4.82786 13.524 4.81203 13.7496 4.81203 13.9751V14.2442C4.81203 15.4077 5.75386 16.3495 6.91729 16.3495H13.051C14.2145 16.3495 15.1563 15.4077 15.1563 14.2442V13.9751C15.1563 13.7496 15.1405 13.524 15.1128 13.3064H19.9842C19.9921 13.3064 20 13.2984 20 13.2905V13.0293C19.9921 11.2723 18.8682 9.78043 17.2972 9.23829ZM14.3372 7.3665C14.3372 6.45633 15.0772 5.71633 15.9873 5.71633C16.8975 5.71633 17.6375 6.45633 17.6375 7.3665C17.6375 8.2648 16.9133 8.9969 16.019 9.01668C16.0071 9.01668 15.9992 9.01668 15.9873 9.01668C15.9755 9.01668 15.9676 9.01668 15.9557 9.01668C15.0574 9.00085 14.3372 8.26876 14.3372 7.3665ZM7.7127 6.54339C7.7127 5.29686 8.72576 4.2838 9.9723 4.2838C11.2188 4.2838 12.2319 5.29686 12.2319 6.54339C12.2319 7.7464 11.2861 8.73176 10.1029 8.79903C10.0594 8.79903 10.0158 8.79903 9.9723 8.79903C9.92877 8.79903 9.88524 8.79903 9.84171 8.79903C8.65849 8.73176 7.7127 7.7464 7.7127 6.54339ZM2.34666 7.3665C2.34666 6.45633 3.08666 5.71633 3.99683 5.71633C4.907 5.71633 5.64701 6.45633 5.64701 7.3665C5.64701 8.2648 4.92283 8.9969 4.02849 9.01668C4.01662 9.01668 4.00871 9.01668 3.99683 9.01668C3.98496 9.01668 3.97705 9.01668 3.96518 9.01668C3.07083 9.00085 2.34666 8.26876 2.34666 7.3665ZM4.96636 12.6692H0.641076C0.819153 10.9834 2.24377 9.66172 3.97309 9.64984C3.98101 9.64984 3.98892 9.64984 3.99683 9.64984C4.00475 9.64984 4.01266 9.64984 4.02058 9.64984C4.84369 9.6538 5.59557 9.95851 6.17729 10.4532C5.60744 11.0705 5.18401 11.8303 4.96636 12.6692ZM14.5152 14.2442C14.5152 15.0555 13.8544 15.7163 13.0431 15.7163H6.90938C6.09814 15.7163 5.43728 15.0555 5.43728 14.2442V13.9751C5.43728 11.5177 7.40008 9.50738 9.84171 9.43615C9.88524 9.44011 9.93273 9.44011 9.97626 9.44011C10.0198 9.44011 10.0673 9.44011 10.1108 9.43615C12.5524 9.50738 14.5152 11.5177 14.5152 13.9751V14.2442ZM14.9861 12.6692C14.7685 11.8343 14.353 11.0863 13.7871 10.469C14.3728 9.96247 15.1326 9.65776 15.9636 9.64984C15.9715 9.64984 15.9794 9.64984 15.9873 9.64984C15.9953 9.64984 16.0032 9.64984 16.0111 9.64984C17.7404 9.66172 19.165 10.9834 19.3431 12.6692H14.9861Z"
                            fill="#B89146"
                        />
                    </svg>
                    <MaxCapacity>({maxCapacity}) Guest's</MaxCapacity>
                </StyleMaxCapacity>
            </StyledCabinInformation>

            <Line />

            <StylePriceAndRate>
                <Price discount={discount ? true : false}>
                    ${regularPrice - discount} / Night
                </Price>
                <StyleQuanityAndRate>
                    <Rating value={ratingsAverage || 4.6} />
                    <Rate>{ratingsAverage?.toFixed(1) || 4.6}</Rate>
                    <Quanity>{ratingQuantity || 1} reviews</Quanity>
                </StyleQuanityAndRate>

                <StyleLinkToDetail>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                    >
                        <circle cx="9" cy="9" r="8.5" stroke="#B89146" />
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dy=".3em"
                            fontSize="12"
                            fill="#B89146"
                        >
                            &#62;
                        </text>
                    </svg>
                    <LinkTo onClick={() => navigate(`/cabins/${cabinId}`)}>
                        READ MORE
                    </LinkTo>
                </StyleLinkToDetail>
            </StylePriceAndRate>
        </StyleCabinItem>
    );
}

export default CabinItem;
