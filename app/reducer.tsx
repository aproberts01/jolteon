export const actionType = {
  UPDATE_LIST_NAME: "UPDATE_LIST_NAME",
};

interface Cell {
  id: number;
  listCellType: string;
  listCellAsset: string;
}

interface ListState {
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

    default:
      return draft;
  }
};
