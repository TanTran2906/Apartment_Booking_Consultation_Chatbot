import styled from "styled-components";

const StyleServiceItem = styled.div`
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

const StyledServiceInformation = styled.div`
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
    -webkit-line-clamp: 4; /* Số dòng tối đa */
    -webkit-box-orient: vertical;

    /* Paragraph/02 */
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 173.333% */
`;

// const StyleMaxCapacity = styled.div`
//     display: flex;
//     align-items: center;
//     /* justify-content: center; */
//     gap: 10px;
// `;

// const MaxCapacity = styled.p`
//     color: var(--text-color-02, #333334);

//     /* Paragraph/02 */
//     font-size: 1.5rem;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 26px; /* 173.333% */
// `;

const Line = styled.div`
    width: 1px;
    height: 170px;
    margin: 40px 0px;
    opacity: 0.1;
    background: var(--text-color-01, #0e1317);
`;

const StylePriceAndDiscount = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    padding: 69px 60px 89px 0px;
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

// const StyleQuanityAndRate = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 5px;
// `;

// const Rate = styled.p`
//     color: var(--text-color-01, #0e1317);

//     /* Tagline/05 */
//     font-size: 1.4rem;
//     font-weight: 600;
//     line-height: 24px; /* 171.429% */
// `;

// const Quanity = styled.p`
//     color: var(--text-color-02, #333334);

//     /* Paragraph/03 */
//     font-size: 1.3rem;
//     font-weight: 400;
//     line-height: 24px; /* 184.615% */
// `;

const StyleLinkToDetail = styled.a`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const LinkTo = styled.div`
    color: var(--primary-color-01, #b89146);
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
    text-transform: uppercase;
`;

function ServiceItem({ service }) {
    const {
        // _id: serviceId,
        name,
        regularPrice,
        discount,
        image,
        description,
    } = service;

    return (
        <StyleServiceItem>
            <Img src={image} />
            <StyledServiceInformation>
                <Heading>{name}</Heading>
                <Description>{description}</Description>
            </StyledServiceInformation>

            <Line />

            <StylePriceAndDiscount>
                <Price discount={discount ? true : false}>
                    ${regularPrice - discount} / Person
                </Price>

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
                    <LinkTo>READ MORE</LinkTo>
                </StyleLinkToDetail>
            </StylePriceAndDiscount>
        </StyleServiceItem>
    );
}

export default ServiceItem;
