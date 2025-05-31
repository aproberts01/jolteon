import React from "react";
import { useState, createRef, useEffect, useRef } from "react";
import { Container } from "@mantine/core";
import { Table, Title, Text, Flex, Box, Button } from "@mantine/core";
import { newList } from "../newData.json";
import { reducer } from "../reducer";
import { useImmerReducer } from "use-immer";
import { ICON_MAP, COLUMN_AMOUNT, JOLTY_VERSION } from "../utils/constants";
import { useListDispatch, useListState } from "../ListContext";
import { ListItem, ListState } from "../reducer";
import NewList from "./NewList";

const useRefs = () => {
  const refsByKey = useRef<Record<string, HTMLElement | null>>({});

  const setRef = (element: HTMLElement | null, key: string) => {
    refsByKey.current[key] = element;
  };

  return { refsByKey: refsByKey.current, setRef };
};

const ListView: React.FC = (data) => {
  const [listData, dispatch] = useImmerReducer(reducer, {
    ...newList,
    body: [newList.body], // Wrap the body array in another array to make it two-dimensional
  } as ListState);
  const { body, title, description }: { body: Array<Array<ListItem>>; title: string; description: string } =
    listData;
  const [currentlyHovered, setCurrentlyHovered] = useState<number | null>(null);

  const listDispatch = useListDispatch();
  let dragCount = 0;

  const handleDataUpdateOnDrop = (data: string, currentlyHovered: number) => {
    setCurrentlyHovered(null);

    dispatch({
      type: "UPDATE_LIST_COLUMN",
      payload: {
        columnContentType: data,
        dropColumnIndex: currentlyHovered,
      },
    });

    if (listDispatch) {
      listDispatch({
        type: "TOGGLE_DRAWER",
      });
    }
  };

  /**
   * Handles the drag enter event for a draggable element.
   * Prevents the default behavior and determines the column number
   * of the target element being hovered over. Updates the currently
   * hovered column state if the target is a valid column and the column
   * number has changed.
   *
   * @param e - The drag event triggered when an element is dragged over a valid drop target.
   */
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const columnNumber = target.getAttribute("data-column-number");

    if (
      columnNumber &&
      target.tagName === "DIV" &&
      parseInt(columnNumber) !== currentlyHovered
    ) {
      setCurrentlyHovered(parseInt(columnNumber));
      dragCount += 1;
    }
  };

  /**
   * Handles the drag leave event for a draggable element.
   *
   * @param e - The drag event triggered when the draggable element leaves a valid drop target.
   *
   * This function prevents the default behavior of the drag event and checks the `data-column-number`
   * attribute of the target element. If the column number exists and the `dragCount` is zero, it resets
   * the `currentlyHovered` state to `null` and decrements the `dragCount`.
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const columnNumber = target.getAttribute("data-column-number");

    if (columnNumber && dragCount === 0) {
      setCurrentlyHovered(null);
      dragCount -= 1;
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const { dataTransfer } = e;
    const data = dataTransfer.getData("text/plain");

    if (data && currentlyHovered !== null) {
      handleDataUpdateOnDrop(data, currentlyHovered);
    }
  };

  return (
    <>
        <NewList title={title} description={description} listData={body.flat()} />
    </>
  );
};

export default ListView;
