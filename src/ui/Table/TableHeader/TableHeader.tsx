function TableHeader({ headers }) {
  return (
    <tr>
      {headers().map((header, index) => {
        console.log("header", header);
        return <th key={index}>{header.name}</th>;
      })}
    </tr>
  );
}

export default TableHeader;
