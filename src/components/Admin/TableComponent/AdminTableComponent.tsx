import React, { useRef, useState } from "react";

import style from "./admintablecomponent.module.scss";

type Row = { value: number };
type Column = { value: number };
type Cell = { column: Column; row: Row; value: string };

type Props = {
  initialValue?: string[][];
  onChange?: (content: string, contentJSON: object) => void;
};

const emptyValue: string[][] = [
  ["1", "2", "3"],
  ["3", "4"],
];

const generateRawHTML = (cells: string[][]) => {
  const tbody = cells
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");

  return `<table><tbody>${tbody}</tbody></table>`;
};

const MIN_COLUMNS = 2;
const MIN_ROWS = 2;

const AdminTableComponent = ({ initialValue, onChange }: Props) => {
  const [table, setTable] = useState<string[][]>(initialValue || emptyValue);

  const [columns, setColumns] = useState<string>();
  const [rows, setRows] = useState<string>();
  const [cells, setCells] = useState<string[][]>(emptyValue);

  const resizerRef = useRef<HTMLDivElement>(null);

  const handleColumnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Math.max(
      MIN_COLUMNS,
      parseInt(e.target.value) || MIN_COLUMNS
    );

    setColumns((prev) => prev?.slice(0, newCount));
  };

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Math.max(MIN_ROWS, parseInt(e.target.value) || MIN_ROWS);

    setRows((prev) => prev?.slice(0, newCount));
  };

  return (
    <div
      ref={resizerRef}
      className="relative overflow-auto border rounded-lg p-4"
    >
      <div className="mb-4 flex gap-4 items-center">
        <label className="flex items-center gap-1">
          Столбцы:&nbsp;
          <input
            type="number"
            min={MIN_COLUMNS}
            value={columns}
            onChange={handleColumnsChange}
            className="w-20 px-2 py-1 border rounded"
          />
        </label>
        <label className="flex items-center gap-1">
          Строки:&nbsp;
          <input
            type="number"
            min={MIN_ROWS}
            value={rows}
            onChange={handleRowsChange}
            className="w-20 px-2 py-1 border rounded"
          />
        </label>
      </div>
      <table className={style.table}>
        <tbody>
          {cells.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td
                  key={columnIndex}
                  className="border border-gray-400 relative group"
                >
                  <textarea
                    defaultValue={cell}
                    className="w-full h-full border-0 p-1 resize-none outline-none leading-[36px]"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTableComponent;
