import AddCapitalForm from "../components/Forms/AddCapitalForm/AddCapitalForm";
import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";

function AddCapital() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-capital">
          <Button variation="primary">+ Add Capital</Button>
        </Modal.Open>

        <Modal.Window name="add-capital">
          <AddCapitalForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCapital;
