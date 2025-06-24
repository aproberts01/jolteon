import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { COLUMN_CONTENT_MAP } from "@/app/utils/constants";

export interface ListItem {
  id: string;
  starRating: string;
  headline: string;
  subHeadline: string;
  description: string;
  rankingAsset: string | string[];
  imageUrl: string;
  updatedAt: Date | null;
  position: number;
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
  modalOpen?: boolean;
  itemModalOpen?: boolean;
  currentlySelectedItem?: ListItem | null;
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
  modalOpen: false,
  itemModalOpen: false,
  currentlySelectedItem: null,
};

const listSlice = createSlice({
  name: "list",
  initialState: initialState,
  reducers: {
    setList: (state, action) => {
      const { payload: newList } = action;
      return newList;
    },
    updateTitleAndDescription: (state, action) => {
      const { title, description } = action.payload;

      if (!state.title || !state.description) return;

      if (state.title !== title) {
        state.title = title;
      }

      if (state.description !== description) {
        state.description = description;
      }
    },
    updateBackgroundColor: (state, action: PayloadAction<string>) => {
      const { payload: newColor } = action;

      if (!state.backgroundColor || !newColor) return;

      if (state.backgroundColor !== newColor) {
        state.backgroundColor = newColor;
      }
    },
    updateListItems: (
      state,
      action: PayloadAction<{
        property: string;
        value: string | null;
      }>
    ) => {
      const { payload } = action;
      const { property, value } = payload;

      if (property === "iconSet") {
        const columnContent =
          COLUMN_CONTENT_MAP[value as keyof typeof COLUMN_CONTENT_MAP];

        state.iconSet = columnContent.type;
        state.items = state.items.map((listItem, index) => {
          return {
            ...listItem,
            iconSet: value,
            rankingAsset: (columnContent.iconGroup?.[listItem.position] ??
              columnContent.iconGroup?.[index]) as string,
          };
        });
      }

      state.items = state.items.map((listItem, index) => {
        return {
          ...listItem,
          [property]: value,
        };
      });
    },
    updateImageArrangement: (state, action: PayloadAction<string>) => {
      const newArrangement = action.payload;

      if (!state.imageArrangement) return;

      if (state.imageArrangement !== newArrangement) {
        state.imageArrangement = newArrangement;
      }
    },
    handleModalOpen: (state, action: PayloadAction<boolean>) => {
      const { payload: isOpen } = action;
      state.modalOpen = isOpen;
    },
    handleItemModalOpen: (state, action: PayloadAction<boolean>) => {
      const { payload: isOpen } = action;
      state.itemModalOpen = isOpen;
    },
    setSelectedItem: (state, action: PayloadAction<ListItem | null>) => {
      const { payload: selectedItem } = action;
      if (selectedItem) {
        state.itemModalOpen = true;
        console.log("Selected item:", selectedItem);
        state.currentlySelectedItem = selectedItem;
      }
    },
  },
});

export const {
  updateListItems,
  updateTitleAndDescription,
  updateBackgroundColor,
  updateImageArrangement,
  handleModalOpen,
  handleItemModalOpen,
  setList,
  setSelectedItem,
} = listSlice.actions;
export default listSlice.reducer;
