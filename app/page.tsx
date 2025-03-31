"use client";
import { useState } from "react";
import { Code, Group, SimpleGrid, Avatar, Title, Tabs } from "@mantine/core";
import classes from "./styles.module.css";
import ListView from "./components/ListView";
import { Container, Grid, Skeleton, Text, Card, Button, Badge } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconEdit,
  IconListNumbers
} from "@tabler/icons-react";

export default function HomePage() {
  return (
    <Grid>
      <Grid.Col span={2}>
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Group className={classes.header} justify="start">
              <Avatar src="../jolteon_sprite.png" size={50} radius="sm" />
              <Badge color="cyan">0.1.0</Badge>
            </Group>
            <Tabs color="teal" defaultValue="gallery">
              <Tabs.List grow>
                <Tabs.Tab value="gallery" leftSection={<IconListNumbers size={12} />}>
                  My Lists
                </Tabs.Tab>
                <Tabs.Tab
                  value="messages"
                  leftSection={<IconEdit size={12} />}
                >
                  Customize List
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="gallery">
                <Button color="cyan" mt="sm">Create New List</Button>
                <Card
                  shadow="lg"
                  padding="xl"
                  component="a"
                  href="#"
                  target="_blank"
                  my="sm"
                  withBorder
                  style={{ borderColor: 'cyan' }}
                >
                  <Card.Section></Card.Section>
                  <Text fw={500} size="lg" mt="md">
                    List Title
                  </Text>
                  <Text mt="xs" c="dimmed" size="sm">
                    List Description
                  </Text>
                  <Text mt="xs" c="dimmed" size="xs">
                    Created: {new Date().toLocaleString() + ""}
                  </Text>
                </Card>
                <Card
                  shadow="lg"
                  padding="xl"
                  component="a"
                  href="#"
                  target="_blank"
                  my="sm"
                  withBorder
                >
                  <Card.Section></Card.Section>
                  <Text fw={500} size="lg" mt="md">
                    List Title
                  </Text>
                  <Text mt="xs" c="dimmed" size="sm">
                    List Description
                  </Text>
                  <Text mt="xs" c="dimmed" size="xs">
                    Created: {new Date().toLocaleString() + ""}
                  </Text>
                </Card>
                <Card
                  shadow="lg"
                  padding="xl"
                  component="a"
                  href="#"
                  target="_blank"
                  my="sm"
                  withBorder
                >
                  <Card.Section></Card.Section>
                  <Text fw={500} size="lg" mt="md">
                    List Title
                  </Text>
                  <Text mt="xs" c="dimmed" size="sm">
                    List Description
                  </Text>
                  <Text mt="xs" c="dimmed" size="xs">
                    Created: 3/31/2025, 2:02:28 PM
                  </Text>
                </Card>
              </Tabs.Panel>
              <Tabs.Panel value="messages">Customize list content</Tabs.Panel>
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
  );
}
