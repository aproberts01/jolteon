import React from "react";
import { NEW_CUSTOMIZE_PANEL, ICON_MAP } from "@/app/utils/constants";
import {
  Text,
  ColorSwatch,
  Group,
  SimpleGrid,
  Flex,
  Fieldset,
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import DragItem from "./DragItem";

import { useSelector, useDispatch } from 'react-redux';
import { updateListData } from "../../../lib/listSlice"


const NewCustomizeListContent: React.FC = () => {
  const dispatch = useDispatch();
  const handleOnClick = (event: React.DragEvent<HTMLDivElement>) => {
    const { currentTarget, dataTransfer } = event;
    const columnContentType = currentTarget.getAttribute("data-column-type");

    //handle dispatch here
    if (columnContentType) {
      dispatch(updateListData({
        columnContentType: columnContentType as keyof typeof ICON_MAP,
        dropColumnIndex: 0,
      }));
    }
  };

  const renderCustomizePanel = (item: any) => {
    switch (item.value) {
      case "title":
        return (
          <Fieldset legend="Title & Description" my="xs">
            <TextInput placeholder="Title" />
            <Textarea mt="sm" placeholder="Description" />
            <Button mt="sm" size="xs">
              Save
            </Button>
          </Fieldset>
        );
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
      case "listIcons":
        return (
          <SimpleGrid my="xs" cols={2}>
            {item.items.map(
              (
                { iconGroup, type }: { iconGroup: string[]; type: string },
                index: number
              ) => {
                return (
                  <DragItem
                    key={type}
                    onClick={handleOnClick}
                    iconGroup={iconGroup}
                    dataColumnType={type}
                    contentType={item.value}
                  />
                );
              }
            )}
          </SimpleGrid>
        );
      case "starRating":
        return (
          <SimpleGrid my="xs" cols={2}>
            <Flex my="xs" direction="row">
              {item.items[0].iconGroup?.map(
                (componentName: string, i: number) => {
                  let StarComponent =
                    ICON_MAP[componentName as keyof typeof ICON_MAP];
                  return <StarComponent key={`${i}_star`} />;
                }
              )}
            </Flex>
          </SimpleGrid>
        );
      case "imageArrangement":
        return (
          <Flex direction="column" my="xs" gap="sm">
            {item.items.map(({ type }: { type: string }, index: number) => {
              return (
                <DragItem
                  key={type}
                  onClick={handleOnClick}
                  dataColumnType={type}
                  contentType={item.value}
                />
              );
            })}
          </Flex>
        );

      default:
        return null;
    }
  };
  return (
    <>
      {NEW_CUSTOMIZE_PANEL.map((item) => {
        return (
          <React.Fragment key={item.value}>
            <Text fw={500} size="sm">
              {item.value === "title" ? null : item.heading}
            </Text>
            {renderCustomizePanel(item)}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default NewCustomizeListContent;
