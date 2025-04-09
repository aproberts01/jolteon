import React from "react";
import { useState } from "react";
import { Container } from "@mantine/core";
import { Table, Title } from "@mantine/core";
import { list } from "../data.json";
import { reducer } from "../reducer";
import { useImmerReducer } from "use-immer";
import ListActions from "./ListActions";
import { ICON_MAP } from "../utils/constants";

const ListView: React.FC = (data) => {
  const [listData, dispatch] = useImmerReducer(reducer, list);
  const { body, list_title } = listData;
  const [currentlyHovered, setCurrentlyHovered] = useState<number | null>(null);
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

  const rows = body.map((listItem, i) => {
    return (
      <Table.Tr key={i}>
        {listItem.map((cell, i) => {
          const IconComponent =
            ICON_MAP[cell.listCellAsset as keyof typeof ICON_MAP] || null;
          return (
            <Table.Td key={cell.id}>
              {IconComponent && <IconComponent size={40} />}
            </Table.Td>
          );
        })}
      </Table.Tr>
    );
  });

  return (
    <>
      <ListActions />
      <Container
        fluid
        style={{
          border: "solid 1px",
          borderRadius: "20px",
          padding: "20px",
          width: "80%",
          borderColor: "grey",
          position: "relative",
        }}
        my="sm"
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Title order={2} ta="center" my="lg">
          {list_title}
        </Title>
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            data-column-number={i}
            style={{
              width: `${i === 4 ? 268 : 228}px`,
              height: "100%",
              position: "absolute",
              top: 0,
              left: `${i * 228}px`,
              backgroundColor:
                currentlyHovered === i ? "rgba(51, 170, 51, .1)" : undefined,
            }}
          ></div>
        ))}
        <Table horizontalSpacing="lg" verticalSpacing="lg">
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Caption>Drag items into table to customize list</Table.Caption>
        </Table>
      </Container>
    </>
  );
};

export default ListView;
