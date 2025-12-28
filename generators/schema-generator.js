import { toPascalCaseForm } from "../utils/lib.js";

export function generateZodSchema(fields, schemaName = "schema") {
  const getLabel = (field) => field.label || field.name;

  const TYPE_SCHEMAS = {
    email: (f) =>
      f.required
        ? `z.email("Invalid email")`
        : `z.email("Invalid email").optional().or(z.literal(""))`,

    password: (f) =>
      f.required
        ? `z.string().min(8, "Password must be at least 8 characters")`
        : `z.string().min(8).optional()`,

    number: (f) =>
      f.required
        ? `z.number({ error: "${getLabel(f)} is required" })`
        : `z.number().optional()`,

    phone: (f) =>
      f.required
        ? `z.coerce.number({ error: "${getLabel(f)} is required" })`
        : `z.coerce.number().optional()`,

    checkbox: (f) =>
      f.required
        ? `z.boolean().refine(val => val === true, "${getLabel(
            f
          )} must be checked")`
        : `z.boolean().optional()`,

    date: (f) =>
      f.required
        ? `z.string().min(1, "${getLabel(f)} is required")`
        : `z.string().optional()`,

    select: (f) => {
      const options = f.options
        .map((o) => `z.literal("${o.value}")`)
        .join(", ");
      return f.required
        ? `z.union([${options}], { error: "Please select ${getLabel(f)}" })`
        : `z.union([${options}]).optional()`;
    },

    url: (f) =>
      f.required
        ? `z.url("Invalid URL")`
        : `z.url("Invalid URL").optional().or(z.literal(""))`,

    default: (f) =>
      f.required
        ? `z.string().min(1, "${getLabel(f)} is required")`
        : `z.string().optional()`,
  };

  const getSchema = (field) => {
    if (field.isConfirmation) return TYPE_SCHEMAS.default(field);
    return (TYPE_SCHEMAS[field.type] || TYPE_SCHEMAS.default)(field);
  };

  const shape = fields.map((f) => `${f.name}: ${getSchema(f)}`).join(",\n");

  const passwordRefinements = fields
    .filter((f) => f.isConfirmation)
    .map(
      (f) => `
  .refine((data) => data.${f.confirmationFor} === data.${f.name}, {
    message: "Passwords do not match",
    path: ["${f.name}"],
  })`
    )
    .join("");

  const typeName = `${toPascalCaseForm(schemaName)}Values`;

  return `
import { z } from "zod";

export const ${schemaName} = z
  .object({
${shape},
  })${passwordRefinements};

export type ${typeName} = z.infer<typeof ${schemaName}>;
`.trim();
}
