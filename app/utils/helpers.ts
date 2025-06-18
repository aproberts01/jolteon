import { ListItem } from "../../lib/listSlice";

type SanitizedListItem = Omit<ListItem, "updatedAt"> & {
  updatedAt: string | null;
};

export const sanitizeItems = (items: ListItem[]): SanitizedListItem[] => {
  return items.map((item) => ({
    ...item,
    updatedAt:
      item.updatedAt instanceof Date
        ? item.updatedAt.toISOString()
        : item.updatedAt,
  }));
};
