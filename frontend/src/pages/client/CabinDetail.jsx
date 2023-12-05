import styled, { css } from "styled-components";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Instruction from "../../ui/client/Instruction";
import {
    useCreateReviewMutation,
    useGetCabinDetailsQuery,
} from "../../slices/cabinSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useDispatch, useSelector } from "react-redux";
import { addToCabin } from "../../slices/bookingLocalStorage";
import toast from "react-hot-toast";
import { useState } from "react";
import { ListGroup, Form, Col } from "react-bootstrap";
import Message from "../../ui/Message";
import { FaRegSmileWink } from "react-icons/fa";
import Rating from "../../ui/client/Rating";
import { formatDistanceFromNow } from "../../utils/helpers";

const StyledContainer = styled.div`
    max-width: calc(100% - 48px);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 35% 65%;
    gap: 20px;
`;

const StyleColLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const StyledBooknow = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: 20% 20% 25% 35%;
    grid-template-columns: 100%;
    width: 330px;
    height: 347px;
    border: 1px solid var(--text-color-01, rgba(14, 19, 23, 0.1));
    padding: 30px 48px 30px 30px;
    align-items: center;
    justify-content: start;
`;

const StyleReviews = styled.div`
    color: #222222;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Review = styled.div`
    padding: 0px 8px;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const User = styled.div`
    display: flex;
    gap: 10px;
`;

const Avatar = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover; /* Đảm bảo hình ảnh điền đầy đối tượng không làm méo hoặc căng hình */
    object-position: center center; /* Canh giữa hình ảnh */
`;

const Paragraph = styled.p`
    color: #222222;
    /* line-height: 20px; */

    ${(props) =>
        props.type === "heading" &&
        css`
            font-size: 1.4rem;
            font-weight: 600;
        `}

    ${(props) =>
        props.type === "desc" &&
        css`
            font-size: 1.4rem;
        `}
`;

const StyleRating = styled.div`
    color: #222222;
    display: flex;
    gap: 5px;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 18px;
`;

const StyleMaxCapacity = styled.div`
    display: flex;
    align-items: center;
    /* justify-content: center; */
    gap: 10px;
`;

const ShortLine = styled.div`
    position: absolute;
    top: 75px;
    left: 30px;
    width: 70px;
    height: 1px;
    background: var(--primary-color-01, #b89146);
`;

const MaxCapacity = styled.p`
    color: var(--text-color-02, #333334);

    /* Paragraph/02 */
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 173.333% */
`;

const Price = styled.p`
    color: var(--text-color-01, #0e1317);
    /* Heading/H4 */
    /* font-family: "Bai Jamjuree", sans-serif; */
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 500;
    line-height: 34px; /* 141.667% */
`;

const Span = styled.span`
    color: var(--text-color-03, #666667);
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
`;

const StyleCabinDetail = styled.div`
    width: 900px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export const Description = styled.p`
    color: var(--text-color-02, #333334);
    /* Paragraph/02 */
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 26px; /* 173.333% */
`;

const Img = styled.img`
    margin: auto;
    width: 840px;
    min-width: 840px;
    object-fit: cover; /* Đảm bảo hình ảnh điền đầy đối tượng không làm méo hoặc căng hình */
    object-position: center center; /* Canh giữa hình ảnh */
`;

const StyledListGroupItem = styled(ListGroup.Item)`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const FormRow = styled(Form.Group)`
    display: flex;
`;

const Label = styled.div`
    display: flex;
    align-items: center;
    /* justify-content: center; */
    margin-right: 20px;
    min-width: 100px;
`;

const Input = styled(Form.Control)`
    display: inline-block;
    width: 350px;
    min-width: 300px;
`;

function CabinDetail() {
    const { cabinId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const {
        data: cabin,
        isLoading,
        isError,
        refetch,
    } = useGetCabinDetailsQuery(cabinId);
    const [createReview, { isLoading: loadingProductReview }] =
        useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);

    if (isLoading) return <Spinner />;
    if (isError) return <Empty source="cabin" />;

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                cabinId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success("Review created successfully");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const {
        name,
        regularPrice,
        discount,
        maxCapacity,
        description,
        image,
        // reviews,
    } = cabin;

    const addToCabinHandler = () => {
        dispatch(addToCabin({ ...cabin }));
        navigate("/bookingInfo");
    };

    return (
        <StyledContainer>
            <StyleColLeft>
                <StyledBooknow>
                    <Heading as="h3">Your rice</Heading>
                    <ShortLine />
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
                    <Price>
                        ${regularPrice - discount}
                        <Span>/Night</Span>
                    </Price>
                    <Button size="large" onClick={addToCabinHandler}>
                        Book Now
                    </Button>
                </StyledBooknow>

                {/* REVIEW */}
                {cabin.reviews.length === 0 && <Empty resource="review" />}

                <StyleReviews>
                    {cabin.reviews.map((review) => (
                        <Review key={review.name}>
                            <User>
                                <Avatar src={review.avatar} />
                                <div>
                                    <Paragraph type="heading">
                                        {review.name}
                                    </Paragraph>
                                    <Paragraph type="desc">
                                        {review.nationality}
                                    </Paragraph>
                                </div>
                            </User>
                            <StyleRating>
                                <Paragraph>
                                    <div>
                                        <Rating value={review.rating} />
                                    </div>
                                </Paragraph>
                                <Paragraph type="heading">
                                    {review?.createAt?.substring(0, 10)}
                                </Paragraph>
                            </StyleRating>

                            <Paragraph type="desc">{review.comment}</Paragraph>
                        </Review>
                    ))}
                </StyleReviews>

                <ListGroup variant="flush">
                    <StyledListGroupItem>
                        <h2>Write a Customer Review</h2>

                        {loadingProductReview && <Spinner />}

                        {userInfo ? (
                            <StyledForm onSubmit={submitHandler}>
                                <FormRow className="my-2" controlId="rating">
                                    <Label>Rating</Label>
                                    <Input
                                        as="select"
                                        required
                                        value={rating}
                                        onChange={(e) =>
                                            setRating(e.target.value)
                                        }
                                    >
                                        <option value="">Select...</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </Input>
                                </FormRow>
                                <FormRow className="my-2" controlId="comment">
                                    <Label>Comment</Label>
                                    <Input
                                        as="textarea"
                                        row="8"
                                        required
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                    ></Input>
                                </FormRow>
                                <FormRow className="my-2" controlId="comment">
                                    <Label></Label>
                                    <Button
                                    disabled={loadingProductReview}
                                    type="submit"
                                    variant="primary"
                                >
                                    Submit
                                    </Button>
                                </FormRow>
                                
                            </StyledForm>
                        ) : (
                            <Message>
                                Please <Link to="/login">sign in</Link> to write
                                a review !
                            </Message>
                        )}
                    </StyledListGroupItem>
                </ListGroup>
            </StyleColLeft>

            <StyleCabinDetail>
                <Heading as="h1">Cabin {name}</Heading>
                <Description>{description}</Description>

                <Img src={image} />

                <Instruction />
            </StyleCabinDetail>
        </StyledContainer>
    );
}

export default CabinDetail;
