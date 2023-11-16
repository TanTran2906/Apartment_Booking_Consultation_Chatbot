import styled from "styled-components";
import { toast } from "react-hot-toast";

// import { HiPencil, HiTrash, HiSquare2Stack } from "react-icons/hi2";

// import Menus from "ui/Menus";
// import Modal from "ui/Modal";
// import ConfirmDelete from "ui/ConfirmDelete";
// import Table from "ui/Table";

import { formatCurrency } from "../../utils/helpers";
import Input from "../Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToServices, removeService } from "../../slices/bookingLocalStorage";

// import { useDeleteCabin } from "./useDeleteCabin";
// import { useCreateCabin } from "./useCreateCabin";
// import CreateCabinForm from "./CreateCabinForm";

// v1
const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 2.5fr 0.3fr 0.3fr 0.3fr;
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

function ServiceRow({ service }) {
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();
    const {
        // _id: serviceId,
        name,
        regularPrice,
        discount,
        image,
        description,
    } = service;

    function handleCheckboxChange() {
        setIsChecked(!isChecked);
        dispatch(
            isChecked ? removeService(service._id) : addToServices(service)
        );
    }

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

                <Input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </TableRow>
        </>
    );
}

export default ServiceRow;
