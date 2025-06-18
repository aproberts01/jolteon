"use client";
import React, { Suspense, useEffect } from "react";
import NewList from "./NewList";
import { useSelector, useDispatch } from "react-redux";
import { setList, ListState, ListItem } from "../../lib/listSlice";
import { Grid, Loader } from "@mantine/core";
import { sanitizeItems } from "../utils/helpers";

const ListView: React.FC<{ listData: ListState[] }> = ({ listData }) => {
  const dispatch = useDispatch();
  const listItems = useSelector(
    (state: { list: { items: ListItem[] } }) => state.list?.items
  );

  useEffect(() => {
    if (listData && listData.length > 0) {
      const data = listData.shift();

      if (data) {
        const sanitized = {
          ...data,
          createdAt: data.createdAt ? data.createdAt.toISOString() : null,
          updatedAt: data.updatedAt ? data.updatedAt.toISOString() : null,
          items: sanitizeItems(data.items),
        };
        dispatch(setList(sanitized));
      }
    }
  }, [listData, dispatch]);

  return (
    <Grid.Col
      span={10}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {listItems && listItems.length > 0 ? <NewList /> : <Loader />}
    </Grid.Col>
  );
};

export default ListView;
