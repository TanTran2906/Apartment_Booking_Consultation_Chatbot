import { useState } from "react";
import styles from "../../styles/clientStyles/SampleReview.module.css";

const reviews = [
    {
        author: "Jonatan Johansson",
        review: "We had an amazing getaway at the hotel's cabin. The space is comfortable, ensuring privacy, and equipped with modern amenities. A perfect blend of contemporary convenience and natural charm.",
        image: "/users/user-17.jpg",
    },
    {
        author: "Jonathan Smith",
        review: "The connection with nature here is truly special. You can relax on the balcony and admire the breathtaking mountain views. The fresh and tranquil air creates an unforgettable experience.",
        image: "/users/user-15.jpg",
    },
    {
        author: "Jonathan Williams",
        review: "The hotel staff is exceptionally dedicated and friendly. They are always ready to assist, ensuring we had the most comfortable stay. Their professionalism and warmth create a cozy atmosphere.",
        image: "/users/user-18.jpg",
    },
    {
        author: "Emko Watson",
        review: "The dining experiences at the hotel are authentic. The food is delicious and diverse, served with great attention. Enjoying dinner by the fireplace in the unique outdoor setting is a standout experience.",
        image: "/users/user-14.jpg",
    },
];

function SampleReview() {
    const [currentReview, setCurrentReview] = useState(0);

    const nextReview = () => {
        setCurrentReview((prev) =>
            prev === reviews.length - 1 ? 0 : prev + 1
        );
    };

    const prevReview = () => {
        setCurrentReview((prev) =>
            prev === 0 ? reviews.length - 1 : prev - 1
        );
    };

    const currentReviewData = reviews[currentReview];

    return (
        <>
            {/* <!-- Review --> */}
            <section className={styles.review}>
                <div className={styles.container}>
                    <div className={styles.review__inner}>
                        {/* <!-- Review previous --> */}
                        <button
                            className={styles.review__control}
                            onClick={prevReview}
                        >
                            <svg
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.875 10.9985H3.125"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8.75 5.37354L3.125 10.9985L8.75 16.6235"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        {/* <!-- Review content --> */}
                        <div className={styles.review__content}>
                            {/* <!-- Review list --> */}
                            <div className={styles.review__list}>
                                {/* <!-- Review item 1 --> */}
                                <article className={styles.review_item}>
                                    <figure
                                        className={styles.review_item__media}
                                    >
                                        <img
                                            src={currentReviewData.image}
                                            alt={currentReviewData.author}
                                            className={styles.review_item__img}
                                        />
                                    </figure>
                                    <section
                                        className={styles.review_item__content}
                                    >
                                        <h2 className={styles.section__heading}>
                                            Our Reviews
                                        </h2>
                                        <blockquote
                                            className={
                                                styles.review_item__quote
                                            }
                                        >
                                            {currentReviewData.review}
                                        </blockquote>
                                        <p
                                            className={
                                                styles.review_item__author
                                            }
                                        >
                                            {currentReviewData.author}
                                        </p>
                                    </section>
                                </article>

                                {/* <!-- Review item 2 --> */}
                                <article className={styles.review_item}>
                                    <figure
                                        className={styles.review_item__media}
                                    >
                                        <img
                                            src={currentReviewData.image}
                                            alt={currentReviewData.author}
                                            className={styles.review_item__img}
                                        />
                                    </figure>
                                    <section
                                        className={styles.review_item__content}
                                    >
                                        <h2 className={styles.section_heading}>
                                            Our Reviews
                                        </h2>
                                        <blockquote
                                            className={
                                                styles.review_item__quote
                                            }
                                        >
                                            {currentReviewData.review}
                                        </blockquote>
                                        <p
                                            className={
                                                styles.review_item__author
                                            }
                                        >
                                            {currentReviewData.author}
                                        </p>
                                    </section>
                                </article>

                                {/* <!-- Review item 3 --> */}
                                <article className={styles.review_item}>
                                    <figure
                                        className={styles.review_item__media}
                                    >
                                        <img
                                            src={currentReviewData.image}
                                            alt={currentReviewData.author}
                                            className={styles.review_item__img}
                                        />
                                    </figure>
                                    <section
                                        className={styles.review_item__content}
                                    >
                                        <h2 className={styles.section_heading}>
                                            Our Reviews
                                        </h2>
                                        <blockquote
                                            className={
                                                styles.review_item__quote
                                            }
                                        >
                                            {currentReviewData.review}
                                        </blockquote>
                                        <p
                                            className={
                                                styles.review_item__author
                                            }
                                        >
                                            {currentReviewData.author}
                                        </p>
                                    </section>
                                </article>

                                {/* <!-- Review item 4 --> */}
                                <article className={styles.review_item}>
                                    <figure
                                        className={styles.review_item__media}
                                    >
                                        <img
                                            src={currentReviewData.image}
                                            alt={currentReviewData.author}
                                            className={styles.review_item__img}
                                        />
                                    </figure>
                                    <section
                                        className={styles.review_item__content}
                                    >
                                        <h2 className={styles.section__heading}>
                                            Our Reviews
                                        </h2>
                                        <blockquote
                                            className={
                                                styles.review_item__quote
                                            }
                                        >
                                            {currentReviewData.review}
                                        </blockquote>
                                        <p
                                            className={
                                                styles.review_item__author
                                            }
                                        >
                                            {currentReviewData.author}
                                        </p>
                                    </section>
                                </article>
                            </div>

                            {/* <!-- Review dots --> */}
                            <div className={styles.review__dots}>
                                <div
                                    className={`${styles.review__dot} ${
                                        currentReview === 0
                                            ? styles.review__dot__active
                                            : ""
                                    }`}
                                ></div>
                                <div
                                    className={`${styles.review__dot} ${
                                        currentReview === 1
                                            ? styles.review__dot__active
                                            : ""
                                    }`}
                                ></div>
                                <div
                                    className={`${styles.review__dot} ${
                                        currentReview === 2
                                            ? styles.review__dot__active
                                            : ""
                                    }`}
                                ></div>
                                <div
                                    className={`${styles.review__dot} ${
                                        currentReview === 3
                                            ? styles.review__dot__active
                                            : ""
                                    }`}
                                ></div>
                            </div>
                        </div>

                        {/* <!-- Review next --> */}
                        <button
                            className={styles.review__control}
                            onClick={nextReview}
                        >
                            <svg
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.125 10.9985H16.875"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11.25 5.37354L16.875 10.9985L11.25 16.6235"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SampleReview;
