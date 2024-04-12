import AddPurchaseForm from "../components/Forms/AddPurchaseForm/AddPurchaseForm";
import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";

function AddPurchase() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-purchase">
          <Button variation="primary">+ Add new Purchase</Button>
        </Modal.Open>

        <Modal.Window name="add-purchase">
          <AddPurchaseForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddPurchase;
