function TableRow({ data, headers, ExtraElement }) {
  return (
    <>
      {data?.map((item, index) => {
        return (
          <tr key={index}>
            {headers.map((header, index) => (
              <th key={index}>
                {item[header.value]}
                {header.name === "Actions" && ExtraElement ? (
                  <ExtraElement product={item} />
                ) : (
                  ""
                )}
              </th>
            ))}
          </tr>
        );
      })}
    </>
  );
}

export default TableRow;
