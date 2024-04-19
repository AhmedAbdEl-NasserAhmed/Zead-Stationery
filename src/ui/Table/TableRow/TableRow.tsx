function TableRow({
  data,
  headers,
  ExtraElement,
  extraElementProps,
  extraElementKey,
}) {
  return (
    <>
      {data?.map((item, index) => {
        return (
          <tr key={index}>
            {headers(item).map((header, index) => {
              return (
                <th key={index}>
                  {item[header.serverKey] || header.value}
                  {header.name === extraElementKey && ExtraElement ? (
                    <ExtraElement
                      extraElementProps={extraElementProps}
                      product={item}
                    />
                  ) : (
                    ""
                  )}
                </th>
              );
            })}
          </tr>
        );
      })}
    </>
  );
}

export default TableRow;
