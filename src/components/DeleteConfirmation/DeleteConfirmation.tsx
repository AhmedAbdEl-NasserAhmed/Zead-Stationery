import { ProductObject } from "../../interfaces/productObject";
import { useDeleteProductMutation } from "../../services/goodsApi";
import Button from "../../ui/Button/Button";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./DeleteConfirmation.module.scss";

interface Props {
  setShowModal?: () => void;
  product: ProductObject;
}

function DeleteConfirmation({ product, setShowModal }: Props) {
  const [deleteProduct, response] = useDeleteProductMutation();

  if (response.isLoading) return <Spinner />;

  return (
    <div className={styles["delete-confirmation"]}>
      <div>
        <h2>Do you want to Delete This item ?</h2>
      </div>
      <div className="flex gap-[2rem]">
        <Button
          disabled={response.isLoading}
          onClick={() => {
            deleteProduct(product.id);
            setShowModal();
          }}
          variation="danger"
        >
          Delete
        </Button>

        <Button
          disabled={response.isLoading}
          onClick={setShowModal}
          variation="secondary"
        >
          cancel
        </Button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
