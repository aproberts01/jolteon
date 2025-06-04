import { IconChevronRight, IconLogout } from "@tabler/icons-react";
import { Avatar, Group, Text, UnstyledButton, Menu } from "@mantine/core";

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export function UserButton({
  user,
  signOut,
}: {
  user?: User;
  signOut: () => void;
}) {
  return (
    <Menu width="target" position="top-end">
      <Menu.Target>
        <UnstyledButton>
          <Group p="sm">
            <Avatar src={user?.image || null} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {user?.name || "Anonymous User"}
              </Text>

              <Text c="dimmed" size="xs">
                {user?.email}
              </Text>
            </div>
            <IconChevronRight size={14} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown p="sm">
        <Menu.Label>Application</Menu.Label>
        <Menu.Item onClick={signOut} leftSection={<IconLogout size={14} />}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
