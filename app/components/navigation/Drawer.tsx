import React from "react";
import { Drawer } from "@mantine/core";

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
      Future drawer content will go here
    </Drawer>
  );
};

export default BottomDetailsDrawer;
