import styles from "../../styles/clientStyles/Header.module.css";
import { Link } from "react-router-dom";
function Header() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.header__inner}>
                        {/* <!-- Logo --> */}
                        <div className={styles.header__logo}>
                            <Link to="/home" className={styles.navbar__link}>
                                <img
                                    src="/logo_dark_transparent.png"
                                    alt="Lucy"
                                    className={styles.logo}
                                />
                            </Link>

                            <Link to="/home" className={styles.navbar__link}>
                                <p className={styles.header__name}>
                                    The Stella Hotel
                                </p>
                            </Link>
                        </div>

                        {/* <!-- Navbar --> */}
                        <nav className={styles.navbar}>
                            <ul className={styles.navbar__list}>
                                <li className={styles.navbar__item}>
                                    <Link
                                        to="/home"
                                        className={styles.navbar__link}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className={styles.navbar__item}>
                                    <Link
                                        to="/cabins"
                                        className={styles.navbar__link}
                                    >
                                        Cabins
                                    </Link>
                                </li>
                                <li className={styles.navbar__item}>
                                    <Link
                                        to="/services"
                                        className={styles.navbar__link}
                                    >
                                        Services
                                    </Link>
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
                            <Link to="/login" className={styles.action__link}>
                                Sign in
                            </Link>
                            <Link
                                to="/register"
                                className={`${styles.btn} ${styles.action__btn}`}
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
