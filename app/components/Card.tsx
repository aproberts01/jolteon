import React from "react";
import {
  Box,
  Title,
  Text,
  BackgroundImage,
  Overlay,
  AspectRatio,
  Flex,
} from "@mantine/core";
import styles from "../styles.module.css";
import { ICON_MAP } from "@/app/utils/constants";
import { useSelector } from "react-redux";

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
  const imageArrangement = useSelector(
    (state: { list: { imageArrangement: string } }) =>
      state.list.imageArrangement
  );
  return (
    <li className={styles.listContainer}>
      <Box
        style={{
          width: `${imageArrangement === "fullWidthImage" ? "100%" : "250px"}`,
          height: "141px",
          overflow: "hidden",
        }}
      >
        <AspectRatio ratio={16 / 9} mx="auto" pos="relative">
          {imageUrl && (
            <BackgroundImage
              src={imageUrl}
              p="xs"
              style={{
                height: "100%",
                width: "100%",
                backgroundPosition: "center",
              }}
            >
              <Overlay
                p="sm"
                gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)"
                opacity={0.85}
                zIndex="0"
              >
                {imageArrangement === "fullWidthImage" ? (
                  <Flex>
                    <IconComponent
                      color="var(--mantine-color-dark-0)"
                      size={25}
                    />
                    <Box mt="sm" mx="lg">
                      <Title order={4}>{headline}</Title>
                      <Box>{"*".repeat(starRating)}</Box>
                      <Text size="sm" c="dimmed">
                        {subheadline}
                      </Text>
                      <Text size="sm">{description}</Text>
                    </Box>
                  </Flex>
                ) : (
                  <IconComponent
                    color="var(--mantine-color-dark-0)"
                    size={25}
                  />
                )}
              </Overlay>
            </BackgroundImage>
          )}
        </AspectRatio>
      </Box>
      {imageArrangement === "leftAlignedImage" && (
        <Box m="lg">
          <Title order={4}>{headline}</Title>
          <Box>{"*".repeat(starRating)}</Box>
          <Text size="sm" c="dimmed">
            {subheadline}
          </Text>
          <Text size="sm">{description}</Text>
        </Box>
      )}
    </li>
  );
};

export default Card;
