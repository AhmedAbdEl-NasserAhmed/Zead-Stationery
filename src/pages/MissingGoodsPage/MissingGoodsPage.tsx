import styles from "./MissingGoodsPage.module.scss";
import Container from "../../ui/Container/Container";
import { useState } from "react";
import Input from "../../ui/Input/Input";

function MissingGoodsPage() {
  const [testInput, setTestInput] = useState<string>("");

  console.log("testInput", testInput);

  return (
    <Container>
      <div className={styles["missing-page"]}>
        <h2 className="text-4xl">Hello</h2>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTestInput(e.target.value)
          }
          type="text"
          style={{ width: `${50}%` }}
        />
      </div>
    </Container>
  );
}

export default MissingGoodsPage;
