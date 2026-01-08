export const SINGLE_FIELD_TEMPLATES = {
  registration: [
    { name: "first_name", type: "text", label: "First Name", required: true },
    { name: "last_name", type: "text", label: "Last Name", required: true },
    { name: "email", type: "email", label: "Email", required: true },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      confirm: true,
    },
  ],
  login: [
    { name: "email", type: "email", label: "Email", required: true },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      confirm: false,
    },
  ],
  contact: [
    { name: "full_name", type: "text", label: "Full Name", required: true },
    { name: "email", type: "email", label: "Email", required: true },
    { name: "subject", type: "text", label: "Subject", required: true },
    { name: "message", type: "textarea", label: "Message", required: true },
  ],
};

export const MULTI_STEP_TEMPLATES = {
  registration: [
    {
      stepName: "Personal Info",
      fields: [
        {
          name: "first_name",
          type: "text",
          label: "First Name",
          required: true,
        },
        { name: "last_name", type: "text", label: "Last Name", required: true },
        {
          name: "gender",
          type: "radio",
          label: "Gender",
          required: true,
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ],
        },
        { name: "birthdate", type: "date", label: "Birthdate", required: true },
      ],
    },
    {
      stepName: "Account Details",
      fields: [
        { name: "email", type: "email", label: "Email", required: true },
        {
          name: "password",
          type: "password",
          label: "Password",
          required: true,
        },
        {
          name: "password_confirmation",
          type: "password",
          label: "Confirm Password",
          required: true,
          isConfirmation: true,
          confirmationFor: "password",
        },
      ],
    },
    {
      stepName: "Contact Info",
      fields: [
        {
          name: "phone",
          type: "number",
          label: "Phone Number",
          required: true,
        },
        { name: "address", type: "text", label: "Address", required: true },
        { name: "city", type: "text", label: "City", required: true },
        {
          name: "country",
          type: "select",
          label: "Country",
          required: true,
          options: [
            { label: "United States", value: "us" },
            { label: "Canada", value: "ca" },
            { label: "United Kingdom", value: "uk" },
          ],
        },
      ],
    },
  ],
  survey: [
    {
      stepName: "General Questions",
      fields: [
        {
          name: "satisfaction",
          type: "radio",
          label: "How satisfied are you?",
          options: [
            { label: "Very satisfied", value: "5" },
            { label: "Satisfied", value: "4" },
            { label: "Neutral", value: "3" },
            { label: "Dissatisfied", value: "2" },
          ],
        },
      ],
    },
    {
      stepName: "Feedback",
      fields: [
        {
          name: "comments",
          type: "textarea",
          label: "Additional comments",
        },
      ],
    },
  ],
  jobApplication: [
    {
      stepName: "Personal Information",
      fields: [
        { name: "full_name", type: "text", label: "Full Name", required: true },
        { name: "email", type: "email", label: "Email", required: true },
        { name: "phone", type: "number", label: "Phone", required: true },
      ],
    },
    {
      stepName: "Professional Details",
      fields: [
        {
          name: "position",
          type: "text",
          label: "Position Applied For",
          required: true,
        },
        {
          name: "experience",
          type: "number",
          label: "Years of Experience",
          required: true,
        },
        {
          name: "employment_type",
          type: "radio",
          label: "Employment Type",
          required: true,
          options: [
            { label: "Full-time", value: "full_time" },
            { label: "Part-time", value: "part_time" },
            { label: "Freelance", value: "freelance" },
          ],
        },
      ],
    },
    {
      stepName: "Additional Info",
      fields: [
        {
          name: "portfolio",
          type: "text",
          label: "Portfolio URL",
          required: false,
        },
        { name: "cover_letter", type: "textarea", label: "Cover Letter" },
      ],
    },
  ],
};
