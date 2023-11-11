import styles from "../../styles/clientStyles/Header.module.css";
function Header() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.header__inner}>
                        {/* <!-- Logo --> */}
                        <div className={styles.header__logo}>
                            <img
                                src="/logo_dark_transparent.png"
                                alt="Lucy"
                                className={styles.logo}
                            />
                            <p className={styles.header__name}>
                                The Stella Hotel
                            </p>
                        </div>

                        {/* <!-- Navbar --> */}
                        <nav className={styles.navbar}>
                            <ul className={styles.navbar__list}>
                                <li className={styles.navbar__item}>
                                    <a
                                        href="#!"
                                        className={styles.navbar__link}
                                    >
                                        Home
                                    </a>
                                </li>
                                <li className={styles.navbar__item}>
                                    <a
                                        href="#!"
                                        className={styles.navbar__link}
                                    >
                                        Cabins
                                    </a>
                                </li>
                                <li className={styles.navbar__item}>
                                    <a
                                        href="#!"
                                        className={styles.navbar__link}
                                    >
                                        Services
                                    </a>
                                </li>
                                {/* <li className={styles.navbar__item}>
                                    <a
                                        href="#!"
                                        className={styles.navbar__link}
                                    >
                                        Reviews
                                    </a>
                                </li>
                                <li className={styles.navbar__item}>
                                    <a
                                        href="#!"
                                        className={styles.navbar__link}
                                    >
                                        Contacts us
                                    </a>
                                </li> */}
                            </ul>
                        </nav>

                        {/* <!-- Header action --> */}
                        <div className={styles.action}>
                            <a href="#!" className={styles.action__link}>
                                Sign in
                            </a>
                            <a
                                href="#!"
                                className={`${styles.btn} ${styles.action__btn}`}
                            >
                                Sign up
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
