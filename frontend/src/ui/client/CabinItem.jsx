import styled from "styled-components";

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
    gap: 10px;
    padding: 69px 60px 89px 0px;
`;

const Price = styled.p`
    color: var(--primary-color-01, #b89146);

    /* Tagline/05 */
    text-align: center;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
`;

const StyleQuanityAndRate = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

const Rate = styled.p`
    color: var(--text-color-01, #0e1317);

    /* Tagline/05 */
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
`;

const Quanity = styled.p`
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

const LinkTo = styled.div`
    color: var(--primary-color-01, #b89146);
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
    text-transform: uppercase;
`;

function CabinItem() {
    return (
        <StyleCabinItem>
            <Img src="/cabins/cabin-001.jpg" />
            <StyledCabinInformation>
                <Heading>001</Heading>
                <Description>
                    Discover the ultimate luxury getaway for couples in the cozy
                    wooden cabin 001. Nestled in a picturesque forest, this
                    stunning cabin offers a secluded and intimate retreat.
                    Inside, enjoy modern high-quality wood interiors, a
                    comfortable seating area, a fireplace and a fully-equipped
                    kitchen. The plush king-size bed, dressed in fine linens
                    guarantees a peaceful nights sleep. Relax in the spa-like
                    shower and unwind on the private deck with hot tub.
                </Description>
                <StyleMaxCapacity>
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
                    <MaxCapacity>(4) Guest's</MaxCapacity>
                </StyleMaxCapacity>
            </StyledCabinInformation>

            <Line />

            <StylePriceAndRate>
                <Price>$219 / Night</Price>
                <StyleQuanityAndRate>
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
                    <Rate>4.5</Rate>
                    <Quanity>80 reviews</Quanity>
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
                            text-anchor="middle"
                            dy=".3em"
                            font-size="12"
                            fill="#B89146"
                        >
                            &#62;
                        </text>
                    </svg>
                    <LinkTo>READ MORE</LinkTo>
                </StyleLinkToDetail>
            </StylePriceAndRate>
        </StyleCabinItem>
    );
}

export default CabinItem;
