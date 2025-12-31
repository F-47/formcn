#!/usr/bin/env node

import { intro, outro, select } from "@clack/prompts";
import {
  askFormType,
  askFields,
  askFormName,
  askSteps,
  askFormTemplate,
  askFormPreset,
} from "../utils/prompts.js";
import { generateSingleForm } from "../generators/form-generator.js";
import { generateMultiForm } from "../generators/multi-form-generator.js";
import {
  singleFormPresets,
  multiFormPresets,
} from "../utils/tailwind-presets.js";
import {
  SINGLE_FIELD_TEMPLATES,
  MULTI_STEP_TEMPLATES,
} from "../utils/templates.js";
import { ensurePackages } from "../utils/ensurePackages.js";
import { toCapitalizedLabel } from "../utils/lib.js";

intro("formcn");

await ensurePackages();

const formName = await askFormName();
const formType = await askFormType();

const formTemplateChoice = await askFormTemplate(formType);

let presetKey;

if (formTemplateChoice === "template") {
  const isSingle = formType === "single";
  const templates = isSingle ? SINGLE_FIELD_TEMPLATES : MULTI_STEP_TEMPLATES;
  const presets = isSingle ? singleFormPresets : multiFormPresets;

  const templateKeys = Object.keys(templates);
  const templateChoice = await select({
    message: `Choose a ${isSingle ? "single" : "multi-step"} template:`,
    options: templateKeys.map((key) => ({
      value: key,
      label: toCapitalizedLabel(key),
    })),
  });

  presetKey = await askFormPreset(presets);

  if (isSingle) {
    await generateSingleForm({
      formName,
      fields: templates[templateChoice],
      presetKey,
    });
  } else {
    await generateMultiForm({
      formName,
      steps: templates[templateChoice],
      presetKey,
    });
  }
} else {
  if (formType === "single") {
    const fields = await askFields();
    presetKey = await askFormPreset(singleFormPresets);
    await generateSingleForm({ formName, fields, presetKey });
  } else {
    presetKey = await askFormPreset(multiFormPresets);
    const steps = await askSteps();
    await generateMultiForm({ formName, steps, presetKey });
  }
}

outro("✅ Form created successfully");
