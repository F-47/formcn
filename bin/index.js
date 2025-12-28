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

intro("formcn");

await ensurePackages();

const formName = await askFormName();
const formType = await askFormType();

const formTemplateChoice = await askFormTemplate(formType);

let presetKey;

if (formTemplateChoice === "template") {
  if (formType === "single") {
    const templateKeys = Object.keys(SINGLE_FIELD_TEMPLATES);
    const templateChoice = await select({
      message: "Choose a template:",
      options: templateKeys.map((key) => ({ value: key, label: key })),
    });
    presetKey = await askFormPreset(singleFormPresets);
    await generateSingleForm({
      formName,
      fields: SINGLE_FIELD_TEMPLATES[templateChoice],
      presetKey,
    });
  } else {
    const templateKeys = Object.keys(MULTI_STEP_TEMPLATES);
    const templateChoice = await select({
      message: "Choose a template:",
      options: templateKeys.map((key) => ({ value: key, label: key })),
    });
    presetKey = await askFormPreset(multiFormPresets);
    await generateMultiForm({
      formName,
      steps: MULTI_STEP_TEMPLATES[templateChoice],
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
