import { useDispatch, useSelector } from "react-redux";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/userSlice";
import { logout } from "../../slices/authSlice";
import SpinnerMini from "../../ui/SpinnerMini";
function Logout() {
    // const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall, { isLoading: isLogout }] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ButtonIcon onClick={logoutHandler} disabled={isLogout}>
            {isLogout ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </ButtonIcon>
    );
}

export default Logout;
