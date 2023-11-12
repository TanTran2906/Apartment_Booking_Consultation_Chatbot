import { Link } from "react-router-dom";
import styles from "../../styles/clientStyles/Hero.module.css";
function Hero() {
    return (
        <>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.hero__inner}>
                        {/* <!-- Hero media --> */}
                        <div className={styles.hero__media}>
                            <div className={styles.hero__img_wrap}>
                                <img
                                    src="/homes/img/hero_cabin_01.jpg"
                                    alt=""
                                    className={styles.hero__img}
                                />

                                {/* <!-- Decorators --> */}
                                <img
                                    src="/homes/img/decor-01.svg"
                                    alt=""
                                    className={`${styles.hero__decor} ${styles.hero__decor_left}`}
                                />
                                <img
                                    src="/homes/img/decor-02.svg"
                                    alt=""
                                    className={`${styles.hero__decor} ${styles.hero__decor_right}`}
                                />
                            </div>

                            <div
                                className={`${styles.hero__img_wrap} ${styles.hero__img_wrap_small}`}
                            >
                                <img
                                    src="/homes/img/hero_cabin_02.jpg"
                                    alt=""
                                    className={styles.hero__img}
                                />
                            </div>

                            <div className={styles.hero__list}>
                                {/* <!-- Hero list item 1 --> */}
                                <section className={styles.hero_list_item}>
                                    <img
                                        src="/homes/img/sunset.jpg"
                                        alt=""
                                        className={styles.hero_list_item__thumb}
                                    />
                                    <div
                                        className={styles.hero_list_item__info}
                                    >
                                        <p
                                            className={
                                                styles.hero_list_item__title
                                            }
                                        >
                                            Sunset
                                        </p>
                                        <div
                                            className={
                                                styles.hero_list_item__skeleton
                                            }
                                        ></div>
                                        <div
                                            className={
                                                styles.hero_list_item__skeleton
                                            }
                                            // style="--width: 39px"
                                        ></div>
                                    </div>
                                </section>

                                <div
                                    className={styles.hero_list_item__separate}
                                ></div>

                                {/* <!-- Hero list item 2 --> */}
                                <section className={styles.hero_list_item}>
                                    <img
                                        src="/homes/img/sunrise.jpg"
                                        alt=""
                                        className={styles.hero_list_item__thumb}
                                    />
                                    <div
                                        className={styles.hero_list_item__info}
                                    >
                                        <p
                                            className={
                                                styles.hero_list_item__title
                                            }
                                        >
                                            Sunrise
                                        </p>
                                        <div
                                            className={
                                                styles.hero_list_item__skeleton
                                            }
                                        ></div>
                                        <div
                                            className={
                                                styles.hero_list_item__skeleton
                                            }
                                            // style="--width: 39px"
                                        ></div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* <!-- Hero content --> */}
                        <section className={styles.hero__content}>
                            <h1 className={styles.hero__heading}>
                                Classic and Tranquility Unveiled: Cabins at Our
                                Hotel
                            </h1>
                            <p className={styles.hero__desc}>
                                Discover warmth and comfort in our hotel's
                                cabins. With sophisticated spaces and modern
                                amenities, each cabin is an ideal retreat for
                                upscale travel and unforgettable moments with
                                loved ones and friends. Book your stay today to
                                embark on your adventure!
                            </p>
                            <div className={styles.hero__row}>
                                <Link
                                    to="/cabins"
                                    className={`${styles.btn} ${styles.btn__primary} ${styles.hero__cta_btn}`}
                                >
                                    Book a Cabin
                                    <span className={styles.btn__icon}>
                                        <svg
                                            width="5"
                                            height="6"
                                            viewBox="0 0 5 6"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1.48584 0.5L3.98584 3L1.48584 5.5"
                                                stroke="#FD5056"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                                <a href="#!" className={styles.hero__cta_link}>
                                    Schedule a Call
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;
