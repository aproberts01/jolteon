"use client";
import { use, useState } from "react";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Group,
  Image,
  Box,
  Overlay,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { ListItem } from "@/lib/listSlice";

export default function ListItemModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const selectedItem = useSelector(
    (state: { list: { currentlySelectedItem: ListItem } }) =>
      state.list.currentlySelectedItem
  );
  const listId = useSelector(
    (state: { list: { id: string } }) => state.list.id
  );

  const { headline, subHeadline, description, imageUrl, starRating, id: itemId } =
    selectedItem || {};

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload image");
      }

      const { imageUrl } = await uploadRes.json();

      const patchRes = await fetch(`/api/lists/${listId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl, itemId }),
      });

      if (!patchRes.ok) {
        throw new Error("Failed to update list imageUrl");
      }

      const updatedList = await patchRes.json();
      
      return updatedList;
    } catch (err) {
      console.error("Upload or update failed:", err);
      throw err;
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit List Item"
      centered
      size="lg"
    >
      <Box
        pos="relative"
        mb="md"
        style={{
          border: "1px solid var(--mantine-color-gray-6)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt="Preview" height={200} fit="cover" />
        ) : (
          <Box
            h={200}
            bg="gray.1"
            display="flex"
            style={{ textAlign: "center" }}
          ></Box>
        )}

        <Overlay style={{ zIndex: 1 }} center opacity={1}>
          <label htmlFor="image-upload">
            <Button
              leftSection={<IconUpload size={16} />}
              component="span"
              variant="light"
              color="blue"
            >
              Upload Image
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </label>
        </Overlay>
      </Box>
      <TextInput
        label="Headline"
        placeholder="Enter headline"
        value={headline}
        onChange={(e) => {}}
        mb="md"
      />
      <TextInput
        label="Subheadline"
        placeholder="Enter subheadline"
        value={subHeadline}
        onChange={(e) => {}}
        mb="md"
      />
      <Textarea
        label="Description"
        placeholder="Enter description"
        value={description}
        onChange={(e) => {}}
        mb="md"
      />
      <Group justify="right">
        <Button onClick={onClose} variant="default">
          Cancel
        </Button>
        <Button
          onClick={() =>
            console.log({ headline, subHeadline, description, imageUrl })
          }
        >
          Save
        </Button>
      </Group>
    </Modal>
  );
}
