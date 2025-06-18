'use client';
import React from "react";
import { Avatar, Badge, Group, Grid, Tabs } from "@mantine/core";
import TabsList from "../../components/navigation/TabsList";
import classes from "../../styles.module.css";
import { IconEdit, IconListNumbers } from "@tabler/icons-react";
import MyListsContent from "../../components/navigation/MyListsContent";
import NewCustomizeListContent from "../../components/navigation/NewCustomizeListContent";
import { MY_LISTS_DATA } from "../../utils/mockData";
import { UserButton } from "../../components/UserButton";
import { signOut } from "next-auth/react";

interface NavProps {
  user: any;
}

const Nav: React.FC<NavProps> = ({ user }) => {
  return (
    <Grid.Col span={2}>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="start">
            <Avatar src="../jolteon_sprite.png" size={50} radius="sm" />
            <Badge color="cyan">0.1.0</Badge>
          </Group>
          <Tabs color="teal" defaultValue="myLists">
            <TabsList
              tabs={[
                {
                  value: "myLists",
                  heading: "My Lists",
                  leftSection: <IconListNumbers size={12} />,
                },
                {
                  value: "customizeList",
                  heading: "Customize list",
                  leftSection: <IconEdit size={12} />,
                },
              ]}
            />

            <Tabs.Panel value="myLists">
              <MyListsContent lists={MY_LISTS_DATA} />
            </Tabs.Panel>
            <Tabs.Panel my="lg" value="customizeList">
              <NewCustomizeListContent />
            </Tabs.Panel>
          </Tabs>
        </div>

        {user && <UserButton user={user} signOut={() => signOut()} />}
      </nav>
    </Grid.Col>
  );
};

export default Nav;
