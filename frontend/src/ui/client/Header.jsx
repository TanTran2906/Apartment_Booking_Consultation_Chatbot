import styles from "../../styles/clientStyles/Header.module.css";
function Header() {
    return (
        <>
            <header class={styles.header}>
                <div className={styles.container}>
                    <div class={styles.header__inner}>
                        {/* <!-- Logo --> */}
                        <img
                            src="/logo_dark_transparent.png"
                            alt="Lucy"
                            class={styles.logo}
                        />

                        {/* <!-- Navbar --> */}
                        <nav class={styles.navbar}>
                            <ul class={styles.navbar__list}>
                                <li class={styles.navbar__item}>
                                    <a href="#!" class={styles.navbar__link}>
                                        Home
                                    </a>
                                </li>
                                <li class={styles.navbar__item}>
                                    <a href="#!" class={styles.navbar__link}>
                                        Cabins
                                    </a>
                                </li>
                                <li class={styles.navbar__item}>
                                    <a href="#!" class={styles.navbar__link}>
                                        Services
                                    </a>
                                </li>
                                <li class={styles.navbar__item}>
                                    <a href="#!" class={styles.navbar__link}>
                                        Reviews
                                    </a>
                                </li>
                                <li class={styles.navbar__item}>
                                    <a href="#!" class={styles.navbar__link}>
                                        Contacts us
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* <!-- Header action --> */}
                        <div class={styles.action}>
                            <a href="#!" class={styles.action__link}>
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
