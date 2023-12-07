import styled from "styled-components";
import { toast } from "react-hot-toast";

// import { HiPencil, HiTrash, HiSquare2Stack } from "react-icons/hi2";

// import Menus from "ui/Menus";
// import Modal from "ui/Modal";
// import ConfirmDelete from "ui/ConfirmDelete";
// import Table from "ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteServiceMutation } from "../../slices/serviceSlice";
import CreateServiceForm from "./CreateServiceForm";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
// import { useDeleteCabin } from "./useDeleteCabin";
// import { useCreateCabin } from "./useCreateCabin";
// import CreateCabinForm from "./CreateCabinForm";

// v1
const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.2fr 3.6fr 0.5fr 0.5fr 1fr;
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

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

function ServiceRow({ service, refetch }) {
    const {
        _id: serviceId,
        name,
        regularPrice,
        discount,
        image,
        description,
    } = service;

    const [deleteService, { isLoading: isDeleting }] =
        useDeleteServiceMutation();

    const deleteHandler = async (id) => {
        try {
            const notValid = await deleteService(id);
            if (notValid?.data !== null) {
                toast.error(
                    "Cannot delete service as it is associated with a booking"
                );
            } else toast.success("Service successfully deleted");
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    // const { mutate: deleteCabin, isLoading: isDeleting } = useDeleteCabin();
    // const { mutate: createCabin } = useCreateCabin();

    // function handleDuplicate() {
    //     createCabin({
    //         name: `${name} duplicate`,
    //         maxCapacity,
    //         regularPrice,
    //         discount,
    //         image,
    //         description,
    //     });
    // }

    return (
        <>
            <TableRow role="row">
                <Img src={image} alt={`Service ${name}`} />

                <Cabin>{name}</Cabin>

                <div>{description}</div>

                <Price>{formatCurrency(regularPrice)}</Price>

                {discount ? (
                    <Discount>{formatCurrency(discount)}</Discount>
                ) : (
                    <span>&mdash;</span>
                )}

                <div>
                    {/* <button
                        onClick={() => deleteHandler(serviceId)}
                        disabled={isDeleting}
                    >
                        <HiTrash />
                    </button> */}
                    <Modal>
                        <Menus.Menu>
                            <Menus.Toggle id={serviceId} />

                            <Menus.List id={serviceId}>
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
                                <CreateServiceForm serviceToEdit={service} />
                            </Modal.Window>

                            <Modal.Window name="confirm-delete">
                                <ConfirmDelete
                                    resourceName="service"
                                    disabled={isDeleting}
                                    onConfirm={() => deleteHandler(serviceId)}
                                />
                            </Modal.Window>
                        </Menus.Menu>
                    </Modal>

                    {/* <Modal>
                        <Modal.Open opens="confirm-delete">
                            <button>
                                <HiTrash />
                            </button>
                        </Modal.Open>
                        <Modal.Window name="confirm-delete">
                            <ConfirmDelete
                                resourceName="cabin"
                                disabled={isDeleting}
                                onConfirm={() => deleteHandler(serviceId)}
                            />
                        </Modal.Window>

                        <Modal.Open opens="edit">
                            <button>
                                <HiPencil />
                            </button>
                        </Modal.Open>
                        <Modal.Window name="edit">
                            <CreateCabinForm cabinToEdit={cabin} />
                        </Modal.Window>
                    </Modal> */}
                </div>

                {/* <div>
        <ButtonWithConfirm
          title='Delete cabin'
          description='Are you sure you want to delete this cabin? This action can NOT be undone.'
          confirmBtnLabel='Delete'
          onConfirm={() => deleteCabin(serviceId)}
          disabled={isDeleting}
        >
          Delete
        </ButtonWithConfirm>

        <Link to={`/cabins/${serviceId}`}>Details &rarr;</Link>
      </div> */}

                {/* <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={serviceId} />

                    <Menus.List id={serviceId}>
                        <Menus.Button
                            icon={<HiSquare2Stack />}
                            onClick={handleDuplicate}
                        >
                            Duplicate
                        </Menus.Button>

                        <Modal.Toggle opens="edit">
                            <Menus.Button icon={<HiPencil />}>
                                Edit cabin
                            </Menus.Button>
                        </Modal.Toggle>

                        
                        <Modal.Toggle opens="delete">
                            <Menus.Button icon={<HiTrash />}>
                                Delete cabin
                            </Menus.Button>
                        </Modal.Toggle>
                    </Menus.List>
                </Menus.Menu>

                <Modal.Window name="edit">
                    <CreateCabinForm cabinToEdit={cabin} />
                </Modal.Window>

                <Modal.Window name="delete">
                    <ConfirmDelete
                        resource="cabin"
                        onConfirm={() => deleteCabin(serviceId)}
                        disabled={isDeleting}
                    />
                </Modal.Window>
            </Modal> */}
            </TableRow>

            {/* <CreateCabinForm cabinToEdit={cabin} /> */}
        </>
    );
}

export default ServiceRow;
