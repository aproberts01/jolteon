"use client";
import { Group, Avatar, Tabs } from "@mantine/core";
import classes from "./styles.module.css";
import ListView from "./components/ListView";
import { Grid, Badge } from "@mantine/core";
import { IconEdit, IconListNumbers } from "@tabler/icons-react";
import TabsList from "./components/navigation/TabsList";
import MyListsContent from "./components/navigation/MyListsContent";
import { MY_LISTS_DATA } from "./utils/mockData";
import NewCustomizeListContent from "./components/navigation/NewCustomizeListContent";
import { ListProvider } from "./ListContext";

export default function HomePage() {
  return (
    <ListProvider>
      <Grid gutter={0}>
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

            <div className={classes.footer}>
              <a
                href="#"
                className={classes.link}
                onClick={(event) => event.preventDefault()}
              >
                <span>Logout</span>
              </a>
            </div>
          </nav>
        </Grid.Col>
        <Grid.Col span={10}>
          <ListView />
        </Grid.Col>
      </Grid>
    </ListProvider>
  );
}
