import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { COLUMN_CONTENT_MAP } from "@/app/utils/constants";
import data from "../app/newData.json";

type AppState = typeof data.newList;

export interface ListItem {
  id: number;
  starRating: number;
  headline: string;
  subheadline: string;
  description: string;
  rankingAsset: string;
  imageUrl: string;
}

const listSlice = createSlice({
  name: "list",
  initialState: data.newList as AppState,
  reducers: {
    updateTitleAndDescription: (state, action) => {
      const { title, description } = action.payload;
      if (state.title !== title) {
        state.title = title;
      }
      if (state.description !== description) {
        state.description = description;
      }
    },
    updateBackgroundColor: (state, action: PayloadAction<string>) => {
      const newColor = action.payload;
      if (state.backgroundColor !== newColor) {
        state.backgroundColor = newColor;
      }
    },
    updateListIcons: (
      state,
      action: PayloadAction<{
        columnContentType: keyof typeof COLUMN_CONTENT_MAP;
        dropColumnIndex: number;
      }>
    ) => {
      const { payload } = action;
      const { columnContentType, dropColumnIndex } = payload;

      const columnContent = COLUMN_CONTENT_MAP[columnContentType];

      state.iconSet = columnContent.type;
      state.body = state.body.map((listItem, index) => {
        return {
          ...listItem,
          rankingAsset: Array.isArray(columnContent.iconGroup?.[index])
            ? columnContent.iconGroup[index].join(", ")
            : columnContent.iconGroup?.[index] || "",
        };
      });
    },
    updateImageArrangement: (state, action: PayloadAction<string>) => {
      const newArrangement = action.payload;
      if (state.imageArrangement !== newArrangement) {
        state.imageArrangement = newArrangement;
      }
    },
  },
});

export const {
  updateListIcons,
  updateTitleAndDescription,
  updateBackgroundColor,
  updateImageArrangement,
} = listSlice.actions;
export default listSlice.reducer;
