import fs from "fs-extra";
import path from "path";
import { select, text, confirm, isCancel } from "@clack/prompts";
import { handleCancel } from "./cancel.js";
import { FIELD_TYPES } from "./fields.js";
import { toCapitalizedLabel } from "./lib.js";

export async function askFormName() {
  const baseDir = fs.existsSync(path.resolve("src"))
    ? path.resolve("src/components/forms")
    : path.resolve("components/forms");

  const formName = await text({
    message: "Form name (the component will be suffixed with 'Form')",
    placeholder: "register → RegisterForm",
    validate(value) {
      if (!value) return "Form name is required";

      if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
        return "Use only letters, numbers, dashes or underscores";
      }

      const formDir = path.join(baseDir, value);

      if (fs.pathExistsSync(formDir)) {
        return `A form named "${value}" already exists`;
      }
    },
  });
  handleCancel(formName);

  return formName;
}

export async function askFormType() {
  const result = await select({
    message: "Form type?",
    options: [
      { value: "single", label: "Single step" },
      { value: "multi", label: "Multi step" },
    ],
  });
  handleCancel(result);

  return result;
}

export async function askFormTemplate(formType) {
  const choice = await select({
    message: `Do you want a ready template for the ${formType} form, or create manually?`,
    options: [
      { value: "template", label: "Use ready template" },
      { value: "manual", label: "Create manually" },
    ],
  });
  handleCancel(choice);

  return choice;
}

export async function askFields() {
  const fields = [];

  while (true) {
    const type = await select({
      message: "Field type?",
      options: FIELD_TYPES,
    });
    handleCancel(type);

    const label = await text({
      message: 'Label (e.g. "First Name" → "first_name" as field name)',
      validate(value) {
        if (!value.trim()) return "Label cannot be empty.";
      },
    });
    handleCancel(label);

    const name = label.trim().toLowerCase().replace(/\s+/g, "_");

    const required = await confirm({ message: "Required?" });
    handleCancel(required);

    let options;

    if (type === "select" || type === "radio" || type === "choiceCard") {
      options = [];

      while (true) {
        const labelInput = await text({
          message: 'Option label? (e.g. "Active User" → "active_user")',
          validate(value) {
            const transformed = value.trim().toLowerCase().replace(/\s+/g, "_");
            if (!value.trim()) return "Option label cannot be empty.";
            if (options.some((o) => o.value === transformed))
              return `Option "${transformed}" already exists.`;
          },
        });
        handleCancel(labelInput);
        const label = labelInput
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

        const value = label.trim().toLowerCase().replace(/\s+/g, "_");

        options.push({ label, value });

        const more = await confirm({ message: "Add another option?" });
        if (isCancel(more) || !more) break;
      }
    }

    fields.push({
      type,
      name,
      label,
      required,
      options,
    });

    const addMore = await confirm({ message: "Add another field?" });
    if (isCancel(addMore) || !addMore) break;
  }

  return fields;
}

export async function askSteps() {
  const steps = [];

  while (true) {
    const stepName = await text({
      message: "Step name?",
      validate(value) {
        if (!value.trim()) return "Step Name cannot be empty.";
      },
    });

    handleCancel(stepName);

    console.log(`\nAdd fields for step: ${stepName}\n`);
    const fields = await askFields();

    steps.push({ stepName, fields });

    const addMoreSteps = await confirm({ message: "Add another step?" });
    if (isCancel(addMoreSteps) || !addMoreSteps) break;
  }

  return steps;
}

export async function askFormPreset(presets) {
  const choices = Object.keys(presets).map((key) => ({
    value: key,
    label: toCapitalizedLabel(key),
  }));
  const preset = await select({
    message: "Choose a form preset:",
    options: choices,
  });
  handleCancel(preset);

  return preset;
}
