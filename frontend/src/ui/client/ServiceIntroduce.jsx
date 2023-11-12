import { Link } from "react-router-dom";
import styles from "../../styles/clientStyles/ServiceIntroduce.module.css";
function ServiceIntroduce() {
    return (
        <>
            {/* <!-- Service --> */}
            <section className={styles.service}>
                <div className={styles.container}>
                    <section className={styles.service__top}>
                        {/* <p className={styles.service__desc}>What we do for you?</p> */}
                        <h2 className={styles.section_heading}>
                            Our Signature Services
                        </h2>
                    </section>

                    <div className={styles.service__body}>
                        <div className={styles.service__column}>
                            {/* <!-- Service item 1 --> */}
                            <article className={styles.service_item}>
                                <h3>
                                    <a
                                        href="#!"
                                        className={styles.service_item__heading}
                                    >
                                        Puppy Sitting
                                    </a>
                                </h3>
                                <p className={styles.service_item__desc}>
                                    Helping your new pup to be a good boy or
                                    girl isn’t always easy, but we’re here to
                                    help.
                                </p>
                                {/* <a href="#!" className={styles.service_item__more}>
                                    Read More
                                </a> */}
                            </article>

                            {/* <!-- Service item 2 --> */}
                            <article className={styles.service_item}>
                                <h3>
                                    <a
                                        href="#!"
                                        className={styles.service_item__heading}
                                    >
                                        Dog Walking
                                    </a>
                                </h3>
                                <p className={styles.service_item__desc}>
                                    Choose from a 30, 45, or 60-minute visit to
                                    give your pet their daily dose of
                                    fun-filled.
                                </p>
                                {/* <a href="#!" className={styles.service_item__more}>
                                    Read More
                                </a> */}
                            </article>

                            {/* <!-- Service item 3 --> */}
                            <article className={styles.service_item}>
                                <h3>
                                    <a
                                        href="#!"
                                        className={styles.service_item__heading}
                                    >
                                        Pet Sitting
                                    </a>
                                </h3>
                                <p className={styles.service_item__desc}>
                                    While you’re away we can make sure your pet
                                    has all the food, water, exercise, and, of
                                    course.
                                </p>
                                {/* <a href="#!" className={styles.service_item__more}>
                                    Read More
                                </a> */}
                            </article>
                        </div>
                        <div className={styles.service__column}>
                            <figure className={styles.service__media}>
                                <img
                                    src="/homes/img/service-01.png"
                                    alt=""
                                    className={styles.service__img}
                                />
                            </figure>
                            <div className={styles.service__cta_wrap}>
                                <Link
                                    to="/services"
                                    className={`${styles.service__cta} ${styles.btn}`}
                                >
                                    View All Services
                                </Link>
                            </div>
                        </div>
                        <div className={styles.service__column}>
                            {/* <!-- Service item 4 --> */}
                            <article className={styles.service_item}>
                                <h3>
                                    <a
                                        href="#!"
                                        className={styles.service_item__heading}
                                    >
                                        Overnight Care
                                    </a>
                                </h3>
                                <p className={styles.service_item__desc}>
                                    If you’re away for the night, we can stay
                                    the night or stop by in the evening and
                                    morning.
                                </p>
                                {/* <a href="#!" className={styles.service_item__more}>
                                    Read More
                                </a> */}
                            </article>

                            {/* <!-- Service item 5 --> */}
                            <article className={styles.service_item}>
                                <h3>
                                    <a
                                        href="#!"
                                        className={styles.service_item__heading}
                                    >
                                        Pet Taxi
                                    </a>
                                </h3>
                                <p className={styles.service_item__desc}>
                                    Does your pet need a lift to the groomers,
                                    vet, or dog park? We’ve got their tail
                                    covered.
                                </p>
                                {/* <a href="#!" className={styles.service_item__more}>
                                    Read More
                                </a> */}
                            </article>

                            {/* <!-- Service item 6 --> */}
                            <article className={styles.service_item}>
                                <h3>
                                    <a
                                        href="#!"
                                        className={styles.service_item__heading}
                                    >
                                        Pet Medical
                                    </a>
                                </h3>
                                <p className={styles.service_item__desc}>
                                    Our team of experienced professionals can
                                    help with everything from pills to
                                    injections.
                                </p>
                                {/* <a href="#!" className={styles.service_item__more}>
                                    Read More
                                </a> */}
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ServiceIntroduce;
