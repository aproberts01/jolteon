import React from "react";
import {
  Box,
  Title,
  Text,
  BackgroundImage,
  Overlay,
  AspectRatio,
} from "@mantine/core";
import styles from "../../styles.module.css";
import { ICON_MAP } from "@/app/utils/constants";

interface CardProps {
  key: number;
  headline: string;
  subheadline: string;
  starRating: number;
  description: string;
  rankingAsset?: string;
  imageUrl?: string;
}

const Card: React.FC<CardProps> = ({
  headline,
  subheadline,
  starRating,
  description,
  rankingAsset,
  imageUrl,
}) => {
  const IconComponent = ICON_MAP[rankingAsset as keyof typeof ICON_MAP] || null;
  return (
    <li className={styles.listContainer}>
      <Box
        style={{
          width: '250px',
          height: '141px',
          overflow: "hidden",
        }}
      >
        <AspectRatio ratio={16 / 9} mx="auto" pos="relative">
          {imageUrl && (
            <BackgroundImage
              src={imageUrl}
              p="xs"
              style={{ height: "100%", width: "100%" }}
            >
              <Overlay
                p="sm"
                gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)"
                opacity={0.85}
                zIndex="0"
              >
                <IconComponent color="var(--mantine-color-dark-0)" size={25} />
              </Overlay>
            </BackgroundImage>
          )}
        </AspectRatio>
      </Box>
      <Box m="lg">
        <Title order={4}>{headline}</Title>
        <Box>{"*".repeat(starRating)}</Box>
        <Text c="dimmed">{subheadline}</Text>
        <Text c="dimmed">{description}</Text>
      </Box>
    </li>
  );
};

export default Card;
