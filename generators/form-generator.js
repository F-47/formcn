import fs from "fs-extra";
import path from "path";
import { generateZodSchema } from "./schema-generator.js";
import { toPascalCaseForm } from "../utils/lib.js";
import {
  generateImports,
  getComponentUsage,
  getDefaultValue,
  renderError,
  renderInputByType,
} from "./form-ui-templates.js";
import { singleFormPresets } from "../utils/tailwind-presets.js";
import { confirm, isCancel } from "@clack/prompts";

export async function generateSingleForm({ formName, fields, presetKey }) {
  const baseDir = fs.existsSync(path.resolve("src"))
    ? path.resolve("src/components/forms")
    : path.resolve("components/forms");

  const formDir = path.join(baseDir, formName);

  const exists = await fs.pathExists(formDir);

  if (exists) {
    const overwrite = await confirm({
      message: `Form "${formName}" already exists. Overwrite it?`,
      initialValue: false,
    });

    if (isCancel(overwrite) || !overwrite) {
      console.log("❌ Operation cancelled.");
      process.exit(0);
    }
    await fs.remove(formDir);
  }

  try {
    await fs.ensureDir(formDir);

    const enhancedFields = addPasswordConfirmation(fields);

    await fs.writeFile(
      path.join(formDir, "schema.ts"),
      generateZodSchema(enhancedFields)
    );

    await fs.writeFile(
      path.join(formDir, "form.tsx"),
      generateFormComponent(formName, enhancedFields, presetKey)
    );

    console.log(`✅ Form generated at ${formDir}`);
  } catch (error) {
    await fs.remove(formDir);
    console.error("❌ Failed to generate form. Changes reverted.");
    throw error;
  }
}

function addPasswordConfirmation(fields) {
  return fields.flatMap((field) =>
    field.type === "password" && field.confirm
      ? [
          field,
          {
            ...field,
            name: `${field.name}Confirmation`,
            label: "Confirm Password",
            isConfirmation: true,
            confirmationFor: field.name,
          },
        ]
      : field
  );
}

function generateFormComponent(formName, fields, presetKey) {
  const uses = getComponentUsage(fields);
  const componentName = toPascalCaseForm(formName);
  const preset = singleFormPresets[presetKey];
  if (!preset) throw new Error(`Single form preset "${presetKey}" not found`);

  const renderControllerContent = (f) => `
    <FieldLabel htmlFor="${f.name}">${f.label}${
    f.required ? ' <span className="text-red-500">*</span>' : ""
  }
</FieldLabel>
    ${renderInputByType(f)}
    ${renderError()}
  `;

  const renderFields = fields
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
                    ${renderControllerContent(f, false)}
                  </>
                `
                : `
                  <Field data-invalid={fieldState.invalid}>
                    ${renderControllerContent(f)}
                  </Field>
                `
            }
          )}
        />
      `;
    })
    .join("\n");

  return `
    "use client";
    
    ${generateImports(uses)}
    import { schema, type SchemaFormValues } from "./schema";
    
    export default function ${componentName}() {
      const form = useForm<SchemaFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
          ${fields.map(getDefaultValue).join(",\n      ")}
        },
      });
    
      function onSubmit(data: SchemaFormValues) {
        console.log(data);
      }
     
      return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="${preset.form}">
          <FieldGroup>
            ${renderFields}
          </FieldGroup>
          <div className="${preset.buttonsWrapper}">
            <Button type="submit" disabled={!form.formState.isValid}>
              Submit
            </Button>
          </div>
        </form>
      );
    }
    `.trim();
}
