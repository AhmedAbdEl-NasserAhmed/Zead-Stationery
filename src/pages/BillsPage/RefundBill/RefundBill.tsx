import { HiMiniPencilSquare } from "react-icons/hi2";
import Menus from "../../../ui/Menus/Menus";
import Modal from "../../../ui/Modal/Modal";
import { InvoiceDataObject } from "../../../interfaces/invoiceDataObject";
import RefundBillInvoice from "../../../components/Forms/RefundBillInvoice/RefundBillInvoice";

interface Props {
  optionElementProps: InvoiceDataObject;
}

function RefundBill({ optionElementProps }: Props) {
  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={optionElementProps?.id} />

        <Menus.List id={optionElementProps?.id}>
          <Modal.Open opens="refund-bill">
            <Menus.Button icon={<HiMiniPencilSquare />}>Refund</Menus.Button>
          </Modal.Open>
        </Menus.List>

        <Modal.Window name="refund-bill">
          <RefundBillInvoice optionElementProps={optionElementProps} />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default RefundBill;
