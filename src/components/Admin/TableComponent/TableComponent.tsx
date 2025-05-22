"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";

export type Cell = { value: string; width: number; height: number };
export type Column = { width: number };
export type Row = { height: number };

const MIN_COLUMNS = 1;
const MIN_ROWS = 1;

export type TableInitialValue = {
  columns: Column[];
  rows: Row[];
  cells: Cell[][];
} | null;

type TableComponentProps = {
  initialValue?: TableInitialValue;
  onChange: (content: string, contentJSON: object) => void;
};

const defaultColumns: Column[] = [{ width: 100 }, { width: 100 }];
const defaultRows: Row[] = [{ height: 40 }, { height: 40 }];
const defaultCells: Cell[][] = [
  [
    { value: "", width: 100, height: 40 },
    { value: "", width: 100, height: 40 },
  ],
  [
    { value: "", width: 100, height: 40 },
    { value: "", width: 100, height: 40 },
  ],
];

const TableComponent: React.FC<TableComponentProps> = ({
  initialValue,
  onChange,
}) => {
  // Обработка изменения количества колонок
  const handleColumnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Math.max(
      MIN_COLUMNS,
      parseInt(e.target.value) || MIN_COLUMNS
    );

    // Сохраняем существующие значения по возможности
    let newColumns = [...columns];
    if (newCount > columns.length) {
      for (let i = columns.length; i < newCount; i++) {
        newColumns.push({ width: 100 });
      }
    } else if (newCount < columns.length) {
      newColumns = newColumns.slice(0, newCount);
    }
    setColumns(newColumns);

    // Обновляем клетки
    setCells((prevCells) =>
      prevCells.map((row, rowIdx) => {
        let newRow = [...row];
        if (newCount > row.length) {
          for (let ci = row.length; ci < newCount; ci++) {
            newRow.push({
              value: "",
              width: 100,
              height: rows[rowIdx]?.height ?? 40,
            });
          }
        } else if (newCount < row.length) {
          newRow = newRow.slice(0, newCount);
        }
        return newRow;
      })
    );
  };

  // Обработка изменения количества строк
  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Math.max(MIN_ROWS, parseInt(e.target.value) || MIN_ROWS);

    let newRows = [...rows];
    if (newCount > rows.length) {
      for (let i = rows.length; i < newCount; i++) {
        newRows.push({ height: 40 });
      }
    } else if (newCount < rows.length) {
      newRows = newRows.slice(0, newCount);
    }
    setRows(newRows);

    // Обновляем клетки
    setCells((prevCells) => {
      let updatedCells = [...prevCells];
      if (newCount > prevCells.length) {
        for (let ri = prevCells.length; ri < newCount; ri++) {
          updatedCells.push(
            columns.map((col) => ({ value: "", width: col.width, height: 40 }))
          );
        }
      } else if (newCount < prevCells.length) {
        updatedCells = updatedCells.slice(0, newCount);
      }
      return updatedCells;
    });
  };

  const [columns, setColumns] = useState<Column[]>(
    initialValue?.columns?.length ? initialValue.columns : defaultColumns
  );
  const [rows, setRows] = useState<Row[]>(
    initialValue?.rows?.length ? initialValue.rows : defaultRows
  );
  const [cells, setCells] = useState<Cell[][]>(
    initialValue?.cells?.length ? initialValue.cells : defaultCells
  );

  useEffect(() => {
    if (initialValue) {
      setColumns(
        initialValue.columns?.length ? initialValue.columns : defaultColumns
      );
      setRows(initialValue.rows?.length ? initialValue.rows : defaultRows);
      setCells(initialValue.cells?.length ? initialValue.cells : defaultCells);
    }
  }, [initialValue]);

  const resizerRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>("");
  const [contentJSON, setContentJSON] = useState<object>({});

  const generateRawHTML = (cells: Cell[][]) => {
    const tbody = cells
      .map(
        (row) =>
          `<tr>${row.map((cell) => `<td>${cell.value}</td>`).join("")}</tr>`
      )
      .join("");

    return `<table><tbody>${tbody}</tbody></table>`;
  };

  const [rawHTML, newContentJSON] = useMemo(() => {
    const html = generateRawHTML(cells);
    const json = { columns, rows, cells };
    return [html, json];
  }, [cells, rows, columns]);

  useEffect(() => {
    setContent(rawHTML);
    setContentJSON(newContentJSON);
    onChange(rawHTML, newContentJSON);
  }, [rawHTML, newContentJSON, onChange]);

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
            value={columns.length}
            onChange={handleColumnsChange}
            className="w-20 px-2 py-1 border rounded"
          />
        </label>
        <label className="flex items-center gap-1">
          Строки:&nbsp;
          <input
            type="number"
            min={MIN_ROWS}
            value={rows.length}
            onChange={handleRowsChange}
            className="w-20 px-2 py-1 border rounded"
          />
        </label>
      </div>

      <table className="border-collapse w-full">
        <thead>
          <tr>
            {columns.map((_, colIndex) => (
              <th
                key={colIndex}
                className="relative bg-gray-100"
                style={{ width: columns[colIndex].width }}
              ></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cells.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td
                  key={columnIndex}
                  className="border border-gray-400 relative group"
                  style={{
                    width: columns[columnIndex]?.width,
                    height: rows[rowIndex]?.height,
                    padding: 0,
                  }}
                >
                  <textarea
                    value={cell.value}
                    onChange={(e) => {
                      const newCells = [...cells];
                      newCells[rowIndex][columnIndex] = {
                        ...newCells[rowIndex][columnIndex],
                        value: e.target.value,
                      };
                      setCells(newCells);
                      onChange(content, contentJSON);
                    }}
                    className="w-full h-full border-0 p-1 resize-none outline-none leading-[36px]"
                    rows={Math.max(
                      1,
                      Math.floor((rows[rowIndex]?.height ?? 40) / 20)
                    )}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default TableComponent;
