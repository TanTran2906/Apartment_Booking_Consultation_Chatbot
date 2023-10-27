import styled from "styled-components";
import { toast } from "react-hot-toast";

// import { HiPencil, HiTrash, HiSquare2Stack } from "react-icons/hi2";

// import Menus from "ui/Menus";
// import Modal from "ui/Modal";
// import ConfirmDelete from "ui/ConfirmDelete";
// import Table from "ui/Table";

// import { formatCurrency } from "../../utils/helpers";
// import { useDeleteServiceMutation } from "../../slices/serviceSlice";
import CreateUserForm from "./CreateUserForm";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import { useDeleteUserMutation } from "../../slices/userSlice";

// v1
const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 1.8fr 1.2fr 0.5fr 0.5fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    /* transform: scale(1.66666) translateX(-2px); */
    transform: scale(1.5) translateX(-7px);
`;

const User = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

// const Price = styled.div`
//     font-family: "Sono";
//     font-weight: 600;
// `;

// const Discount = styled.div`
//     font-family: "Sono";
//     font-weight: 500;
//     color: var(--color-green-700);
// `;

function UserRow({ user, refetch }) {
    const {
        _id: userId,
        fullName,
        photo: image,
        email,
        nationalID,
        isAdmin,
        active,
    } = user;

    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        try {
            await deleteUser(id);
            toast.success("User isn't actived");
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <TableRow role="row">
                <Img src={image} alt={`Service ${fullName}`} />

                <User>{fullName}</User>

                <div>{email}</div>

                <User>{nationalID}</User>

                {isAdmin ? <User>YES</User> : <span>&mdash;</span>}

                {active ? <User>YES</User> : <span>&mdash;</span>}

                <div>
                    {/* <button
                        onClick={() => deleteHandler(userId)}
                        disabled={isDeleting}
                    >
                        <HiTrash />
                    </button> */}
                    <Modal>
                        <Menus.Menu>
                            <Menus.Toggle id={userId} />

                            <Menus.List id={userId}>
                                <Modal.Open opens="edit">
                                    <Menus.Button icon={<HiPencil />}>
                                        Edit
                                    </Menus.Button>
                                </Modal.Open>

                                <Modal.Open opens="confirm-delete">
                                    <Menus.Button icon={<HiTrash />}>
                                        Delete
                                    </Menus.Button>
                                </Modal.Open>
                            </Menus.List>

                            <Modal.Window name="edit">
                                <CreateUserForm userToEdit={user} />
                            </Modal.Window>

                            <Modal.Window name="confirm-delete">
                                <ConfirmDelete
                                    resourcefullName="user"
                                    disabled={isDeleting}
                                    onConfirm={() => deleteHandler(userId)}
                                />
                            </Modal.Window>
                        </Menus.Menu>
                    </Modal>
                </div>
            </TableRow>
        </>
    );
}

export default UserRow;
