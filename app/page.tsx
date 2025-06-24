"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Container, Text, Title, Avatar, Group } from "@mantine/core";
import classes from "./styles.module.css";
import { GoogleButton } from "@components/GoogleButton";
import { IconBrandGithub } from "@tabler/icons-react";

export default function HomePage() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{
                  from: "var(--mantine-color-violet-1)",
                  to: "var(--mantine-color-indigo-8)",
                }}
              >
                <Avatar src="../jolteon_sprite.png" size={50} radius="sm" />
                Jolty
              </Text>
              <br />
              Create, Customize, and Share your Lists
            </Title>

            <Text className={classes.description} mt={30}>
              Build beautiful, shareable lists and instantly generate stunning
              visuals to showcase your ideas, collections, or favorites
              anywhere.
            </Text>
            <Group>
              <GoogleButton signIn={() => signIn('google')} />
              <Button
                variant="gradient"
                gradient={{
                  from: "var(--mantine-color-violet-3)",
                  to: "var(--mantine-color-indigo-8)",
                }}
                size="xl"
                className={classes.control}
                leftSection={<IconBrandGithub />}
                mt={40}
              >
                Source Code
              </Button>
            </Group>
          </div>
        </div>
      </Container>
    </div>
  );
}
