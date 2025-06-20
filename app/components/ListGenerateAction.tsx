import React from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { IconTableShare, IconEdit } from "@tabler/icons-react";
import TitleAndDescriptionModal from "./modals/TitleAndDescription";
import { handleModalOpen } from "@/lib/listSlice";

const ListGenerateAction: React.FC = ({}) => {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(
    (state: { list: { modalOpen: boolean } }) => state.list?.modalOpen
  );

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
    <>
      <TitleAndDescriptionModal
        opened={modalIsOpen}
        onClose={() => dispatch(handleModalOpen(false))}
      />
      <ActionIcon.Group mt="lg">
        <Tooltip label="Generate list" position="top" withArrow>
          <ActionIcon
            onClick={generate}
            variant="default"
            size="lg"
            aria-label="Generate list"
          >
            <IconTableShare size={20} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Edit title and description" position="top" withArrow>
          <ActionIcon
            onClick={() => dispatch(handleModalOpen(true))}
            variant="default"
            size="lg"
            aria-label="Edit title and description"
          >
            <IconEdit size={20} />
          </ActionIcon>
        </Tooltip>
      </ActionIcon.Group>
    </>
  );
};

export default ListGenerateAction;
