import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { COLUMN_CONTENT_MAP } from "@/app/utils/constants";
import data from "../app/newData.json";

interface AppState {
  list: ListState | null;
  loading: boolean;
  error: null | string;
}

export interface ListItem {
  id: string;
  starRating: string;
  headline: string;
  subHeadline: string;
  description: string;
  rankingAsset: string;
  imageUrl: string;
  updatedAt: Date | null;
}

export interface ListState {
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  title: string;
  description: string;
  backgroundColor: string;
  imageArrangement: string;
  iconSet: string;
  owner: string;
  items: ListItem[];
  loading?: boolean;
  error?: string | null;
}

const initialState: ListState = {
  id: "",
  createdAt: null,
  updatedAt: null,
  title: "",
  description: "",
  backgroundColor: "transparent",
  imageArrangement: "leftAlignedImage",
  iconSet: "basicNumberSet",
  owner: "",
  items: [],
  loading: false,
  error: null,
};

const listSlice = createSlice({
  name: "list",
  initialState: initialState,
  reducers: {
    setList: (state, action) => {
      const { payload: newList } = action;
      return newList
    },
    updateTitleAndDescription: (
      { title: listTitle, description: listDescription },
      action
    ) => {
      const { title, description } = action.payload;

      if (!listTitle || !listDescription) return;

      if (listTitle !== title) {
        listTitle = title;
      }

      if (listDescription !== description) {
        listDescription = description;
      }
    },
    updateBackgroundColor: ({ backgroundColor: listBackgroundColor  }, action: PayloadAction<string>) => {
      const { payload: newColor } = action;

      if (!listBackgroundColor) return;

      if (listBackgroundColor !== newColor) {
        listBackgroundColor = newColor;
      }
    },
    updateListIcons: (
      { iconSet: listIconSet, items: listItems },
      action: PayloadAction<{
        columnContentType: keyof typeof COLUMN_CONTENT_MAP;
        dropColumnIndex: number;
      }>
    ) => {
      const { payload } = action;
      const { columnContentType, dropColumnIndex } = payload;
      const columnContent = COLUMN_CONTENT_MAP[columnContentType];


      listIconSet = columnContent.type;
      listItems = listItems.map((listItem, index) => {
        return {
          ...listItem,
          rankingAsset: Array.isArray(columnContent.iconGroup?.[index])
            ? columnContent.iconGroup[index].join(", ")
            : columnContent.iconGroup?.[index] || "",
        };
      });
    },
    updateImageArrangement: ({ imageArrangement: listImageArrangement }, action: PayloadAction<string>) => {
      const newArrangement = action.payload;

      if (!listImageArrangement) return;

      if (listImageArrangement !== newArrangement) {
        listImageArrangement = newArrangement;
      }
    },
  },
});

export const {
  updateListIcons,
  updateTitleAndDescription,
  updateBackgroundColor,
  updateImageArrangement,
  setList,
} = listSlice.actions;
export default listSlice.reducer;
