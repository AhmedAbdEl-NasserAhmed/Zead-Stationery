import { HiMiniPencilSquare } from "react-icons/hi2";
import Menus from "../../ui/Menus/Menus";
import Modal from "../../ui/Modal/Modal";
import { HiTrash } from "react-icons/hi";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import UpdateProduct from "../Forms/UpdateProduct/UpdateProduct";
import { useUseUpdateProductMutation } from "../../services/goodsApi";
import { ProductObject } from "../../interfaces/productObject";

interface Props {
  product?: ProductObject;
}

function EditGood({ product }: Props) {
  const [updateProduct, response] = useUseUpdateProductMutation();

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
            product={product}
            updateProduct={updateProduct}
            response={response}
          />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default EditGood;
