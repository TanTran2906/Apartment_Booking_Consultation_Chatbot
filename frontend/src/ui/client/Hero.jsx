import styles from "../../styles/clientStyles/Hero.module.css";
function Hero() {
    return (
        <>
            <section class={styles.hero}>
                <div class={styles.container}>
                    <div class={styles.hero__inner}>
                        {/* <!-- Hero media --> */}
                        <div class={styles.hero__media}>
                            <div class={styles.hero__img_wrap}>
                                <img
                                    src="/homes/img/hero_cabin_01.jpg"
                                    alt=""
                                    class={styles.hero__img}
                                />

                                {/* <!-- Decorators --> */}
                                <img
                                    src="/homes/img/decor-01.svg"
                                    alt=""
                                    class={`${styles.hero__decor} ${styles.hero__decor_left}`}
                                />
                                <img
                                    src="/homes/img/decor-02.svg"
                                    alt=""
                                    class={`${styles.hero__decor} ${styles.hero__decor_right}`}
                                />
                            </div>

                            <div
                                class={`${styles.hero__img_wrap} ${styles.hero__img_wrap_small}`}
                            >
                                <img
                                    src="/homes/img/hero_cabin_02.jpg"
                                    alt=""
                                    class={styles.hero__img}
                                />
                            </div>

                            <div class={styles.hero__list}>
                                {/* <!-- Hero list item 1 --> */}
                                <section class={styles.hero_list_item}>
                                    <img
                                        src="/homes/img/sunset.jpg"
                                        alt=""
                                        class={styles.hero_list_item__thumb}
                                    />
                                    <div class={styles.hero_list_item__info}>
                                        <p class={styles.hero_list_item__title}>
                                            Sunset
                                        </p>
                                        <div
                                            class={
                                                styles.hero_list_item__skeleton
                                            }
                                        ></div>
                                        <div
                                            class={
                                                styles.hero_list_item__skeleton
                                            }
                                            // style="--width: 39px"
                                        ></div>
                                    </div>
                                </section>

                                <div
                                    class={styles.hero_list_item__separate}
                                ></div>

                                {/* <!-- Hero list item 2 --> */}
                                <section class={styles.hero_list_item}>
                                    <img
                                        src="/homes/img/sunrise.jpg"
                                        alt=""
                                        class={styles.hero_list_item__thumb}
                                    />
                                    <div class={styles.hero_list_item__info}>
                                        <p class={styles.hero_list_item__title}>
                                            Sunrise
                                        </p>
                                        <div
                                            class={
                                                styles.hero_list_item__skeleton
                                            }
                                        ></div>
                                        <div
                                            class={
                                                styles.hero_list_item__skeleton
                                            }
                                            // style="--width: 39px"
                                        ></div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* <!-- Hero content --> */}
                        <section class={styles.hero__content}>
                            <h1 class={styles.hero__heading}>
                                Classic and Tranquility Unveiled: Cabins at Our
                                Hotel
                            </h1>
                            <p class={styles.hero__desc}>
                                Discover warmth and comfort in our hotel's
                                cabins. With sophisticated spaces and modern
                                amenities, each cabin is an ideal retreat for
                                upscale travel and unforgettable moments with
                                loved ones and friends. Book your stay today to
                                embark on your adventure!
                            </p>
                            <div class={styles.hero__row}>
                                <a
                                    href="#!"
                                    class={`${styles.btn} ${styles.btn__primary} ${styles.hero__cta_btn}`}
                                >
                                    Book a Cabin
                                    <span class={styles.btn__icon}>
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
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </a>
                                <a href="#!" class={styles.hero__cta_link}>
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
