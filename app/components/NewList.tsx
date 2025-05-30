import React from "react";
import { Container, Title, Text, Box } from "@mantine/core";
import styles from "../styles.module.css";
import { IconNumber1 } from "@tabler/icons-react";
import Card from "./navigation/Card";

const mockData = [
  {
    id: 1,
    starRating: 5,
    headline: "Deadpool",
    subheadline: "Marvel Comics",
    description: "A hilarious anti-hero movie with Ryan Reynolds.",
    rankingAsset: "IconNumber1",
    imageUrl: "/assets/climbing_girl.jpg",
  },
  {
    id: 2,
    starRating: 4,
    headline: "The Dark Knight",
    subheadline: "DC Comics",
    description: "A gripping tale of Batman's fight against the Joker.",
    rankingAsset: "IconNumber2",
    imageUrl: "/assets/fencing.jpg",
  },
  {
    id: 3,
    starRating: 4,
    headline: "The Godfather",
    subheadline: "Paramount Pictures",
    description: "A classic crime drama about the Corleone family.",
    rankingAsset: "IconNumber3",
    imageUrl: "/assets/skateboarder.jpg",
  },
  {
    id: 4,
    starRating: 3,
    headline: "Inception",
    subheadline: "Warner Bros.",
    description: "A mind-bending thriller about dreams within dreams.",
    rankingAsset: "IconNumber4",
    imageUrl: "/assets/swim_girls.jpg",
  },
  {
    id: 5,
    starRating: 5,
    headline: "Interstellar",
    subheadline: "Paramount Pictures",
    description: "A visually stunning journey through space and time.",
    rankingAsset: "IconNumber5",
    imageUrl: "/assets/horse_girl.jpg",
  },
];

const NewList: React.FC = () => {
  return (
    <Container
      fluid
      style={{
        border: "solid 1px",
        borderRadius: "20px",
        width: "80%",
        borderColor: "grey",
        position: "relative",
        paddingInline: "0px",
        height: "80vh",
        overflowY: "auto",
      }}
      my="sm"
      px="lg"
      id="list-selector"
    >
      <ul
        style={{
          listStyleType: "none",
          padding: "3em",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {mockData.map(
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
