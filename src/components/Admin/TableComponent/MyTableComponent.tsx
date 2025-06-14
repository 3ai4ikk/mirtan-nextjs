"use client";

import React, { useEffect, useState } from "react";

type TableProps = {
  initialValue?: string[][];
  onChange(html: string, initialValie: string[][]): void;
};

const MIN_COLUMNS = 2;
const MIN_ROWS = 2;

const initializeTable = (initialValue?: string[][]) => {
  if (!initialValue || !initialValue.length) {
    // Создаем пустую таблицу с минимальным размером
    return Array(MIN_ROWS).fill(Array(MIN_COLUMNS).fill(""));
  }
  return initialValue;
};

const getMaxColumns = (cells: string[][]) => {
  return Math.max(...cells.map((row) => row.length), MIN_COLUMNS);
};

const MyTableComponent = ({ initialValue, onChange }: TableProps) => {
  const [cells, setCells] = useState<string[][]>(initializeTable(initialValue));
  const [prevOutput, setPrevOutput] = useState<{
    html: string;
    data: string[][];
  }>({
    html: "",
    data: [],
  });

  const generateRawHTML = (table: string[][]) => {
    // Проверка на пустой массив
    if (!table.length || !table[0].length) {
      return "<table><tbody></tbody></table>";
    }

    const tbody = table
      .map((row) => {
        const [firstCell, ...restCells] = row;

        // Проверяем, пустые ли все оставшиеся ячейки
        const areRestCellsEmpty = restCells.every((cell) => !cell?.trim());

        if (areRestCellsEmpty) {
          // Если все ячейки кроме первой пустые, используем colspan
          return `<tr><th colspan="${row.length}">${firstCell || ""}</th></tr>`;
        } else {
          // Иначе обычный вариант с th + td
          const th = `<th>${firstCell || ""}</th>`;
          const tdCells = restCells
            .map((cell) => `<td>${cell || ""}</td>`)
            .join("");

          return `<tr>${th}${tdCells}</tr>`;
        }
      })
      .join("");

    return `<table><tbody>${tbody}</tbody></table>`;
  };

  const handleColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColumnCount = Math.max(
      MIN_COLUMNS,
      parseInt(e.target.value) || MIN_COLUMNS
    );
    setCells((prevCells) => {
      const newCells = prevCells.map((row) => {
        if (newColumnCount > row.length) {
          return [...row, ...Array(newColumnCount - row.length).fill("")];
        }
        return row.slice(0, newColumnCount);
      });
      return newCells;
    });
  };

  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRowCount = Math.max(
      MIN_ROWS,
      parseInt(e.target.value) || MIN_ROWS
    );
    setCells((prevCells) => {
      let newCells;
      if (newRowCount > prevCells.length) {
        const newRows = Array(newRowCount - prevCells.length).fill(
          Array(prevCells[0].length).fill("")
        );
        newCells = [...prevCells, ...newRows];
      } else {
        newCells = prevCells.slice(0, newRowCount);
      }
      return newCells;
    });
  };

  useEffect(() => {
    const newHtml = generateRawHTML(cells);
    // Проверяем, действительно ли изменились данные
    if (
      JSON.stringify(prevOutput.data) !== JSON.stringify(cells) ||
      prevOutput.html !== newHtml
    ) {
      setPrevOutput({ html: newHtml, data: cells });
      onChange(newHtml, cells);
    }
  }, [cells, prevOutput.data, prevOutput.html, onChange]);

  const handleCellChange = (
    rowIndex: number,
    columnIndex: number,
    value: string
  ) => {
    setCells((prevCells) => {
      const newCells = prevCells.map((row) => [...row]);
      newCells[rowIndex][columnIndex] = value;
      return newCells;
    });
  };

  return (
    <div className="relative overflow-auto border rounded-lg p-4">
      <div className="mb-4 flex gap-4 items-center">
        <label className="flex items-center gap-1">
          Столбцы:&nbsp;
          <input
            type="number"
            min={MIN_COLUMNS}
            value={getMaxColumns(cells)}
            onChange={handleColumnChange}
            className="w-20 px-2 py-1 border rounded"
          />
        </label>
        <label className="flex items-center gap-1">
          Строки:&nbsp;
          <input
            type="number"
            min={MIN_ROWS}
            value={cells.length}
            onChange={handleRowChange}
            className="w-20 px-2 py-1 border rounded"
          />
        </label>
      </div>

      <table className="border-collapse w-full">
        <tbody>
          {cells.map((row, rowIndex) => {
            // Нормализуем строку до максимальной длины
            const normalizedRow = [...row];
            while (normalizedRow.length < getMaxColumns(cells)) {
              normalizedRow.push("");
            }

            return (
              <tr key={rowIndex}>
                {normalizedRow.map((cell, columnIndex) => (
                  <td
                    key={columnIndex}
                    className="border border-gray-400 relative group"
                  >
                    <textarea
                      value={cell}
                      onChange={(e) =>
                        handleCellChange(rowIndex, columnIndex, e.target.value)
                      }
                      className="w-full h-full border-0 p-1 resize-none outline-none leading-[36px]"
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div dangerouslySetInnerHTML={{ __html: generateRawHTML(cells) }} />
    </div>
  );
};

export default MyTableComponent;
