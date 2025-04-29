import React from "react";
import { Drawer } from "@mantine/core";
import RowCarousel from "./RowCarousel";

const BottomDetailsDrawer: React.FC<{ open: boolean; close?: () => void }> = ({
  open,
  close,
}) => {
  return (
    <Drawer
      position="bottom"
      opened={open}
      onClose={close || (() => {})}
      title="Row detail drawer"
    >
      <RowCarousel />
    </Drawer>
  );
};

export default BottomDetailsDrawer;
