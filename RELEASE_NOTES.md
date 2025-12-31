# Release Notes - v1.0.2

## 🎉 New Features

### New Field Types

We've added two new field types to expand form capabilities:

- **Switch** - Toggle switch component for boolean values
- **Choice Card** - Card-based selection component for radio-style choices

Both field types are now available in the interactive CLI when creating forms manually or using templates.

### New Multi-Step Form Templates

Two new ready-to-use templates have been added for multi-step forms:

- **Survey** - Multi-step survey form with satisfaction ratings and feedback
  - Step 1: General Questions (satisfaction rating)
  - Step 2: Feedback (additional comments)
- **Job Application** - Professional job application form with multiple sections
  - Step 1: Personal Information (name, email, phone)
  - Step 2: Professional Details (position, experience, employment type)
  - Step 3: Additional Info (portfolio URL, cover letter)

These templates provide quick starting points for common form use cases and can be customized as needed.

## 🎨 CLI UX Improvements

### Enhanced Display Labels

We've improved the CLI experience by making template and preset names more readable in the terminal. All option labels now display in **Capitalized Words with spaces** instead of technical camelCase or kebab-case formats.

**Before:**

```
Choose a single template:
❯ registration
  login
  contact

Choose a form preset:
❯ sidebarStepper
  softType
  stepperTop
```

**After:**

```
Choose a single template:
❯ Registration
  Login
  Contact

Choose a form preset:
❯ Sidebar Stepper
  Soft Type
  Stepper Top
```

### Changes Made

- ✅ Added **Switch** and **Choice Card** field types
- ✅ Added 2 new multi-step form templates (Survey, Job Application)
- ✅ Reused `toCapitalizedLabel` helper function for consistent label formatting
- ✅ Applied formatting to both template and preset selection prompts
- ✅ Improved readability for single-step and multi-step form options
- ✅ No breaking changes - all internal keys remain unchanged

### Technical Notes

- Template keys (e.g., `registration`, `login`) remain the same internally
- Preset keys (e.g., `sidebarStepper`, `softType`) remain unchanged
- Only the display labels in CLI prompts have been updated
- New field types integrate seamlessly with existing form generation logic
- Form generation logic and functionality are unaffected

---

**Version:** 1.0.2  
**Release Date:** December 31, 2025
**Type:** Minor Feature Release + UX Improvement
