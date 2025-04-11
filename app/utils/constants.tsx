import {
  IconNumber1,
  IconNumber2,
  IconNumber3,
  IconNumber4,
  IconNumber5,
  IconNumber6,
  IconSquareRoundedNumber1,
  IconSquareRoundedNumber2,
  IconSquareRoundedNumber3,
  IconPhoto,
  IconSquareCheck,
} from "@tabler/icons-react";

export const ICON_MAP = {
  IconNumber1: IconNumber1,
  IconNumber2: IconNumber2,
  IconNumber3: IconNumber3,
  IconNumber4: IconNumber4,
  IconNumber5: IconNumber5,
  IconNumber6: IconNumber6,
  IconSquareRoundedNumber1: IconSquareRoundedNumber1,
  IconSquareRoundedNumber2: IconSquareRoundedNumber2,
  IconSquareRoundedNumber3: IconSquareRoundedNumber3,
  IconPhoto: IconPhoto,
  IconSquareCheck: IconSquareCheck,
};

export interface ColumnContentMap {
  [key: string]: {
    type: string;
    iconGroup?: string[];
    headline?: string;
    subheadline?: string;
  };
}

export const COLUMN_CONTENT_MAP: ColumnContentMap = {
  basicNumberSet:  {
    type: "basicNumberSet",
    iconGroup: [
      "IconNumber1",
      "IconNumber2",
      "IconNumber3",
      "IconNumber4",
      "IconNumber5",
    ],
  },
  rankNumberSet: {
    type: "rankNumberSet",
    iconGroup: [
      "IconSquareRoundedNumber1",
      "IconSquareRoundedNumber2",
      "IconSquareRoundedNumber3",
      "IconSquareRoundedNumber4",
      "IconSquareRoundedNumber5",
    ],
  },
  imageSet: {
    type: "imageSet",
    iconGroup: [
      "IconPhoto",
      "IconPhoto",
      "IconPhoto",
      "IconPhoto",
      "IconPhoto",
    ],
  },
  checkboxSet: {
    type: "checkboxSet",
    iconGroup: [
      "IconSquareCheck",
      "IconSquareCheck",
      "IconSquareCheck",
      "IconSquareCheck",
      "IconSquareCheck",
    ],
  },
  oneLineSimpleText: {
    type: "oneLineSimpleText",
    headline: "One-line simple text",
  },
  twoLineSimpleText: {
    type: "twoLineSimpleText",
    headline: "Two-line simple text",
    subheadline: "Your second line goes here",
  },
  twoLineWithImage: {
    type: "twoLineWithImage",
    headline: "Two-line with image",
    subheadline: "Your second line goes here",
    iconGroup: [
      "IconPhoto",
      "IconPhoto",
      "IconPhoto",
      "IconPhoto",
      "IconPhoto",
    ],
  },
  starRating: {
    type: "starRating",
    iconGroup: [
      "IconStarFilled",
      "IconStarFilled",
      "IconStarFilled",
      "IconStar",
      "IconStar",
    ],
  }
};

export const CUSTOMIZE_PANEL = [
  {
    value: "backgroundColor",
    heading: "Background Color",
    colorSwatches: ["#009790", "#ffe8d5", "#f08080"],
  },
  {
    value: "oneColContent",
    heading: "1-col Content",
    dragItems: [
      {
        type: "basicNumberSet",
        iconGroup: ["IconNumber1", "IconNumber2", "IconNumber3"],
      },
      {
        type: "rankNumberSet",
        iconGroup: [
          "IconSquareRoundedNumber1",
          "IconSquareRoundedNumber2",
          "IconSquareRoundedNumber3",
        ],
      },
      {
        type: "imageSet",
        iconGroup: ["IconPhoto", "IconPhoto", "IconPhoto"],
      },
      {
        type: "checkboxSet",
        iconGroup: ["IconSquareCheck", "IconSquareCheck", "IconSquareCheck"],
      },
    ],
  },
  {
    value: "twoColContent",
    heading: "2-col Content",
    dragItems: [
      {
        type: "oneLineSimpleText",
        headline: "One-line simple text",
      },
      {
        type: "twoLineSimpleText",
        headline: "Two-line simple text",
        subheadline: "Your second line goes here",
      },
      {
        type: "twoLineWithImage",
        headline: "Two-line with image",
        subheadline: "Your second line goes here",
        iconGroup: [],
      },
      {
        type: "starRating",
        iconGroup: [],
      },
    ],
  },
];
