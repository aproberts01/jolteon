import {
  IconNumber1,
  IconNumber2,
  IconNumber3,
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
  IconSquareRoundedNumber1: IconSquareRoundedNumber1,
  IconSquareRoundedNumber2: IconSquareRoundedNumber2,
  IconSquareRoundedNumber3: IconSquareRoundedNumber3,
  IconPhoto: IconPhoto,
  IconSquareCheck: IconSquareCheck,
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
