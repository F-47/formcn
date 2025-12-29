import { isCancel } from "@clack/prompts";

export function handleCancel(value) {
  if (isCancel(value)) {
    console.log("❌ Operation cancelled.");
    process.exit(0);
  }
}
