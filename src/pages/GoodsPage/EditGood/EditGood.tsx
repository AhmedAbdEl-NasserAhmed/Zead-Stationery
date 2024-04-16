import { HiMiniPencilSquare } from "react-icons/hi2";
import Modal from "../../../ui/Modal/Modal";
import Menus from "../../../ui/Menus/Menus";
import { HiTrash } from "react-icons/hi";
import { ProductObject } from "../../../interfaces/productObject";
import DeleteConfirmation from "../../../components/DeleteConfirmation/DeleteConfirmation";
import UpdateProduct from "../../../components/Forms/UpdateProduct/UpdateProduct";

interface Props {
  product?: ProductObject;
  extraElementProps: object;
}

function EditGood({ product, extraElementProps }: Props) {
  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={product.id} />

        <Menus.List id={product.id}>
          <Modal.Open opens="edit-product">
            <Menus.Button icon={<HiMiniPencilSquare />}>Edit</Menus.Button>
          </Modal.Open>
          <Modal.Open opens="delete-product">
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Modal.Open>
        </Menus.List>

        <Modal.Window name="delete-product">
          <DeleteConfirmation product={product} />
        </Modal.Window>

        <Modal.Window name="edit-product">
          <UpdateProduct
            extraElementProps={extraElementProps}
            product={product}
          />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default EditGood;
