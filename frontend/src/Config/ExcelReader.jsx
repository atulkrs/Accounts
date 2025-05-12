import React, { useEffect, useState } from "react";
import { read, utils } from "xlsx";

const ExcelReader = () => {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // Load the Excel file
        const response = await fetch("/Mumbai Operations Review.xlsx");
        const arrayBuffer = await response.arrayBuffer();

        // Read the workbook
        const workbook = read(arrayBuffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[1]];

        // Convert worksheet to 2D array
        const data = utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "",
        });

        if (data.length === 0) return;

        // Extract headers
        const headerRow = data[0];

        const completeHeaders = headerRow.map((h, i) => h || `Column_${i + 1}`);
        console.log("jfhhrf", completeHeaders);
        // Process rows and pad them to match header length
        const dataRows = data.slice(1);
        const paddedDataRows = dataRows.slice(0, 25).map((row) => {
          const newRow = [...row];
          while (newRow.length < completeHeaders.length) {
            newRow.push("");
          }
          return newRow;
        });

        console.log(paddedDataRows);

        setHeaders(completeHeaders);
        setRows(paddedDataRows);

        // Debugging
        console.log("Headers length:", completeHeaders.length);
        console.log("Headers:", completeHeaders);
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    })();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold text-center mb-6'>Spreadsheet Data</h1>

      {rows.length > 0 ? (
        <div className='overflow-x-auto'>
          <table className='min-w-full border border-gray-300 rounded-md shadow text-sm'>
            <thead className='bg-blue-600 text-white'>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className='px-4 py-2 text-left font-semibold uppercase border border-blue-700 whitespace-nowrap'
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      className='px-4 py-2 border border-gray-300 text-center whitespace-nowrap'
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className='text-center text-gray-500'>
          Loading or no data available...
        </p>
      )}
    </div>
  );
};

export default ExcelReader;
