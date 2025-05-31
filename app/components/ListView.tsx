import React from "react";
import NewList from "./NewList";
import { useSelector } from "react-redux";

export interface ListItem {
  id: number;
  starRating: number;
  headline: string;
  subheadline: string;
  description: string;
  rankingAsset: string;
  imageUrl: string;
}

const ListView: React.FC = () => {
  const body = useSelector(
    (state: { list: { body: Array<ListItem> } }) => state.list.body
  );
  const title = useSelector(
    (state: { list: { title: string } }) => state.list.title
  );
  const description = useSelector(
    (state: { list: { description: string } }) => state.list.description
  );

  return (
    <>
      <NewList title={title} description={description} listData={body} />
    </>
  );
};

export default ListView;
