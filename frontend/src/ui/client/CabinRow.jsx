import styled from "styled-components";
// import { toast } from "react-hot-toast";

// import { HiPencil, HiTrash, HiSquare2Stack } from "react-icons/hi2";

// import Menus from "ui/Menus";
// import Modal from "ui/Modal";
// import ConfirmDelete from "ui/ConfirmDelete";
// import Table from "ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useDeleteCabin } from "./useDeleteCabin";
// import { useCreateCabin } from "./useCreateCabin";
// import CreateCabinForm from "./CreateCabinForm";

// v1
const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
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

function CabinRow({ cabin, infomation, paymentMethod }) {
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!infomation.numGuests) {
            navigate("/bookingInfo");
        } else if (!paymentMethod) {
            navigate("/payment");
        }
    }, [navigate, infomation, paymentMethod]);

    const {
        // _id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        // description,
    } = cabin;

    return (
        <>
            <TableRow role="row">
                <Img src={image} alt={`Cabin ${name}`} />

                <Cabin>{name}</Cabin>

                <div>Fits up to {maxCapacity} guests</div>

                <Price>{formatCurrency(regularPrice)}</Price>

                {discount ? (
                    <Discount>{formatCurrency(discount)}</Discount>
                ) : (
                    <span>&mdash;</span>
                )}

                <Price>{formatCurrency(regularPrice - discount)}</Price>
            </TableRow>
        </>
    );
}

export default CabinRow;
