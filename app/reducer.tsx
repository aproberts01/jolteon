import { COLUMN_CONTENT_MAP } from "./utils/constants";

export const actionType = {
  UPDATE_LIST_NAME: "UPDATE_LIST_NAME",
  UPDATE_LIST_COLUMN: "UPDATE_LIST_COLUMN",
};

export interface ListItem {
  id: number;
  starRating: number;
  headline: string;
  subheadline: string;
  description: string;
  rankingAsset: string;
  imageUrl: string;
}

export interface ListState {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  registered: boolean;
  body: Array<Array<ListItem>>;
}

interface Action {
  type: string;
  payload?: any;
}

export const reducer = (draft: ListState, action: Action) => {
  const { payload } = action;
  switch (action.type) {
    case actionType.UPDATE_LIST_NAME:
      draft.title = payload;
      break;
    case actionType.UPDATE_LIST_COLUMN:
      const { body } = draft;
      const {
        columnContentType,
        dropColumnIndex,
      }: {
        columnContentType: keyof typeof COLUMN_CONTENT_MAP;
        dropColumnIndex: number;
      } = payload;

      const columnContent = COLUMN_CONTENT_MAP[columnContentType];

      draft.body = body.map((listItem, index) => {
        return {
          ...listItem,
          rankingAsset: columnContent.iconGroup?.[index] || "",
        }
      })
      break;

    default:
      return draft;
  }
};
