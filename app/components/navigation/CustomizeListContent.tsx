import React from "react";
import { CUSTOMIZE_PANEL } from "@/app/utils/constants";
import {
  Text,
  ColorSwatch,
  Group,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import DragItem from "./DragItem";

const CustomizeListContent: React.FC = () => {
  const handleOnDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const { currentTarget, dataTransfer } = event;
    const attributeType = currentTarget.getAttribute("data-column-type");
    if (attributeType) {
      dataTransfer.setData("text/plain", attributeType);
    }
  };

  const renderCustomizePanel = (item: any) => {
    switch (item.value) {
      case "backgroundColor":
        return (
          <Group my="xs">
            {item.colorSwatches.map((color: string, index: number) => (
              <ColorSwatch
                component="button"
                key={`${index}_swatch`}
                color={color}
              />
            ))}
          </Group>
        );
      case "basicListContent":
        return (
          <SimpleGrid my="xs" cols={2}>
            {item.dragItems.map(
              (
                { iconGroup, type }: { iconGroup: string[]; type: string },
                index: number
              ) => {
                return (
                  <DragItem
                    key={type}
                    onDragStart={handleOnDragStart}
                    iconGroup={iconGroup}
                    dataColumnType={type}
                    contentType={item.value}
                  />
                );
              }
            )}
          </SimpleGrid>
        );
      case "dynamicListContent":
        return (
          <Stack key="2-cols" my="xs">
            {item.dragItems.map(
              (
                {
                  type,
                  headline,
                  subheadline,
                  iconGroup,
                }: {
                  type: string;
                  headline: string;
                  subheadline: string;
                  iconGroup?: string[];
                },
                index: number
              ) => {
                return (
                  <DragItem
                    key={type}
                    onDragStart={handleOnDragStart}
                    dataColumnType={type}
                    iconGroup={iconGroup}
                    contentType={item.value}
                    headline={headline}
                    subheadline={subheadline}
                  />
                );
              }
            )}
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
