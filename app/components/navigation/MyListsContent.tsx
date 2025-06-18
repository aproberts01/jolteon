import React from "react";
import { Text, Card, Button } from "@mantine/core";

interface ListItem {
  id: string;
  listTitle: string;
  listDescription: string;
  createdAt: string;
}

interface MyListsContentProps {
  lists: ListItem[];
}

const MyListsContent: React.FC<MyListsContentProps> = ({ lists }) => {
  return (
    <>
      <Button color="cyan" mt="sm">
        Create New List
      </Button>
      {lists.map(({ listTitle, listDescription, createdAt }: ListItem, i) => (
        <Card
          shadow="lg"
          padding="xl"
          component="a"
          href="#"
          target="_blank"
          my="sm"
          withBorder
          style={{ borderColor: i === 0 ? "cyan" : undefined }}
          key={listTitle}
        >
          <Card.Section></Card.Section>
          <Text fw={500} size="lg" mt="md">
            {listTitle}
          </Text>
          <Text mt="xs" c="dimmed" size="sm">
            {listDescription}
          </Text>
          <Text mt="xs" c="dimmed" size="xs">
            Created: {createdAt}
          </Text>
        </Card>
      ))}
    </>
  );
};

export default MyListsContent;
