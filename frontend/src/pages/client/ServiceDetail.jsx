import styled from "styled-components";
import Heading from "../../ui/Heading";
import Instruction from "../../ui/client/Instruction";
import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useGetServiceDetailsQuery } from "../../slices/serviceSlice";

const StyledContainer = styled.div`
    max-width: calc(100% - 100px);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 25% 75%;
    gap: 30px;
`;

const StyledBooknow = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: 20% 20% 60%;
    grid-template-columns: 100%;
    width: 330px;
    height: 347px;
    border: 1px solid var(--text-color-01, rgba(14, 19, 23, 0.1));
    padding: 30px 48px 30px 30px;
    align-items: center;
    justify-content: start;
`;

// const StyleMaxCapacity = styled.div`
//     display: flex;
//     align-items: center;
//     /* justify-content: center; */
//     gap: 10px;
// `;

const ShortLine = styled.div`
    position: absolute;
    top: 75px;
    left: 30px;
    width: 70px;
    height: 1px;
    background: var(--primary-color-01, #b89146);
`;

// const MaxCapacity = styled.p`
//     color: var(--text-color-02, #333334);

//     /* Paragraph/02 */
//     font-size: 1.5rem;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 26px; /* 173.333% */
// `;

const Price = styled.p`
    color: var(--text-color-01, #0e1317);
    /* Heading/H4 */
    /* font-family: "Bai Jamjuree", sans-serif; */
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 500;
    line-height: 34px; /* 141.667% */
`;

const Note = styled.p`
    color: var(--text-color-03, #666667);
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    color: #b89146;
    font-style: italic; /* Thêm chữ nghiêng */
`;

const Span = styled.span`
    color: var(--text-color-03, #666667);
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
`;

const StyleCabinDetail = styled.div`
    width: 960px;
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
    width: 900px;
    object-fit: cover; /* Đảm bảo hình ảnh điền đầy đối tượng không làm méo hoặc căng hình */
    object-position: center center; /* Canh giữa hình ảnh */
`;

//REUSABLE FROM CabinDetail
function ServiceDetail() {
    const { serviceId } = useParams();
    const {
        data: service,
        isLoading,
        isError,
    } = useGetServiceDetailsQuery(serviceId);

    if (isLoading) return <Spinner />;
    if (isError) return <Empty source="service" />;

    const { name, regularPrice, discount, description, image } = service;

    return (
        <StyledContainer>
            <StyledBooknow>
                <Heading as="h3">Your rice</Heading>
                <ShortLine />

                <Price>
                    ${regularPrice - discount}
                    <Span>/Person</Span>
                </Price>

                <Note>
                    **Note : The service will be purchased separately when you
                    proceed with the cabin reservation.
                </Note>
            </StyledBooknow>

            <StyleCabinDetail>
                <Heading as="h1">{name}</Heading>
                <Description>{description}</Description>

                <Img src={image} />

                <Instruction />
            </StyleCabinDetail>
        </StyledContainer>
    );
}

export default ServiceDetail;
