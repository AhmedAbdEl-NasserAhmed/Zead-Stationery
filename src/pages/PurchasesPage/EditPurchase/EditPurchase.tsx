import { HiMiniPencilSquare } from "react-icons/hi2";

import Modal from "../../../ui/Modal/Modal";
import Menus from "../../../ui/Menus/Menus";
import EditPurchaseInvoice from "../../../components/Forms/EditPurchaseInvoice/EditPurchaseInvoice";

function EditPurchase({ purchaseInvoice }) {
  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={purchaseInvoice.id} />

        <Menus.List id={purchaseInvoice.id}>
          <Modal.Open opens="edit-purchaseInvoice">
            <Menus.Button icon={<HiMiniPencilSquare />}>Edit</Menus.Button>
          </Modal.Open>
        </Menus.List>

        <Modal.Window name="edit-purchaseInvoice">
          <EditPurchaseInvoice purchaseInvoice={purchaseInvoice} />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default EditPurchase;
