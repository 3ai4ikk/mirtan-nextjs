import { ChevronDown } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Стандартный",
    color: "var(--novel-black)",
  },
  {
    name: "Фиолетовый",
    color: "#9333EA",
  },
  {
    name: "Красный",
    color: "#E00000",
  },
  {
    name: "Желтый",
    color: "#EAB308",
  },
  {
    name: "Синий",
    color: "#2563EB",
  },
  {
    name: "Зеленый",
    color: "#008A00",
  },
  {
    name: "Оранжевый",
    color: "#FFA500",
  },
  {
    name: "Розовый",
    color: "#BA4081",
  },
  {
    name: "Серый",
    color: "#A8A29E",
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Стандартный",
    color: "var(--novel-highlight-default)",
  },
  {
    name: "Фиолетовый",
    color: "var(--novel-highlight-purple)",
  },
  {
    name: "Красный",
    color: "var(--novel-highlight-red)",
  },
  {
    name: "Желтый",
    color: "var(--novel-highlight-yellow)",
  },
  {
    name: "Синий",
    color: "var(--novel-highlight-blue)",
  },
  {
    name: "Зеленый",
    color: "var(--novel-highlight-green)",
  },
  {
    name: "Оранжевый",
    color: "var(--novel-highlight-orange)",
  },
  {
    name: "Розовый",
    color: "var(--novel-highlight-pink)",
  },
  {
    name: "Серый",
    color: "var(--novel-highlight-gray)",
  },
];

interface ColorSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ColorSelector = ({ open, onOpenChange }: ColorSelectorProps) => {
  const { editor } = useEditor();

  if (!editor) return null;
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color })
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color })
  );

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          <span
            className="rounded-sm px-1"
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            A
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl"
        align="start"
      >
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Цвет
          </div>
          {TEXT_COLORS.map(({ name, color }) => (
            <EditorBubbleItem
              key={name}
              onSelect={() => {
                editor.commands.unsetColor();
                if (name !== "Стандартный") {
                  editor
                    .chain()
                    .focus()
                    .setColor(color || "")
                    .run();
                }

                onOpenChange(false);
              }}
              className="flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium"
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
            </EditorBubbleItem>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
