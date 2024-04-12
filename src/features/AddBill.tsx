import AddBillForm from "../components/Forms/AddBillForm/AddBillForm";
import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";

function AddBill() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-bill">
          <Button variation="primary">+ Add new Bill</Button>
        </Modal.Open>

        <Modal.Window name="add-bill">
          <AddBillForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBill;
