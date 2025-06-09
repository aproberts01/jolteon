import "@mantine/core/styles.css";
import React from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { theme } from "../theme";

export const metadata = {
  title: "⚡Jolty",
  description: "Build beautiful lists with Jolty",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/jolteon_sprite.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
        <body>
          <MantineProvider defaultColorScheme="dark" theme={theme}>{children}</MantineProvider>
        </body>
    </html>
  );
}
