import { type ClassValue, clsx } from "clsx";
import { revalidatePath } from "next/cache";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const revalidate = async (path: string) => {
  revalidatePath(path, "page");
};

export const langs = ["ru", "en", "tr"] as const;

export enum Category {
  EMPTY = "Без категории",
  CompleteMills = "Комплектные мельницы",
  IndustrialAutomation = "Промышленная автоматизация",
}

export const initialEditorValue = {
  type: "doc",
  content: [],
};
