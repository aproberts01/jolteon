import React from "react";
import { NEW_CUSTOMIZE_PANEL, ICON_MAP } from "@/app/utils/constants";
import { Text, ColorSwatch, Group, SimpleGrid, Flex } from "@mantine/core";
import DragItem from "./DragItem";
import { useDispatch, useSelector } from "react-redux";
import { updateListIcons, updateBackgroundColor, updateImageArrangement } from "../../../lib/listSlice";

const NewCustomizeListContent: React.FC = () => {
  const dispatch = useDispatch();
  const currentColor = useSelector(
    (state: { list: { backgroundColor: string } }) => state.list.backgroundColor
  );
  const currentArrangement = useSelector(
    (state: { list: { imageArrangement: string } }) => state.list.imageArrangement
  );
  const currentIconSet = useSelector(
    (state: { list: { iconSet: string } }) => state.list.iconSet
  );

  
  const handleOnClick = (event: React.DragEvent<HTMLDivElement>) => {
    const { currentTarget, dataTransfer } = event;
    const columnContentType = currentTarget.getAttribute("data-column-type");


    //handle dispatch here
    if (columnContentType) {
      dispatch(
        updateListIcons({
          columnContentType: columnContentType as keyof typeof ICON_MAP,
          dropColumnIndex: 0,
        })
      );
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
                onClick={() => {
                  dispatch(updateBackgroundColor(color));
                }}
                style={{
                  cursor: "pointer",
                  border:
                    currentColor === color
                      ? "solid 1px var(--mantine-color-violet-5)"
                      : "transparent",
                }}
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
                    isActive={type === currentIconSet }
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
                  isActive={type === currentArrangement}
                  key={type}
                  onClick={() => {
                    dispatch(updateImageArrangement(type));
                  }}
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
            <Text my="sm" fw={500} size="sm">
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
