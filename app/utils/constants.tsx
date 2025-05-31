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
  IconSquareRoundedNumber4,
  IconSquareRoundedNumber5,
  IconPhoto,
  IconSquareCheck,
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
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
  IconSquareRoundedNumber4: IconSquareRoundedNumber4,
  IconSquareRoundedNumber5: IconSquareRoundedNumber5,
  IconStarFilled: IconStarFilled,
  IconStar: IconStar,
  IconStarHalfFilled: IconStarHalfFilled,
  IconPhoto: IconPhoto,
  IconSquareCheck: IconSquareCheck,
};

export const COLUMN_AMOUNT: number = 3;
export const JOLTY_VERSION: number = 2;

export interface ColumnContentMap {
  [key: string]: {
    type: string;
    iconGroup?: string[] | string[][];
    headline?: string;
    subheadline?: string;
  };
}

export const COLUMN_CONTENT_MAP: ColumnContentMap = {
  basicNumberSet: {
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
      [
        "IconStarFilled",
        "IconStarFilled",
        "IconStarFilled",
        "IconStarHalfFilled",
        "IconStar",
      ],
      [
        "IconStarFilled",
        "IconStarFilled",
        "IconStarFilled",
        "IconStarHalfFilled",
        "IconStar",
      ],
      [
        "IconStarFilled",
        "IconStarFilled",
        "IconStarFilled",
        "IconStarHalfFilled",
        "IconStar",
      ],
      [
        "IconStarFilled",
        "IconStarFilled",
        "IconStarFilled",
        "IconStarHalfFilled",
        "IconStar",
      ],
      [
        "IconStarFilled",
        "IconStarFilled",
        "IconStarFilled",
        "IconStarHalfFilled",
        "IconStar",
      ],
    ],
  },
};

export const CUSTOMIZE_PANEL = [
  {
    value: "backgroundColor",
    heading: "Background Color",
    colorSwatches: ["#009790", "#ffe8d5", "#f08080"],
  },
  {
    value: "basicListContent",
    heading: "Basic List Content",
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
    value: "dynamicListContent",
    heading: "Dynamic content",
    dragItems: [
      {
        type: "oneLineSimpleText",
        headline: "One-line simple text",
      },
      {
        type: "twoLineSimpleText",
        headline: "Two-line simple text",
        subheadline: "Second line goes here",
      },
      {
        type: "twoLineWithImage",
        headline: "Two-line with image",
        subheadline: "Second line goes here",
        iconGroup: [],
      },
      {
        type: "starRating",
        iconGroup: [
          "IconStarFilled",
          "IconStarFilled",
          "IconStarFilled",
          "IconStarHalfFilled",
          "IconStar",
        ],
      },
    ],
  },
];

export const NEW_CUSTOMIZE_PANEL = [
  {
    value: "title",
    heading: "Title & Description",
  },
  {
    value: "backgroundColor",
    heading: "Background Color",
    colorSwatches: ["#009790", "#ffe8d5", "#f08080"],
  },
  {
    value: "listIcons",
    heading: "List Icons",
    items: [
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
    value: "imageArrangement",
    heading: "Image Arrangement",
    items: [
      {
        type: "leftAlignedImage",
      },
      {
        type: "fullWidthImage",
      }
    ],
  },
];
