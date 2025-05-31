import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { COLUMN_CONTENT_MAP } from "@/app/utils/constants";
import data from '../app/newData.json';

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
    updateListTitle: (state, action) => {
      state.title = action.payload;
    },
    updateListDescription: (state, action) => {
      state.description = action.payload;
    },
    updateListData: (state, action: PayloadAction<{ columnContentType: keyof typeof COLUMN_CONTENT_MAP; dropColumnIndex: number }>) => {
      const { payload } = action;
      const {
        columnContentType,
        dropColumnIndex,
      } = payload;

      const columnContent = COLUMN_CONTENT_MAP[columnContentType];

      state.body = state.body.map((listItem, index) => {
        return {
          ...listItem,
          rankingAsset: Array.isArray(columnContent.iconGroup?.[index])
            ? columnContent.iconGroup[index].join(", ")
            : columnContent.iconGroup?.[index] || "",
        };
      });
    },
  },
});

export const { updateListData, updateListTitle, updateListDescription } = listSlice.actions;
export default listSlice.reducer;
