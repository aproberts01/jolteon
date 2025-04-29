import React from "react";
import { Paper, Flex, Avatar, Text, Box } from "@mantine/core";
import { ICON_MAP } from "@/app/utils/constants";
import { IconGripVertical, IconPhoto } from "@tabler/icons-react";
import styles from "./NavigationStyles.module.css";

interface DragItemProps {
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  dataColumnType: string;
  contentType: string;
  iconGroup?: string[];
  headline?: string;
  subheadline?: string;
}

const DragItem: React.FC<DragItemProps> = ({
  onDragStart,
  iconGroup,
  dataColumnType,
  contentType,
  headline,
  subheadline,
}) => {
  return (
    <Paper
      data-column-type={dataColumnType}
      onDragStart={onDragStart}
      className={styles.paperStyles}
      draggable={true}
      shadow="xs"
      p={contentType === "basicListContent" ? "xs" : "md"}
    >
      <Flex direction="row" align="center">
        <IconGripVertical />
        {contentType === "basicListContent" && (
          <Avatar.Group>
            {iconGroup?.map((componentName: string, i) => {
              let Component = ICON_MAP[componentName as keyof typeof ICON_MAP];
              return (
                <Avatar key={`${componentName}_${i}`}>
                  <Component />
                </Avatar>
              );
            })}
          </Avatar.Group>
        )}
        {contentType === "dynamicListContent" && (
          <>
            {dataColumnType === "twoLineWithImage" && <IconPhoto size={30} />}
            <Box ml="sm">
              {headline && (
                <Text size="sm" fw={500}>
                  {headline}
                </Text>
              )}
              {subheadline && (
                <Text size="sm" c="dimmed">
                  {subheadline}
                </Text>
              )}
            </Box>
          </>
        )}
        {dataColumnType === "starRating" && (
          <Flex key={dataColumnType} direction="row">
            {iconGroup?.map((componentName: string, i) => {
              let StarComponent =
                ICON_MAP[componentName as keyof typeof ICON_MAP];
              return (
                  <StarComponent key={`${i}_star`} />
              );
            })}
          </Flex>
        )}
      </Flex>
    </Paper>
  );
};

export default DragItem;
