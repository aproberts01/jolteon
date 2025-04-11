import React from "react";
import { useState, createRef, useEffect, useRef } from "react";
import { Container } from "@mantine/core";
import { Table, Title, Text, Flex, Box } from "@mantine/core";
import { list } from "../data.json";
import { reducer } from "../reducer";
import { useImmerReducer } from "use-immer";
import ListActions from "./ListActions";
import { ICON_MAP } from "../utils/constants";
import { useListDispatch, useListState } from "../ListContext";
import BottomDetailsDrawer from "./navigation/Drawer";

const useRefs = () => {
  const refsByKey = useRef<Record<string,HTMLElement | null>>({})

  const setRef = (element: HTMLElement | null, key: string) => {
    refsByKey.current[key] = element;
  }

  return {refsByKey: refsByKey.current, setRef};
}

const ListView: React.FC = (data) => {
  const [listData, dispatch] = useImmerReducer(reducer, list);
  const { body, list_title } = listData;
  const [currentlyHovered, setCurrentlyHovered] = useState<number | null>(null);
  const { refsByKey, setRef } = useRefs();
  const listDispatch = useListDispatch();
  const listState = useListState();
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

  const rows = body.map((listItem, i) => {
    return (
      <Table.Tr key={i}>
        {listItem.map(
          (
            cell: {
              id: number;
              listCellType: string;
              listCellAsset: string;
              listCellHeadline?: string;
              listCellSubheadline?: string;
            },
            j
          ) => {
            const IconComponent =
              ICON_MAP[cell.listCellAsset as keyof typeof ICON_MAP] || null;
            return (
              <Table.Td key={cell.id} ref={elRef => { if (i === 0) setRef(elRef, (j).toString()); }}>
                <Flex direction="row">
                  <Box>{IconComponent && <IconComponent size={40} />}</Box>
                  <Box ml="sm">
                    {cell.listCellHeadline && (
                      <Text>{cell.listCellHeadline}</Text>
                    )}
                    {cell.listCellSubheadline && (
                      <Text c="dimmed">{cell.listCellSubheadline}</Text>
                    )}
                  </Box>
                </Flex>
              </Table.Td>
            );
          }
        )}
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
          paddingInline: "0px",
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
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              data-column-number={i}
              style={{
                flex: refsByKey[i]?.offsetWidth ? undefined : 1,
                backgroundColor:
                  currentlyHovered === i ? "rgba(51, 170, 51, .1)" : undefined,
                width: refsByKey[i]?.offsetWidth ? `${refsByKey[i].offsetWidth}px` : "100%",
              }}
            ></div>
          ))}
        </div>
        <Table horizontalSpacing="lg" verticalSpacing="lg" withColumnBorders>
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Caption>Drag items into table to customize list</Table.Caption>
        </Table>
      </Container>
      <BottomDetailsDrawer
        open={listState?.drawerOpen ?? false}
        close={() => {
          if (listDispatch) {
            listDispatch({
              type: "TOGGLE_DRAWER",
            });
          }
        }}
      />
    </>
  );
};

export default ListView;
