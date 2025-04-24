import React from "react";

const Table = ({ columns,renderRow,data }) => {
  return (
    <table className="w-full mt-4">
     <thead>
  <tr className="text-left text-[#f7f6f9] text-sm">
    {columns.map((col, index) => (
      <th
        key={col.accessor}
        className={`
          ${index % 2 === 1 ? "hidden md:table-cell" : ""}
        `}
      >
        {col.header}
      </th>
    ))}
  </tr>
</thead>
<tbody>
  {data.map((item) => renderRow(item))}
</tbody>

    </table>
  );
};

export default Table;
