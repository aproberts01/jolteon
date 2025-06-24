import React from "react";
import {
  Box,
  Title,
  Text,
  BackgroundImage,
  Overlay,
  AspectRatio,
  Flex,
  UnstyledButton,
} from "@mantine/core";
import styles from "../styles.module.css";
import { ICON_MAP } from "@/app/utils/constants";
import { useSelector } from "react-redux";

interface CardProps {
  key: string;
  headline: string;
  subHeadline: string;
  starRating: string;
  description: string;
  imageUrl?: string;
  icon: keyof typeof ICON_MAP;
  onSelect?: () => void;
}

const Card: React.FC<CardProps> = ({
  headline,
  subHeadline,
  starRating,
  description,
  icon,
  imageUrl,
  onSelect,
}) => {
  const IconComponent = ICON_MAP[icon] || null;

  const generateStars = (rating: number) => {
    const filledStar = ICON_MAP.IconStarFilled;
    const emptyStar = ICON_MAP.IconStar;

    return Array.from({ length: 5 }, (_, i) => {
      const starIcon = i < rating ? filledStar : emptyStar;
      return React.createElement(starIcon, {
        key: i,
        color: "var(--mantine-color-yellow-2)",
        size: 12,
      });
    });
  };

  const imageArrangement = useSelector(
    (state: { list: { imageArrangement: string } }) =>
      state.list?.imageArrangement
  );

  return (
    <UnstyledButton onClick={onSelect}>
      <li className={styles.listContainer}>
        <Box
          style={{
            width: `${
              imageArrangement === "fullWidthImage" ? "100%" : "250px"
            }`,
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
                        <Text size="sm" c="dimmed">
                          {subHeadline}
                        </Text>
                        <Box>{generateStars(Number(starRating))}</Box>
                        <Text size="sm">{description}</Text>
                      </Box>
                    </Flex>
                  ) : (
                    <>
                      {IconComponent && (
                        <IconComponent
                          color="var(--mantine-color-dark-0)"
                          size={25}
                        />
                      )}
                    </>
                  )}
                </Overlay>
              </BackgroundImage>
            )}
          </AspectRatio>
        </Box>
        {imageArrangement === "leftAlignedImage" && (
          <Box m="lg">
            <Title order={4}>{headline}</Title>
            <Text size="sm" c="dimmed">
              {subHeadline}
            </Text>
            <Box>{generateStars(Number(starRating))}</Box>
            <Text size="sm">{description}</Text>
          </Box>
        )}
      </li>
    </UnstyledButton>
  );
};

export default Card;
