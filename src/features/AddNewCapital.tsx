import { HiMiniPencilSquare } from "react-icons/hi2";
import Menus from "../ui/Menus/Menus";
import Modal from "../ui/Modal/Modal";
import UpdateCapitalForm from "../components/Forms/UpdateCapitalForm/UpdateCapitalForm";

function AddNewCapital() {
  return (
    <div>
      <Modal>
        <Menus>
          <Menus.Menu>
            <Menus.Toggle id="update-capital" />

            <Menus.List id="update-capital">
              <Modal.Open opens="update-capital">
                <Menus.Button icon={<HiMiniPencilSquare />}>
                  Update Capital
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="update-capital">
              <UpdateCapitalForm />
            </Modal.Window>
          </Menus.Menu>
        </Menus>
      </Modal>
    </div>
  );
}

export default AddNewCapital;
