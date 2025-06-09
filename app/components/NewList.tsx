import React from "react";
import { Container, Title, Text, Box } from "@mantine/core";
import Card from "./Card";
import ListGenerateAction from "./ListGenerateAction";
import { useSelector } from "react-redux";

interface ListItems {
  id: number;
  starRating: number;
  headline: string;
  subheadline: string;
  description: string;
  rankingAsset: string;
  imageUrl: string;
}

interface NewListProps {
  title: string;
  description: string;
  listData: ListItems[];
}

const NewList: React.FC<NewListProps> = ({ title, description, listData }) => {
  const backgroundColor = useSelector(
    (state: { list: { backgroundColor: string } }) => state.list.backgroundColor
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
          height: "15vh",
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
        {listData.map(
          ({
            headline,
            subheadline,
            starRating,
            description,
            rankingAsset,
            imageUrl,
            id,
          }) => (
            <Card
              headline={headline}
              subheadline={subheadline}
              starRating={starRating}
              description={description}
              rankingAsset={rankingAsset}
              imageUrl={imageUrl}
              key={id}
            />
          )
        )}
      </ul>
    </Container>
  );
};

export default NewList;
