import React from "react";
import { ActionIcon, Group } from "@mantine/core";
import {
  IconTableShare,
  IconDeviceFloppy,
  IconHeart,
} from "@tabler/icons-react";

const ListActions: React.FC = ({}) => {
  return (
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
  );
};

export default ListActions;
