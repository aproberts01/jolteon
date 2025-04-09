import React from "react";
import { useState } from "react";
import { Container } from "@mantine/core";
import { ActionIcon, Group, Table, Title } from "@mantine/core";
import { list } from "../data.json";
import {
  IconTableShare,
  IconDeviceFloppy,
  IconHeart,
} from "@tabler/icons-react";
import { reducer } from "../reducer";
import { useImmerReducer } from "use-immer";

const ListView: React.FC = (data) => {
  const [listData, dispatch] = useImmerReducer(reducer, list);
  const { body, list_title } = listData;
  const [currentlyHovered, setCurrentlyHovered] = useState<number | null>(null);
  let dragCount = 0;

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const columnNumber = target.getAttribute("data-column-number");
    
    if (columnNumber && target.tagName === "DIV" && parseInt(columnNumber) !== currentlyHovered) {
      setCurrentlyHovered(parseInt(columnNumber));
      dragCount += 1
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;;
    const columnNumber = target.getAttribute("data-column-number")

    if (columnNumber && dragCount === 0) {
      setCurrentlyHovered(null);
      dragCount -= 1
    }
  };

  const rows = body.map((listItem, i) => (
    <Table.Tr key={i}>
      {listItem.map((cell, i) => (
        <Table.Td
          key={cell.id}
        >
          {cell.id}
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <>
      <Group justify="flex-end" mr="160px" my="xl">
        <ActionIcon size={42} variant="default" aria-label="Save list">
          <IconDeviceFloppy size={24} />
        </ActionIcon>
        <ActionIcon size={42} variant="default" aria-label="Share list">
          <IconTableShare size={24} />
        </ActionIcon>
        <ActionIcon size={42} variant="default" aria-label="Like list">
          <IconHeart size={24} />
        </ActionIcon>
      </Group>
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
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <Title order={2} ta="center" my="lg">
          {list_title}
        </Title>
        {
          Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                data-column-number={i}
                style={{
                  width: `${i === 4 ? 268 : 228}px`,
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: `${i * 228}px`,
                  backgroundColor: currentlyHovered === i ? "rgba(51, 170, 51, .1)" : undefined,
                }}
              ></div>
          )
        )}
        <Table
        >
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Caption>Drag items into table to customize list</Table.Caption>
        </Table>
      </Container>
    </>
  );
};

export default ListView;
