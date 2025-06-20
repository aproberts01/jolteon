import React from "react";
import { Container, Title, Text, Box } from "@mantine/core";
import Card from "./Card";
import ListGenerateAction from "./ListGenerateAction";
import { useSelector, useDispatch } from "react-redux";
import { ListItem, setSelectedItem } from "../../lib/listSlice";

const NewList: React.FC = () => {
  const dispatch = useDispatch();
  const backgroundColor = useSelector(
    (state: { list: { backgroundColor: string } }) =>
      state.list?.backgroundColor
  );
  const title = useSelector((state: any) => state.list?.title);
  const description = useSelector((state: any) => state.list?.description);
  const listItems = useSelector(
    (state: { list: { items: ListItem[] } }) => state.list?.items
  );

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
          listItems.map((item) => {
            const {
              headline,
              subHeadline,
              starRating,
              description,
              rankingAsset,
              imageUrl,
              id,
            } = item;
            return (
              <Card
                headline={headline}
                subHeadline={subHeadline}
                starRating={starRating}
                description={description}
                rankingAsset={rankingAsset}
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
