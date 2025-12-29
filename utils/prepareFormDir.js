import fs from "fs-extra";
import path from "path";
import { confirm, isCancel } from "@clack/prompts";

export async function prepareFormDir(formName) {
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

    handleCancel(overwrite);

    if (!overwrite) {
      console.log("❌ Operation cancelled.");
      process.exit(0);
    }

    await fs.remove(formDir);
  }

  return formDir;
}
