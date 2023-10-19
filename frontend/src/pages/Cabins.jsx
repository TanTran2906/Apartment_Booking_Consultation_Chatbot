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
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
    const { refetch } = useGetCabinsQuery();
    const [createCabin, { isLoading: isCreating }] = useCreateCabinMutation();

    const createCabinHandler = async () => {
        try {
            await createCabin();
            toast.success("New cabin successfully created");
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>

                <CabinTableOperations />
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
