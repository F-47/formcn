import fs from "fs-extra";
import path from "path";
import {
  toCamelCaseForm,
  toKebabCaseForm,
  toPascalCaseForm,
} from "../utils/lib.js";
import {
  generateImports,
  getComponentUsage,
  getDefaultValue,
  renderError,
  renderInputByType,
} from "./form-ui-templates.js";
import { generateZodSchema } from "./schema-generator.js";
import { multiFormPresets } from "../utils/tailwind-presets.js";
import { prepareFormDir } from "../utils/prepareFormDir.js";

export async function generateMultiForm({ formName, steps, presetKey }) {
  if (!Array.isArray(steps)) {
    throw new Error("steps must be an array");
  }

  const formDir = await prepareFormDir(formName);

  try {
    await fs.ensureDir(formDir);

    const stepMetas = [];

    for (const step of steps) {
      const stepFileName = toCamelCaseForm(step.stepName);
      const stepComponentName = `${toPascalCaseForm(step.stepName)}Step`;
      const schemaName = `${stepFileName}Schema`;

      await fs.writeFile(
        path.join(formDir, `${toKebabCaseForm(step.stepName)}-schema.ts`),
        generateZodSchema(step.fields, schemaName)
      );

      const uses = getComponentUsage(step.fields);

      const stepComponentContent = `
    "use client";
    
    ${generateImports(uses, "step")}
    import type {${toPascalCaseForm(
      schemaName
    )}Values } from "./${toKebabCaseForm(step.stepName)}-schema";
    
    export default function ${stepComponentName}() {
    const form = useFormContext<${toPascalCaseForm(schemaName)}Values>();
    
      return (
        <FieldGroup>
          ${step.fields
            .map((f) => {
              const isCheckbox = f.type === "checkbox";

              return `
            <Controller
              name="${f.name}"
              control={form.control}
              render={({ field, fieldState }) => (
                ${
                  isCheckbox
                    ? `
                <>
                  ${renderInputByType(f)}
                  ${renderError()}
                </>
                `
                    : `
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="${f.name}">${f.label}${
                        f.required
                          ? ' <span className="text-red-500">*</span>'
                          : ""
                      }
                  </FieldLabel>
                  ${renderInputByType(f)}
                  ${renderError()}
                </Field>
                `
                }
              )}
            />
            `;
            })
            .join("\n")}
        </FieldGroup>
      );
    }
    `.trim();

      await fs.writeFile(
        path.join(formDir, `${stepFileName}Step.tsx`),
        stepComponentContent
      );

      stepMetas.push({
        id: stepFileName,
        title: step.stepName,
        component: stepComponentName,
        schema: schemaName,
        fields: step.fields,
      });
    }

    let formComponentName = toPascalCaseForm(formName);
    if (!formComponentName.endsWith("Form")) {
      formComponentName += "Form";
    }

    const schemaImports = stepMetas
      .map(
        (s) => `import { ${s.schema} } from "./${toKebabCaseForm(s.schema)}";`
      )
      .join("\n");

    const stepImports = stepMetas
      .map(
        (s) => `import ${s.component} from "./${toCamelCaseForm(s.title)}Step";`
      )
      .join("\n");

    const combinedSchema = stepMetas
      .map((s) => s.schema)
      .join(".and(")
      .concat(")".repeat(stepMetas.length - 1));

    const allFields = stepMetas.flatMap((s) => s.fields);

    const formUses = getComponentUsage(allFields);

    const preset = multiFormPresets[presetKey];
    if (!preset)
      throw new Error(`Single form preset "${formPreset}" not found`);

    const stepperTemplate = preset.stepper;

    const formContent = `
"use client";

  import { useState } from "react";
  import { z } from "zod";
  
  ${schemaImports}
  ${stepImports}
  ${generateImports(formUses, "multi")}

const fullFormSchema = ${combinedSchema};
export type FullFormData = z.infer<typeof fullFormSchema>;

export default function ${formComponentName}() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const form = useForm({
    resolver: zodResolver(fullFormSchema),
    mode: "onChange",
    defaultValues: {
      ${allFields.map(getDefaultValue).join(",\n      ")}
    },
  });

  const steps = ${JSON.stringify(
    stepMetas.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
    })),
    null,
    2
  )};

  const stepSchemas = [${stepMetas.map((s) => s.schema).join(", ")}];
  const stepComponents = [${stepMetas.map((s) => s.component).join(", ")}];

  const CurrentStep = stepComponents[currentStep];
  ${
    presetKey === "minimal" || presetKey === "softType"
      ? `const currentStepData = steps[currentStep];`
      : ""
  }

  async function next() {
    const schema = stepSchemas[currentStep];
    const fields = Object.keys(schema.shape) as (keyof FullFormData)[];
    const valid = await form.trigger(fields);
    if (valid) setCurrentStep((s) => s + 1);
  }

  function prev() {
    setCurrentStep((s) => s - 1);
  }

  function onSubmit(data: FullFormData) {
    console.log("Submitted:", data);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="${preset.form}">
         ${stepperTemplate} 
         <div className="${preset.step ?? ""}">
         <CurrentStep />
 
         <div className="${preset.buttonsWrapper}">
            <Button type="button" onClick={prev} disabled={currentStep === 0}>
              Previous
            </Button>
           {currentStep < steps.length - 1 && (
             <Button type="button" onClick={next}>
               Next
             </Button>
           )}
           {currentStep === steps.length - 1 && <Button type="submit">Submit</Button>}
         </div>
         </div>
      </form>
    </FormProvider>
  );
}
`.trim();

    await fs.writeFile(
      path.join(formDir, `${formComponentName}.tsx`),
      formContent
    );

    console.log(`✅ Multi-step form generated at ${formDir}`);
  } catch (error) {
    await fs.remove(formDir);
    console.error("❌ Failed to generate multi-step form. Changes reverted.");
    throw error;
  }
}
