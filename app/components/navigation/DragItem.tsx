import React from "react";
import { Paper, Flex, Avatar, Text, Box, Skeleton, Stack } from "@mantine/core";
import { ICON_MAP } from "@/app/utils/constants";
import { IconGripVertical, IconPhoto } from "@tabler/icons-react";
import styles from "./NavigationStyles.module.css";

interface DragItemProps {
  onClick: (event: React.DragEvent<HTMLDivElement>) => void;
  dataColumnType: string;
  contentType: string;
  isActive: boolean;
  iconGroup?: string[];
  headline?: string;
  subheadline?: string;
}

const DragItem: React.FC<DragItemProps> = ({
  onClick,
  iconGroup,
  dataColumnType,
  contentType,
  headline,
  subheadline,
  isActive
}) => {
  return (
    <Paper
      data-column-type={dataColumnType}
      onClick={onClick}
      className={styles.paperStyles}
      shadow="xs"
      p={contentType === "listIcons" ? "xs" : "md"}
      withBorder={true}
      style={{
        borderColor: isActive ? "var(--mantine-color-violet-5)" : "grey",
      }}
    >
      <Flex direction="row" justify="center" align="center">
        {contentType === "listIcons" && (
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
        {dataColumnType === "leftAlignedImage" && (
          <>
            <Skeleton animate={false} height={50} width={50}></Skeleton>
            <Stack>
              <Skeleton animate={false} width={100} height={8} ml='sm' radius="md" />
              <Skeleton animate={false} width={180} height={8} ml='sm' radius="md" />
            </Stack>
          </>
        )}
        {dataColumnType === "fullWidthImage" && (
          <>
            <Skeleton animate={false} height={50} width={250}></Skeleton>
          </>
        )}
      </Flex>
    </Paper>
  );
};

export default DragItem;
