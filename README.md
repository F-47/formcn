# formcn

[![npm version](https://img.shields.io/npm/v/formcn.svg)](https://www.npmjs.com/package/formcn)
[![npm downloads](https://img.shields.io/npm/dw/formcn.svg)](https://www.npmjs.com/package/formcn)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Schema-driven React form generator built on top of React Hook Form, Zod, and shadcn/ui.

formcn generates fully typed, validated React form components from an interactive CLI workflow.
It is designed to reduce boilerplate while staying aligned with shadcn/ui conventions.

---

## Features

- Zero-configuration form generation
- Type-safe schemas using Zod
- shadcn/ui component integration
- Single-step and multi-step forms
- Schema-first validation
- Interactive CLI workflow
- Automatic dependency detection and installation
- Predefined templates for common use cases

---

## Prerequisites

Before using formcn, ensure you have:

- Node.js 18+
- A React project with TypeScript
- shadcn/ui initialized in your project

Initialize shadcn/ui if needed:

```bash
npx shadcn@latest init
```

---

## Installation

Install globally using npm:

```bash
npm install -g formcn
```

Or using yarn:

```bash
yarn global add formcn
```

Or run directly with npx:

```bash
npx formcn
```

---

## Usage

Run the CLI:

```bash
formcn
```

The interactive workflow will guide you through:

1. Form name
2. Form type (single-step or multi-step)
3. Template selection
4. Field definitions and validation rules
5. Style preset selection

### Example

```bash
$ formcn

formcn

✔ react-hook-form detected
✔ @hookform/resolvers detected
✔ zod detected
✔ shadcn/ui components detected

Form name: register
Form type: single step
Template: registration
Preset: default

✔ Form generated at src/components/forms/register
```

---

## Generated Output

### Single-step form

```txt
src/components/forms/{formName}/
├── schema.ts
└── form.tsx
```

### Multi-step form

```txt
src/components/forms/user-registration/
├── personal-info-schema.ts
├── personalInfoStep.tsx
├── account-details-schema.ts
├── accountDetailsStep.tsx
├── contact-info-schema.ts
├── contactInfoStep.tsx
└── UserRegistrationForm.tsx
```

---

## Supported Field Types

- Text
- Email
- Password (with optional confirmation)
- Number
- URL
- Textarea
- Select
- Checkbox
- Radio
- Date

---

## Templates

### Single-step

- Registration
- Login
- Contact

### Multi-step

- Registration (personal info, account details, contact info)

---

## Style Presets

### Single-step

- `default` — minimal layout with subtle borders and spacing

### Multi-step

- `minimal`
- `sidebarStepper`
- `softType`
- `stepperTop`

---

## Example Output

### Schema (`schema.ts`)

```ts
import { z } from "zod";

export const schema = z
  .object({
    first_name: z.string().min(1, "First Name is required"),
    last_name: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirmation: z.string(),
    age: z.coerce.number().min(18, "Age must be at least 18"),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    bio: z.string().optional(),
    country: z.union([z.literal("us"), z.literal("ca"), z.literal("uk")], {
      error: "Please select a country",
    }),
    newsletter: z.boolean().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type SchemaFormValues = z.infer<typeof schema>;
```

### Form (`form.tsx`)

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { schema, type SchemaFormValues } from "./schema";

export default function RegisterForm() {
  const form = useForm<SchemaFormValues>({
    resolver: zodResolver(schema),
  });

  function onSubmit(values: SchemaFormValues) {
    console.log(values);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-auto border rounded-lg p-6"
    >
      <FieldGroup />
      <div className="flex justify-end">
        <Button type="submit" disabled={!form.formState.isValid}>
          Submit
        </Button>
      </div>
    </form>
  );
}
```

---

## Troubleshooting

### Command not found

Ensure your global npm bin directory is in your PATH:

```bash
npm config get prefix
```

### shadcn/ui not detected

```bash
npx shadcn@latest init
```

### Missing dependencies

```bash
npm install react-hook-form @hookform/resolvers zod
```

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a pull request

---

## License

MIT License

---

## Author

**Fares Galal**

---

## Acknowledgments

- React Hook Form
- Zod
- shadcn/ui
- Tailwind CSS
- TypeScript
