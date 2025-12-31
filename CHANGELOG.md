# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2025-12-19

### Added

- **New Field Types**:
  - `switch` - Toggle switch component for boolean values
  - `choiceCard` - Card-based selection component for radio-style choices
- **New Multi-Step Form Templates**:
  - `survey` - Multi-step survey form with satisfaction ratings and feedback sections
  - `jobApplication` - Professional job application form with personal info, professional details, and additional info sections

### Changed

- **CLI UX Improvement**: Updated template and preset selection to display labels in Capitalized Words with spaces instead of camelCase or kebab-case
  - Reused `toCapitalizedLabel` helper function for consistent display of template and preset names in terminal prompts
  - Single-step and multi-step forms now show cleaner, more readable option labels in CLI prompts
  - No functional changes to underlying template keys or form generation logic

### Technical Details

- Template selection in `bin/index.js` now uses `toCapitalizedLabel` for display labels
- Preset selection in `utils/prompts.js` consistently applies `toCapitalizedLabel` helper
- All template and preset keys remain unchanged internally; only display formatting improved
- New field types fully integrated with schema generation and form component templates

---

## [1.0.1] - Initial Release

### Features

- Zero-configuration form generation
- Type-safe schemas using Zod
- shadcn/ui component integration
- Single-step and multi-step forms
- Schema-first validation
- Interactive CLI workflow
- Automatic dependency detection and installation
- Predefined templates for common use cases
