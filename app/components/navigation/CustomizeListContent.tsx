import React from "react";
import { CUSTOMIZE_PANEL } from "@/app/utils/constants";
import {
  Text,
  ColorSwatch,
  Paper,
  Group,
  SimpleGrid,
  Avatar,
  Stack,
  Flex,
  Box,
} from "@mantine/core";
import { ICON_MAP } from "@/app/utils/constants";
import { IconStarFilled, IconStar, IconPhoto } from "@tabler/icons-react";
import styles from './NavigationStyles.module.css';

const CustomizeListContent: React.FC = () => {
  const renderCustomizePanel = (item: any) => {
    switch (item.value) {
      case "backgroundColor":
        return (
          <Group my="xs">
            {item.colorSwatches.map((color: string, index: number) => (
              <ColorSwatch component="button" key={`${index}_swatch`} color={color} />
            ))}
          </Group>
        );
      case "oneColContent":
        return (
          <SimpleGrid my="xs" cols={2}>
            {item.dragItems.map(
              ({ iconGroup }: { iconGroup: string[] }, index: number) => {
                return (
                  <Paper className={styles.paperStyles} draggable={true} shadow="xs" p="xs" key={`${index}_group`}>
                    <Avatar.Group>
                      {iconGroup.map((componentName: string, i) => {
                        let Component =
                          ICON_MAP[componentName as keyof typeof ICON_MAP];
                        return (
                          <Avatar key={`${componentName}_${i}`}>
                            <Component/>
                          </Avatar>
                        );
                      })}
                    </Avatar.Group>
                  </Paper>
                );
              }
            )}
          </SimpleGrid>
        );
      case "twoColContent":
        return (
          <Stack key="2-cols" my="xs">
            <Paper className={styles.paperStyles} draggable={true} shadow="xs" p="md">
              <Text size="sm" fw={500}>
                One-line simple text
              </Text>
            </Paper>
            <Paper className={styles.paperStyles} draggable={true} shadow="xs" p="md">
              <Text size="sm" fw={500}>
                Two-lines simple text
              </Text>
              <Text size="sm" c="dimmed">
                Write a second line here
              </Text>
            </Paper>
            <Paper className={styles.paperStyles} draggable={true} shadow="xs" p="md">
              <Flex direction="row">
                <Box>
                  <IconPhoto size={30}/>
                </Box>
                <Box ml="sm">
                  <Text size="sm" fw={500}>
                    Two-lines with image
                  </Text>
                  <Text size="sm" c="dimmed">
                    Write a second line here
                  </Text>
                </Box>
              </Flex>
            </Paper>
            <Paper className={styles.paperStyles} draggable={true} shadow="xs" p="md">
              <Flex direction="row">
                <IconStarFilled />
                <IconStarFilled />
                <IconStarFilled />
                <IconStar />
                <IconStar />
              </Flex>
            </Paper>
          </Stack>
        );
      default:
        return null;
    }
  };
  return (
    <>
      {CUSTOMIZE_PANEL.map((item) => {
        return (
          <React.Fragment key={item.value}>
            <Text fw={500} size="sm">
              {item.heading}
            </Text>
            {renderCustomizePanel(item)}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CustomizeListContent;
