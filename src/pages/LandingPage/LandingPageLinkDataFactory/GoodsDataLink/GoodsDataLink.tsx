import { useEffect, useState } from "react";
import { landingPageTableContent } from "../../../../constatnts/landingPageTableContent";
import { useGetGoodsDataQuery } from "../../../../services/goodsApi";
import Spinner from "../../../../ui/Spinner/Spinner";
import Table from "../../../../ui/Table/Table";
import { ProductObject } from "../../../../interfaces/productObject";
import Input from "../../../../ui/Input/Input";

function GoodsDataLink() {
  const { data, isLoading } = useGetGoodsDataQuery("goods");

  const [productName, setProductName] = useState<string>("");

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(
      data?.filter((product: ProductObject) =>
        String(product.name)
          .toLowerCase()
          .includes(String(productName).toLowerCase())
      )
    );
  }, [data, productName]);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <Input
        onChange={(e) => setProductName(e.target.value)}
        name="productName"
        value={productName}
        style={{ width: `${100}%` }}
        placeholder="PRODUCT NAME"
        type="text"
      />
      <Table data={filteredData} headers={landingPageTableContent} />
    </div>
  );
}

export default GoodsDataLink;
