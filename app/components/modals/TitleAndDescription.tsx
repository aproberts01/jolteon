import React, { useState } from "react";
import { Modal, TextInput, Textarea, Button, Group, Stack } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { updateTitleAndDescription } from "@/lib/listSlice";

type Errors = {
  [key: string]: { message: string };
};

interface TitleAndDescriptionModalProps {
  opened: boolean;
  onClose: () => void;
  initialTitle?: string;
  initialDescription?: string;
  onSave?: (title: string, description: string) => void;
}

const TitleAndDescriptionModal: React.FC<TitleAndDescriptionModalProps> = ({
  opened,
  onClose,
  initialTitle = "",
  initialDescription = "",
  onSave,
}) => {
  const dispatch = useDispatch();
  const storeTitle = useSelector(
    (state: { list: { title: string } }) => state.list.title
  );
  const storeDescription = useSelector(
    (state: { list: { description: string } }) => state.list.description
  );
  const listId = useSelector(
    (state: { list: { id: string } }) => state.list.id
  );

  const [inputValues, setInputValues] = useState<{
    title: string;
    description: string;
    errors: Errors;
  }>({
    title: storeTitle || "",
    description: storeDescription || "",
    errors: {},
  });
  const [saveLoading, setSaveLoading] = useState(false);

  const handleOnChange = (event: React.SyntheticEvent): void => {
    const { value, name } = event.target as HTMLInputElement;
    setInputValues({
      ...inputValues,
      [name]: value,
      errors: { ...inputValues.errors, [name]: { message: "" } },
    });
  };

  async function updateList() {
    const { title, description } = inputValues;
    try {
      const res = await fetch(`/api/lists/${listId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Failed to update list");

      const updated = await res.json();

      dispatch(
        updateTitleAndDescription({
          title: updated.title,
          description: updated.description,
        })
      );
      onClose()
    } catch (error) {
      console.error("Error updating list:", error);
      throw error;
    }
  }

  const handleSave = (event: React.SyntheticEvent): void => {
    const errors: Errors = {};
    event.preventDefault();
    setSaveLoading(true)

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
      updateList();
    }
  };

  const isInvalid = (prop: string) => {
    const { errors } = inputValues;
    return Object.keys(errors).includes(prop);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Title and Description">
      <Stack>
        <TextInput
          label="Title"
          name="title"
          placeholder="Enter title"
          value={inputValues.title}
          onChange={handleOnChange}
          error={isInvalid("title") ? inputValues.errors.title.message : ""}
        />
        <Textarea
          label="Description"
          name="description"
          placeholder="Enter description"
          value={inputValues.description}
          onChange={handleOnChange}
          error={
            isInvalid("description")
              ? inputValues.errors.description.message
              : ""
          }
        />
      </Stack>
      <Group mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button loading={saveLoading} onClick={handleSave}>Save</Button>
      </Group>
    </Modal>
  );
};

export default TitleAndDescriptionModal;
