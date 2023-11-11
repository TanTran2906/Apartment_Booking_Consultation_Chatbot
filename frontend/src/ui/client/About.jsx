import styles from "../../styles/clientStyles/About.module.css";
function About() {
    return (
        <>
            <main>
                {/* <!-- About --> */}
                <section className={styles.about}>
                    <div className={styles.container}>
                        <div className={styles.about__inner}>
                            <section className={styles.about__content}>
                                {/* <p className={styles.about__label}>// About //</p> */}
                                <h2
                                    className={`${styles.about__heading} ${styles.section__heading}`}
                                >
                                    The most ideal resting place.
                                </h2>
                                <p
                                    className={`${styles.about__desc} ${styles.section_desc}`}
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
                                <div className={styles.about__checklist}>
                                    <span className={styles.about__check_item}>
                                        Classic and Private
                                    </span>
                                    <span className={styles.about__check_item}>
                                        Environmental Policy
                                    </span>
                                    <span className={styles.about__check_item}>
                                        Special Offers
                                    </span>
                                    <span className={styles.about__check_item}>
                                        Natural Environment
                                    </span>
                                </div>
                            </section>
                            <div className={styles.about__media}>
                                {/* <!-- About card --> */}
                                <div className={styles.about__card}>
                                    <b className={styles.about__card_title}>
                                        20+
                                    </b>
                                    <p className={styles.about__card_desc}>
                                        Years Establish
                                    </p>
                                    <img
                                        src="/homes/img/about-decor-01.svg"
                                        alt=""
                                        className={styles.about__card_decor}
                                    />
                                </div>

                                {/* <!-- About image wrapper --> */}
                                <figure className={styles.about__img_wrap}>
                                    <img
                                        src="/homes/img/hotel.jpg"
                                        alt=""
                                        className={styles.about__img_hotel}
                                    />
                                </figure>

                                <img
                                    src="/homes/img/about-decor-02.svg"
                                    alt=""
                                    className={styles.about__media_decor}
                                />
                            </div>
                            <div className="about__media">
                                <figure
                                    className={`${styles.about__img_wrap} ${styles.about__img_wrap_bottom}`}
                                >
                                    <img
                                        src="/homes/img/inside_cabin.jpg"
                                        alt=""
                                        className={`${styles.about__img} ${styles.about__img_bottom}`}
                                    />

                                    {/* <!-- Decorators --> */}
                                    <div>
                                        <img
                                            src="/homes/img/about-decor-03.svg"
                                            alt=""
                                            className={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-04.svg"
                                            alt=""
                                            className={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-05.svg"
                                            alt=""
                                            className={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-06.svg"
                                            alt=""
                                            className={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-07.svg"
                                            alt=""
                                            className={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-08.svg"
                                            alt=""
                                            className={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-08.svg"
                                            alt=""
                                            className={styles.about__decor_img}
                                        />
                                        <img
                                            src="/homes/img/about-decor-08.svg"
                                            alt=""
                                            className={styles.about__decor_img}
                                        />
                                    </div>
                                </figure>
                            </div>
                            <section className={styles.about__content}>
                                <h2 className={styles.section__heading}>
                                    Taking A Vacation? So Is Your Soul.
                                </h2>
                                <p
                                    className={`${styles.about__desc_bottom} ${styles.section_desc}`}
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
                                <div className={styles.tab}>
                                    <ul className={styles.tab__list}>
                                        <li
                                            className={`${styles.tab__item} ${styles.tab__item__active}`}
                                        >
                                            <img
                                                src="/homes/icons/home.png"
                                                alt=""
                                                className={styles.tab__icon}
                                            />
                                            <span className={styles.tab__title}>
                                                Served 24/7
                                            </span>
                                        </li>
                                        <li className={styles.tab__item}>
                                            <img
                                                src="/homes/icons/heath.png"
                                                alt=""
                                                className={styles.tab__icon}
                                            />
                                            <span className={styles.tab__title}>
                                                Clean up
                                            </span>
                                        </li>
                                        <li className={styles.tab__item}>
                                            <img
                                                src="/homes/icons/bag.png"
                                                alt=""
                                                className={styles.tab__icon}
                                            />
                                            <span className={styles.tab__title}>
                                                Transportation
                                            </span>
                                        </li>
                                    </ul>
                                    <div className={styles.tab__contents}>
                                        {/* <!-- Tab content 1 --> */}
                                        <div
                                            className={`${styles.tab__content_item} ${styles.tab__content_item__active}`}
                                        >
                                            <p
                                                className={
                                                    styles.tab__content_desc
                                                }
                                            >
                                                When you're on vacation, we'll
                                                have everything prepared for
                                                when you return.
                                            </p>
                                            <a
                                                href="#!"
                                                className={
                                                    styles.tab__content_more
                                                }
                                            >
                                                View more
                                            </a>
                                        </div>

                                        {/* <!-- Tab content 2 --> */}
                                        <div
                                            className={styles.tab__content_item}
                                        >
                                            <p
                                                className={
                                                    styles.tab__content_desc
                                                }
                                            >
                                                While you're on holiday, here's
                                                where your furry friends will
                                                spend their time 2.
                                            </p>
                                            <a
                                                href="#!"
                                                className={
                                                    styles.tab__content_more
                                                }
                                            >
                                                View more
                                            </a>
                                        </div>

                                        {/* <!-- Tab content 3 --> */}
                                        <div
                                            className={styles.tab__content_item}
                                        >
                                            <p
                                                className={
                                                    styles.tab__content_desc
                                                }
                                            >
                                                While you're on holiday, here's
                                                where your furry friends will
                                                spend their time 3.
                                            </p>
                                            <a
                                                href="#!"
                                                className={
                                                    styles.tab__content_more
                                                }
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
