import React from "react";
import { NEW_CUSTOMIZE_PANEL } from "@/app/utils/constants";
import { Text, ColorSwatch, Group, SimpleGrid, Flex } from "@mantine/core";
import DragItem from "./DragItem";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import {
  updateListItems,
  updateBackgroundColor,
  updateImageArrangement,
} from "@/lib/listSlice";
import { RootState } from "@/lib/store";

const NewCustomizeListContent: React.FC = () => {
  const dispatch = useDispatch();
  const selectListProperties = createSelector(
    (state: RootState) => state.list,
    (list) => ({
      backgroundColor: list.backgroundColor,
      imageArrangement: list.imageArrangement,
      iconSet: list.iconSet,
      id: list.id,
    })
  );
  const {
    backgroundColor: currentColor,
    imageArrangement: currentArrangement,
    iconSet: currentIconSet,
    id: listId,
  } = useSelector(selectListProperties);

  const handleUpdateIconSet = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { currentTarget } = event;
    const iconSet = currentTarget.getAttribute("data-column-type");
    const prevIconSet = currentIconSet;

    try {
      dispatch(
        updateListItems({
          property: "iconSet",
          value: iconSet,
        })
      );

      const res = await fetch(`/api/lists/${listId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ iconSet }),
      });

      if (!res.ok) throw new Error("Failed to update list");

      const updated = await res.json();

      if (updated.iconSet !== iconSet) {
        dispatch(
          updateListItems({
            property: "iconSet",
            value: updated.iconSet,
          })
        );
      }
    } catch (error) {
      console.error("Error updating list item icon set:", error);
      dispatch(
        updateListItems({
          property: "iconSet",
          value: prevIconSet,
        })
      );
    }
  };

  const handleUpdateImageArrangement = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { currentTarget } = event;
    const imageArrangement = currentTarget.getAttribute("data-column-type");
    const prevImageArrangement = currentArrangement;

    try {
      dispatch(updateImageArrangement(imageArrangement || "leftAlignedImage"));

      const res = await fetch(`/api/lists/${listId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageArrangement }),
      });

      if (!res.ok) throw new Error("Failed to update list");

      const updated = await res.json();

      if (updated.imageArrangement !== imageArrangement) {
        dispatch(updateImageArrangement(updated.imageArrangement));
      }
    } catch (error) {
      console.error("Error updating image arrangement:", error);
      dispatch(updateImageArrangement(prevImageArrangement));
    }
  };

  const handleUpdateBackgroundColor = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { currentTarget } = event;
    const backgroundColor = currentTarget.getAttribute("data-column-type");
    const prevBackgroundColor = currentColor;

    try {
      dispatch(updateBackgroundColor(backgroundColor || "transparent"));

      const res = await fetch(`/api/lists/${listId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ backgroundColor }),
      });

      if (!res.ok) throw new Error("Failed to update list");

      const updated = await res.json();

      if (updated.backgroundColor !== backgroundColor) {
        dispatch(updateBackgroundColor(updated.backgroundColor));
      }
    } catch (error) {
      console.error("Error changing background color:", error);
      dispatch(updateBackgroundColor(prevBackgroundColor));
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
                onClick={handleUpdateBackgroundColor}
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
                    onClick={handleUpdateIconSet}
                    iconGroup={iconGroup}
                    dataColumnType={type}
                    contentType={item.value}
                    isActive={type === currentIconSet}
                  />
                );
              }
            )}
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
                  onClick={handleUpdateImageArrangement}
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
