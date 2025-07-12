"use client";
import { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "@/lib/listSlice";
import { updateListItems } from "@/lib/listSlice";

type Errors = {
  [key: string]: { message: string };
};

export default function ListItemModal({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const selectedItem = useSelector(
    (state: { list: { currentlySelectedItem: ListItem } }) =>
      state.list.currentlySelectedItem
  );
  const listId = useSelector(
    (state: { list: { id: string } }) => state.list.id
  );

  const {
    headline,
    subHeadline,
    description,
    imageUrl,
    id: itemId,
  } = selectedItem || {};

  const [inputValues, setInputValues] = useState<{
    headline: string;
    subHeadline: string;
    description: string;
    imageUrl?: string;
    errors: Errors;
  }>({
    headline: "",
    subHeadline: "",
    description: "",
    imageUrl: "",
    errors: {},
  });
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setInputValues((prev) => ({
        ...prev,
        headline: headline || "",
        subHeadline: subHeadline || "",
        description: description || "",
        imageUrl: imageUrl || "",
      }));
    }
  }, [selectedItem]);

  const buildUpdatePayload = () => {
    const fieldsToCompare = ["headline", "subHeadline", "description"];

    const diff: Record<string, any> = {};

    fieldsToCompare.forEach((key) => {
      const current = inputValues[key as keyof typeof inputValues];
      const original = selectedItem?.[key as keyof typeof selectedItem];

      if (current !== original) {
        diff[key] = current;
      }
    });

    if (selectedItem?.id) {
      diff.itemId = selectedItem.id;
    }

    return diff;
  };

  const handleItemUpdate = async () => {
    try {
      let payload = buildUpdatePayload();
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Failed to upload image");
        }

        const imageData = await uploadRes.json();
        payload.imageUrl = imageData.imageUrl;
      }

      const patchRes = await fetch(`/api/lists/${listId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!patchRes.ok) {
        throw new Error("Failed to update list item");
      }

      const updatedList = await patchRes.json();
      setSaveLoading(false);
      dispatch(updateListItems(updatedList));
      onClose();
      return updatedList;
    } catch (err) {
      console.error("Upload or update failed:", err);
      throw err;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    }
  };

  const handleOnChange = (event: React.SyntheticEvent): void => {
    const { value, name } = event.target as HTMLInputElement;
    setInputValues({
      ...inputValues,
      [name]: value,
      errors: { ...inputValues.errors, [name]: { message: "" } },
    });
  };

  const handleSave = (event: React.SyntheticEvent): void => {
    const errors: Errors = {};
    event.preventDefault();
    setSaveLoading(true);

    Object.entries(inputValues).forEach(([key, value]) => {
      if (typeof value === "string") {
        if (!value) {
          errors[key] = { message: `${key} is required` };
        }
      }
    });

    const noErrors = Object.keys(errors).length === 0;

    if (!noErrors) {
      setInputValues({ ...inputValues, errors });
    } else {
      handleItemUpdate();
    }
  };

  const isInvalid = (prop: string) => {
    const { errors } = inputValues;
    return Object.keys(errors).includes(prop);
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
        {preview || inputValues.imageUrl ? (
          <Image
            src={preview || inputValues.imageUrl}
            alt="Preview"
            height={200}
            fit="cover"
          />
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
              onChange={handleFileChange}
            />
          </label>
        </Overlay>
      </Box>
      <TextInput
        label="Headline"
        placeholder="Enter headline"
        value={inputValues.headline}
        onChange={handleOnChange}
        mb="md"
        error={isInvalid("headline") ? inputValues.errors?.title?.message : ""}
        name="headline"
      />
      <TextInput
        label="Subheadline"
        placeholder="Enter subheadline"
        value={inputValues.subHeadline}
        onChange={handleOnChange}
        mb="md"
        name="subHeadline"
        error={
          isInvalid("subHeadline")
            ? inputValues.errors?.subHeadline?.message
            : ""
        }
      />
      <Textarea
        label="Description"
        placeholder="Enter description"
        value={inputValues.description}
        onChange={handleOnChange}
        name="description"
        mb="md"
        error={
          isInvalid("description")
            ? inputValues.errors?.description?.message
            : ""
        }
      />
      <Group justify="right">
        <Button onClick={onClose} variant="default">
          Cancel
        </Button>
        <Button loading={saveLoading} onClick={handleSave}>
          Save
        </Button>
      </Group>
    </Modal>
  );
}
