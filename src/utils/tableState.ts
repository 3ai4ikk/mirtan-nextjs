import {
  Cell,
  Column,
  Row,
} from "@/components/Admin/TableComponent/TableComponent";

/**
 * Сериализует состояние таблицы в JSON-строку для хранения в базе данных.
 * @param state - текущее состояние таблицы (columns, rows, cells)
 * @returns JSON-строка
 */
export function serializeTableState(state: {
  columns: Column[];
  rows: Row[];
  cells: Cell[][];
}): string {
  return JSON.stringify(state);
}

/**
 * Пример функции для восстановления состояния из строки (десериализация)
 * @param json JSON-строка
 */
export function deserializeTableState(json: string): {
  columns: Column[];
  rows: Row[];
  cells: Cell[][];
} {
  return JSON.parse(json);
}
