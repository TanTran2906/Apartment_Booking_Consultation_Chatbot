import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateServiceForm from "./CreateServiceForm";

function AddService() {
    return (
        <Modal>
            <Modal.Open opens="service-form">
                <Button>Add new service</Button>
            </Modal.Open>

            <Modal.Window name="service-form">
                <CreateServiceForm />
            </Modal.Window>

            {/* <Modal.Open opens="table">
                <Button>Show table</Button>
            </Modal.Open>

            <Modal.Window name="table">
                <CabinTable />
            </Modal.Window> */}
        </Modal>
    );
}

export default AddService;
