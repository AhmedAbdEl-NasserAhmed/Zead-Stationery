import { HiMiniPencilSquare } from "react-icons/hi2";

import Modal from "../../../ui/Modal/Modal";
import Menus from "../../../ui/Menus/Menus";
import EditPurchaseInvoice from "../../../components/Forms/EditPurchaseInvoice/EditPurchaseInvoice";
import { InvoiceDataObject } from "../../../interfaces/invoiceDataObject";

interface Props {
  optionElementProps: InvoiceDataObject;
}

function EditPurchase({ optionElementProps }: Props) {
  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={optionElementProps?.id} />

        <Menus.List id={optionElementProps?.id}>
          <Modal.Open opens="edit-purchaseInvoice">
            <Menus.Button icon={<HiMiniPencilSquare />}>Edit</Menus.Button>
          </Modal.Open>
        </Menus.List>

        <Modal.Window name="edit-purchaseInvoice">
          <EditPurchaseInvoice optionElementProps={optionElementProps} />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default EditPurchase;
