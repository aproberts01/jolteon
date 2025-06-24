import React from "react";
import { Container, Title, Text, Box } from "@mantine/core";
import Card from "./Card";
import ListGenerateAction from "./ListGenerateAction";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { setSelectedItem } from "@/lib/listSlice";
import { COLUMN_CONTENT_MAP, ICON_MAP } from "@/app/utils/constants";
import { RootState } from "@/lib/store";

const NewList: React.FC = () => {
  const dispatch = useDispatch();
  const selectList = (state: RootState) => state.list;

  const selectListProps = createSelector([selectList], (list) => ({
    title: list.title,
    description: list.description,
    iconSet: list.iconSet,
    backgroundColor: list.backgroundColor,
    listItems: list.items,
  }));
  const { title, description, iconSet, backgroundColor, listItems } =
    useSelector(selectListProps);

  const columnContent =
    COLUMN_CONTENT_MAP[iconSet as keyof typeof COLUMN_CONTENT_MAP];
  const defaultBackgroundColor = "transparent";

  return (
    <Container
      fluid
      style={{
        border: "solid 1px",
        borderRadius: "20px",
        width: "40vw",
        borderColor: "grey",
        position: "relative",
        paddingInline: "0px",
        height: "calc(100vh - var(--mantine-spacing-md) * 2)",
        overflowY: "auto",
        backgroundColor: backgroundColor || defaultBackgroundColor,
      }}
      my="md"
      px="xl"
      id="list-selector"
    >
      <ListGenerateAction />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <Title>{title}</Title>
        <Text size="sm" color="dimmed" mt="xs">
          {description}
        </Text>
      </Box>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: 0,
        }}
      >
        {listItems &&
          listItems.map((item, index) => {
            const {
              headline,
              subHeadline,
              starRating,
              description,
              imageUrl,
              id,
              position,
            } = item;
            return (
              <Card
                icon={
                  (columnContent?.iconGroup?.[position - 1] ||
                    columnContent?.iconGroup?.[index]) as keyof typeof ICON_MAP
                }
                headline={headline}
                subHeadline={subHeadline}
                starRating={starRating}
                description={description}
                imageUrl={imageUrl}
                key={id}
                onSelect={() => dispatch(setSelectedItem(item))}
              />
            );
          })}
      </ul>
    </Container>
  );
};

export default NewList;
