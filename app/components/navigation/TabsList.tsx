import React from "react";
import { Tabs } from "@mantine/core";
import { IconEdit, IconListNumbers } from "@tabler/icons-react";

interface TabsListProps {
  tabs: {
    value: string;
    heading: string;
    leftSection: React.ReactNode;
  }[];
}

const TabsList: React.FC<TabsListProps> = ({
  tabs,
}) => {
  return (
    <Tabs.List grow>
      {tabs.map(({value, heading, leftSection}) => (
        <Tabs.Tab key={value} value={value} leftSection={leftSection}>
          {heading}
        </Tabs.Tab>
      ))}
    </Tabs.List>
  );
};

export default TabsList;
