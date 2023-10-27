import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-weight: 500;
    font-size: 1.4rem;
    color: var(--color-grey-600);
`;

const Avatar = styled.img`
    display: block;
    width: 4rem;
    width: 3.6rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
    const { userInfo } = useSelector((state) => state.auth);

    const { fullName, photo } = userInfo;

    return (
        <Link to="admin/account">
            <StyledUserAvatar>
                <Avatar
                    src={photo || "/default-user.jpg"}
                    alt={`Avatar of ${fullName}`}
                />
                <span>{fullName}</span>
            </StyledUserAvatar>
        </Link>
    );
}

export default UserAvatar;
