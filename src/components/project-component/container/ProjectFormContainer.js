import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectFormPresentation from "./ProjectFormPresentation";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const ProjectFormContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = (data, selectedUsers) => {
    // Handle form submission logic
    // ...

    // Example: Logging form data
    console.log("Form Data:", data);
  };

  // Additional logic for pre-populating data, validation, etc.
  // ...

  return (
    <ProjectFormPresentation
      id={id}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      reset={reset}
      watch={watch}
      onSubmit={onSubmit}
    />
  );
};

export default ProjectFormContainer;
