// import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";
import {
    useCreateCabinMutation,
    useGetCabinsQuery,
} from "../slices/cabinSlice";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

function Cabins() {
    const { refetch } = useGetCabinsQuery();
    const [createCabin, { isLoading: isCreating }] = useCreateCabinMutation();

    const createCabinHandler = async () => {
        if (window.confirm("Are you sure you want to create a new cabin?")) {
            try {
                await createCabin();
                toast.success("New cabin successfully created");
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>TEST</p>
            </Row>

            <Row>
                <CabinTable />
            </Row>

            <Row>
                {isCreating ? (
                    <Spinner />
                ) : (
                    <Button onClick={createCabinHandler}>Add new cabin</Button>
                )}
            </Row>
        </>
    );
}

export default Cabins;
