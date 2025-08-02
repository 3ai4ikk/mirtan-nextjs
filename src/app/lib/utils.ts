import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum Category {
  EMPTY = "Без категории",
  CompleteMills = "Комплектные мельницы",
  IndustrialAutomation = "Промышленная автоматизация",
}

export const initialEditorValue = {
  type: "doc",
  content: [],
};
