export const INPUT_TEMPLATES = {
  textarea: (f) => `<Textarea
      {...field}
      id="${f.name}"
      rows={4}
      ${f.required ? "required" : ""}
      aria-invalid={fieldState.invalid}
    />`,

  select: (
    f
  ) => `<Select value={field.value ?? ""} onValueChange={field.onChange}>
    <SelectTrigger id="${f.name}" aria-invalid={fieldState.invalid}>
      <SelectValue placeholder="Select ${f.label}" />
    </SelectTrigger>
    <SelectContent>
      ${f.options
        .map(
          (opt) => `<SelectItem value="${opt.value}">${opt.label}</SelectItem>`
        )
        .join("\n    ")}
    </SelectContent>
  </Select>`,

  checkbox: (f) => `<FieldGroup data-slot="checkbox-group">
  <Field orientation="horizontal">
    <Checkbox
      id="${f.name}"
      name={field.name}
      checked={field.value}
      onCheckedChange={field.onChange}
      ${f.required ? "required" : ""}
    />
    <FieldLabel htmlFor="${f.name}" className="font-normal">
      ${f.label}
    </FieldLabel>
  </Field>
  </FieldGroup>`,

  radio: (
    f
  ) => `<RadioGroup  value={field.value ?? ""} onValueChange={(val) => field.onChange(val === "" ? undefined : val)}>
    ${f.options
      .map(
        (opt) => `<Field orientation="horizontal">
      <RadioGroupItem value="${opt.value}" id="${f.name}-${opt.value}" />
      <FieldLabel htmlFor="${f.name}-${opt.value}">${opt.label}</FieldLabel>
    </Field>`
      )
      .join("\n  ")}
  </RadioGroup>`,

  number: (f) => `<Input
    id="${f.name}"
    type="number"
    autoComplete="${f.autocomplete ?? "off"}"
    ${f.required ? "required" : ""}
    aria-invalid={fieldState.invalid}
    value={field.value ?? ""}
    onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
    onBlur={field.onBlur}
    ref={field.ref}
  />`,

  default: (f) => {
    const type = ["text", "email", "password", "date"].includes(f.type)
      ? f.type
      : "text";
    const defaultAutoComplete = {
      text: "off",
      email: "email",
      password: "new-password",
      date: "bday",
    }[type];
    return `<Input
          {...field}
          id="${f.name}"
          type="${type}"
          autoComplete="${f.autocomplete ?? defaultAutoComplete}"
          ${f.required ? "required" : ""}
          aria-invalid={fieldState.invalid}
      />`;
  },
};

export const COMPONENT_USAGE_MAP = {
  textarea: { Textarea: true },
  select: {
    Select: true,
    SelectTrigger: true,
    SelectValue: true,
    SelectContent: true,
    SelectItem: true,
  },
  checkbox: { Checkbox: true },
  radio: { RadioGroup: true, RadioGroupItem: true },
  default: { Input: true },
};

export function renderInputByType(f) {
  return INPUT_TEMPLATES[f.type]?.(f) || INPUT_TEMPLATES.default(f);
}

export function getComponentUsage(fields) {
  const usage = {};

  fields.forEach((f) => {
    const components =
      COMPONENT_USAGE_MAP[f.type] || COMPONENT_USAGE_MAP.default;
    Object.assign(usage, components);
  });

  return usage;
}

export function generateImports(uses = {}, mode = "single") {
  const importSet = new Set();

  const componentImports = {
    Input: `import { Input } from "@/components/ui/input";`,
    Textarea: `import { Textarea } from "@/components/ui/textarea";`, // <--- add this
    Select: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";`,
    Checkbox: `import { Checkbox } from "@/components/ui/checkbox";`,
    RadioGroup: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";`,
  };

  if (mode === "single") {
    importSet.add(`import { useForm, Controller } from "react-hook-form";`);
    importSet.add(`import { Button } from "@/components/ui/button";`);
    importSet.add(`import { zodResolver } from "@hookform/resolvers/zod";`);
    importSet.add(
      `import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";`
    );

    Object.entries(uses).forEach(([component, used]) => {
      if (used && componentImports[component])
        importSet.add(componentImports[component]);
    });
  }

  if (mode === "step") {
    importSet.add(
      `import { Controller, useFormContext } from "react-hook-form";`
    );
    importSet.add(
      `import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";`
    );

    Object.entries(uses).forEach(([component, used]) => {
      if (used && componentImports[component])
        importSet.add(componentImports[component]);
    });
  }

  if (mode === "multi") {
    importSet.add(`import { useForm, FormProvider } from "react-hook-form";`);
    importSet.add(`import { Button } from "@/components/ui/button";`);
    importSet.add(`import { zodResolver } from "@hookform/resolvers/zod";`);
  }

  return Array.from(importSet).join("\n");
}

export function getDefaultValue(field) {
  if (field.type === "checkbox") return `${field.name}: false`;
  if (
    field.type === "number" ||
    field.type === "select" ||
    field.type === "radio"
  )
    return `${field.name}: undefined`;
  return `${field.name}: ""`;
}

export function renderError() {
  return `
  {fieldState.invalid && (
    <FieldError className="text-left">
      {fieldState.error?.message}
    </FieldError>
  )}
  `;
}
