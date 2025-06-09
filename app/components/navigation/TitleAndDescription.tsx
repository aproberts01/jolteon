'use client';
import React, { useState } from "react";
import { Fieldset, TextInput, Textarea, Button, Stack } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { updateTitleAndDescription } from "@/lib/listSlice";

type Errors = {
  [key: string]: { message: string };
};

const TitleAndDescription: React.FC = () => {
  const dispatch = useDispatch();
  const storeTitle = useSelector(
    (state: { list: { title: string } }) => state.list.title
  );
  const storeDescription = useSelector(
    (state: { list: { description: string } }) => state.list.description
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
      dispatch(updateTitleAndDescription({ title: inputValues.title, description: inputValues.description }));
    }
  };

  const isInvalid = (prop: string) => {
    const { errors } = inputValues;
    return Object.keys(errors).includes(prop);
  };

  return (
    <Fieldset my="xs" legend="Title and Description">
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
        <Button onClick={handleSave}>Save</Button>
      </Stack>
    </Fieldset>
  );
};

export default TitleAndDescription;
