import styles from "../../styles/clientStyles/About.module.css";
function About() {
    return (
        <>
            <main>
                {/* <!-- About --> */}
                <section class={styles.about}>
                    <div class={styles.container}>
                        <div class={styles.about__inner}>
                            <section class={styles.about__content}>
                                {/* <p class={styles.about__label}>// About //</p> */}
                                <h2
                                    class={`${styles.about__heading} ${styles.section__heading}`}
                                >
                                    The most ideal resting place.
                                </h2>
                                <p
                                    class={`${styles.about__desc} ${styles.section_desc}`}
                                >
                                    With sophisticated and modern cabins, we
                                    combine privacy and comfort to create the
                                    ideal vacation space. A great culinary
                                    experience, professional service and a
                                    wonderful natural environment all blend to
                                    create a unique and memorable memory. If you
                                    are looking for the perfect combination of
                                    luxury and instinct, this is the ideal
                                    getaway.
                                </p>
                                <div class={styles.about__checklist}>
                                    <span class={styles.about__check_item}>
                                        Classic and Private
                                    </span>
                                    <span class={styles.about__check_item}>
                                        Environmental Policy
                                    </span>
                                    <span class={styles.about__check_item}>
                                        Special Offers
                                    </span>
                                    <span class={styles.about__check_item}>
                                        Natural Environment
                                    </span>
                                </div>
                            </section>
                            <div class={styles.about__media}>
                                {/* <!-- About card --> */}
                                <div class={styles.about__card}>
                                    <b class={styles.about__card_title}>20+</b>
                                    <p class={styles.about__card_desc}>
                                        Years Establish
                                    </p>
                                    <img
                                        src="/homes/img/about-decor-01.svg"
                                        alt=""
                                        class={styles.about__card_decor}
                                    />
                                </div>

                                {/* <!-- About image wrapper --> */}
                                <figure class={styles.about__img_wrap}>
                                    <img
                                        src="/homes/img/hotel.jpg"
                                        alt=""
                                        class={styles.about__img_hotel}
                                    />
                                </figure>

                                <img
                                    src="/homes/img/about-decor-02.svg"
                                    alt=""
                                    class={styles.about__media_decor}
                                />
                            </div>
                            <div class="about__media">
                                <figure
                                    class={`${styles.about__img_wrap} ${styles.about__img_wrap_bottom}`}
                                >
                                    <img
                                        src="/homes/img/inside_cabin.jpg"
                                        alt=""
                                        class={`${styles.about__img} ${styles.about__img_bottom}`}
                                    />

                                    {/* <!-- Decorators --> */}
                                    <div>
                                        <img
                                            src="/homes/img/about-decor-03.svg"
                                            alt=""
                                            class={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-04.svg"
                                            alt=""
                                            class={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-05.svg"
                                            alt=""
                                            class={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-06.svg"
                                            alt=""
                                            class={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-07.svg"
                                            alt=""
                                            class={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-08.svg"
                                            alt=""
                                            class={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-08.svg"
                                            alt=""
                                            class={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-08.svg"
                                            alt=""
                                            class={styles.about__decor_img}
                                        />
                                    </div>
                                </figure>
                            </div>
                            <section class={styles.about__content}>
                                <h2 class={styles.section__heading}>
                                    Taking A Vacation? So Is Your Soul.
                                </h2>
                                <p
                                    class={`${styles.about__desc_bottom} ${styles.section_desc}`}
                                >
                                    The architecture inside the cabin blends
                                    warmth and modernity. With sophisticated
                                    design, high-end furniture and clever
                                    natural lighting, each cabin becomes a
                                    luxurious and comfortable space. Enjoy the
                                    atmosphere. The warmth of the fireplace,
                                    unique details in the decoration, and
                                    wonderful views of the natural surroundings.
                                    The cabin is not just a place to rest, but a
                                    living picture of comfort and beauty eye.
                                </p>
                                <div class={styles.tab}>
                                    <ul class={styles.tab__list}>
                                        <li
                                            class={`${styles.tab__item} ${styles.tab__item__active}`}
                                        >
                                            <img
                                                src="/homes/icons/home.png"
                                                alt=""
                                                class={styles.tab__icon}
                                            />
                                            <span class={styles.tab__title}>
                                                Internet
                                            </span>
                                        </li>
                                        <li class={styles.tab__item}>
                                            <img
                                                src="/homes/icons/heath.png"
                                                alt=""
                                                class={styles.tab__icon}
                                            />
                                            <span class={styles.tab__title}>
                                                Clean up
                                            </span>
                                        </li>
                                        <li class={styles.tab__item}>
                                            <img
                                                src="/homes/icons/bag.png"
                                                alt=""
                                                class={styles.tab__icon}
                                            />
                                            <span class={styles.tab__title}>
                                                Transportation
                                            </span>
                                        </li>
                                    </ul>
                                    <div class={styles.tab__contents}>
                                        {/* <!-- Tab content 1 --> */}
                                        <div
                                            class={`${styles.tab__content_item} ${styles.tab__content_item__active}`}
                                        >
                                            <p class={styles.tab__content_desc}>
                                                When you're on vacation, we'll
                                                have everything prepared for
                                                when you return.
                                            </p>
                                            <a
                                                href="#!"
                                                class={styles.tab__content_more}
                                            >
                                                View more
                                            </a>
                                        </div>

                                        {/* <!-- Tab content 2 --> */}
                                        <div class={styles.tab__content_item}>
                                            <p class={styles.tab__content_desc}>
                                                While you're on holiday, here's
                                                where your furry friends will
                                                spend their time 2.
                                            </p>
                                            <a
                                                href="#!"
                                                class={styles.tab__content_more}
                                            >
                                                View more
                                            </a>
                                        </div>

                                        {/* <!-- Tab content 3 --> */}
                                        <div class={styles.tab__content_item}>
                                            <p class={styles.tab__content_desc}>
                                                While you're on holiday, here's
                                                where your furry friends will
                                                spend their time 3.
                                            </p>
                                            <a
                                                href="#!"
                                                class={styles.tab__content_more}
                                            >
                                                View more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default About;
