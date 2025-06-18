import React from "react";
import { ActionIcon } from "@mantine/core";
import {
  IconTableShare,
} from "@tabler/icons-react";

const ListGenerateAction: React.FC = ({}) => {
  const generate = async () => {
    const res = await fetch("/api/screenshot?url=http:localhost:3000");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "screenshot.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <ActionIcon pos="absolute" right="20px" top="20px" onClick={generate} size={42} variant="default" aria-label="Share list">
      <IconTableShare size={24} />
    </ActionIcon>
  );
};

export default ListGenerateAction;
