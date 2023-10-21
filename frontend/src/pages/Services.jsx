// import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ServiceTable from "../features/services/ServiceTable";
import {
    useCreateServiceMutation,
    useGetServicesQuery,
} from "../slices/serviceSlice";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import ServiceTableOperations from "../features/services/ServiceTableOperations";

function Cabins() {
    const { refetch } = useGetServicesQuery();
    const [createService, { isLoading: isCreating }] =
        useCreateServiceMutation();

    const createServiceHandler = async () => {
        try {
            await createService();
            toast.success("New service successfully created");
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All services</Heading>

                <ServiceTableOperations />
            </Row>

            <Row>
                <ServiceTable />
            </Row>

            <Row>
                {isCreating ? (
                    <Spinner />
                ) : (
                    <Button onClick={createServiceHandler}>
                        Add new service
                    </Button>
                )}
            </Row>
        </>
    );
}

export default Cabins;
