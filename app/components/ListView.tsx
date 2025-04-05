import React from "react";
import { Container } from "@mantine/core";
import { ActionIcon, Group, Table, Title } from "@mantine/core";
import { list } from "../data.json";
import {
  IconTableShare,
  IconDeviceFloppy,
  IconHeart,
} from "@tabler/icons-react";

const tableData = {
  caption: "Some elements from periodic table",
  body: [
    [6, 12.011, "C", "Carbon"],
    [7, 14.007, "N", "Nitrogen"],
    [39, 88.906, "Y", "Yttrium"],
    [56, 137.33, "Ba", "Barium"],
    [58, 140.12, "Ce", "Cerium"],
  ],
};

const ListView: React.FC = (data) => {
  return (
    <>
      <Group justify="flex-end" mr="150px" mt="12px">
        <ActionIcon
          size={42}
          variant="default"
          aria-label="ActionIcon with size as a number"
        >
          <IconDeviceFloppy size={24} />
        </ActionIcon>
        <ActionIcon
          size={42}
          variant="default"
          aria-label="ActionIcon with size as a number"
        >
          <IconTableShare size={24} />
        </ActionIcon>
        <ActionIcon
          size={42}
          variant="default"
          aria-label="ActionIcon with size as a number"
        >
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
        }}
        my="sm"
      >
        <Title order={2} ta="center" my="lg">
          {list.list_title}
        </Title>
        <Table
          withRowBorders
          withColumnBorders
          horizontalSpacing="lg"
          verticalSpacing="lg"
          onDragEnter={(event) => {
            event.preventDefault();
            console.log('drag has entered')
          }}
          data={tableData}
        />
      </Container>
    </>
  );
};

export default ListView;
