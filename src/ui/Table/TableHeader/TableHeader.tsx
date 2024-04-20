function TableHeader({ headers }) {
  return (
    <tr>
      {headers().map((header, index) => {
        return <th key={index}>{header.name}</th>;
      })}
    </tr>
  );
}

export default TableHeader;
