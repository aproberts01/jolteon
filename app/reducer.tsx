import { COLUMN_CONTENT_MAP } from "./utils/constants";

export const actionType = {
  UPDATE_LIST_NAME: "UPDATE_LIST_NAME",
  UPDATE_LIST_COLUMN: "UPDATE_LIST_COLUMN",
};

export interface Cell {
  id: number;
  listCellType: string;
  listCellAsset?: string | string[];
  listCellHeadline?: string;
  listCellSubheadline?: string;
}

export interface ListState {
  list_id: number;
  list_title: string;
  creationDate: string;
  registered: boolean;
  body: Array<Array<Cell>>;
}

interface Action {
  type: string;
  payload?: any;
}

export const reducer = (draft: ListState, action: Action) => {
  const { payload } = action;
  switch (action.type) {
    case actionType.UPDATE_LIST_NAME:
      draft.list_title = payload;
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

      draft.body = body.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          if (cellIndex === dropColumnIndex) {
            return {
              ...cell,
              listCellType: columnContent.type,
              listCellAsset: (columnContent.iconGroup ?? [])[rowIndex],
              listCellHeadline: columnContent.headline,
              listCellSubheadline: columnContent.subheadline,
            };
          }
          return cell;
        });
      });

    default:
      return draft;
  }
};
