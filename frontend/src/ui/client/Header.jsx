import styled from "styled-components";
import styles from "../../styles/clientStyles/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import ButtonIcon from "../ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../../features/authentication/Logout";
import { useSelector } from "react-redux";
import UserAvatar from "../UseAvatar";

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`;

function Header() {
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

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

                        {userInfo && !userInfo.isAdmin && (
                            <StyledHeaderMenu>
                                <li>
                                    <UserAvatar />
                                </li>
                                <li>
                                    <ButtonIcon
                                        onClick={() => navigate("/account")}
                                    >
                                        <HiOutlineUser />
                                    </ButtonIcon>
                                </li>

                                <li>
                                    <Logout />
                                </li>
                            </StyledHeaderMenu>
                        )}

                        {userInfo && userInfo.isAdmin && (
                            <StyledHeaderMenu>
                                <li>
                                    <UserAvatar />
                                </li>
                                <li>
                                    <ButtonIcon
                                        onClick={() =>
                                            navigate("/admin/dashboard")
                                        }
                                    >
                                        <HiOutlineUser />
                                    </ButtonIcon>
                                </li>

                                <li>
                                    <Logout />
                                </li>
                            </StyledHeaderMenu>
                        )}

                        {/* <!-- Header action --> */}
                        {!userInfo && (
                            <div className={styles.action}>
                                <Link
                                    to="/login"
                                    className={styles.action__link}
                                >
                                    Sign in
                                </Link>
                                <Link
                                    to="/register"
                                    className={`${styles.btn} ${styles.action__btn}`}
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
