export const FAST_MODE = false;

export const FAST_FORMS = [
  {
    formName: "testSingleAllTypes",
    type: "single",
    presetKey: "default",
    steps: [
      {
        stepName: "main",
        fields: [
          {
            name: "first_name",
            label: "First Name",
            type: "text",
            required: true,
          },
          { name: "email", label: "Email", type: "email", required: true },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          },
          { name: "age", label: "Age", type: "number", required: false },
          {
            name: "birthdate",
            label: "Birthdate",
            type: "date",
            required: true,
          },
          { name: "website", label: "Website", type: "url", required: false },
          {
            name: "subscribe",
            label: "Subscribe",
            type: "checkbox",
            required: false,
          },
          {
            name: "gender",
            label: "Gender",
            type: "radio",
            required: true,
            options: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ],
          },
          {
            name: "country",
            label: "Country",
            type: "select",
            required: true,
            options: [
              { label: "USA", value: "usa" },
              { label: "UK", value: "uk" },
              { label: "UAE", value: "uae" },
            ],
          },
        ],
      },
    ],
  },

  // Multi-step form with all types split across steps
  {
    formName: "test",
    type: "multi",
    presetKey: "minimal", // stepperTop | minimal | sidebarStepper | softType
    steps: [
      {
        stepName: "personal",
        fields: [
          {
            name: "first_name",
            label: "First Name",
            type: "text",
            required: true,
          },
          { name: "email", label: "Email", type: "email", required: true },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          },
        ],
      },
      {
        stepName: "details",
        fields: [
          { name: "age", label: "Age", type: "number", required: false },
          {
            name: "birthdate",
            label: "Birthdate",
            type: "date",
            required: true,
          },
          { name: "website", label: "Website", type: "url", required: false },
        ],
      },
      {
        stepName: "preferences",
        fields: [
          {
            name: "subscribe",
            label: "Subscribe",
            type: "checkbox",
            required: false,
          },
          {
            name: "gender",
            label: "Gender",
            type: "radio",
            required: true,
            options: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ],
          },
          {
            name: "country",
            label: "Country",
            type: "select",
            required: true,
            options: [
              { label: "USA", value: "usa" },
              { label: "UK", value: "uk" },
              { label: "UAE", value: "uae" },
            ],
          },
        ],
      },
    ],
  },
];
