import React from "react";
import { Container } from "@mantine/core";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Group,
  Table,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core";
import listData from "../data.json";
import { IconTableShare, IconDeviceFloppy, IconHeart } from '@tabler/icons-react';

interface Props {}

const ListView: React.FC<Props> = () => {
  const theme = useMantineTheme()
  const rows = listData.list.tiles.map((item, i) => (
    <Table.Tr key={item.tileId}>
      <Table.Td>
        <Text>#{ i + 1 }</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm" fw={800}>
          {item.headline}
        </Text>
        <Text fz="sm" fw={500}>
          {item.subHeadline}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

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
          {listData.list.list_title}
        </Title>
        <Table.ScrollContainer minWidth={450}>
          <Table style={{ width: '70%', margin: '0 auto' }} withColumnBorders withTableBorder verticalSpacing="md">
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Container>
    </>
  );
};

export default ListView;
