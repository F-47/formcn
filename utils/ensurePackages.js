import { confirm } from "@clack/prompts";
import { execSync } from "child_process";
import { createRequire } from "module";
import { join } from "path";
import fs from "fs";

export async function ensurePackages() {
  const packages = ["react-hook-form", "@hookform/resolvers", "zod"];
  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  let allInstalled = true;

  for (const pkg of packages) {
    let installed = true;
    try {
      const require = createRequire(join(process.cwd(), "package.json"));
      require.resolve(pkg);
      console.log(`✅ ${pkg} is already installed`);
    } catch {
      installed = false;
      allInstalled = false;
    }

    if (!installed) {
      const install = await confirm({
        message: `${pkg} is not installed. Do you want to install it?`,
        initialValue: true,
      });

      if (install) {
        console.log(`Installing ${pkg}...`);
        execSync(`${npmCmd} install ${pkg}`, { stdio: "inherit" });
        console.log(`✅ ${pkg} installed successfully!`);
      } else {
        console.warn(`⚠️ ${pkg} is required for this CLI.`);
      }
    }
  }

  const componentsJsonPath = join(process.cwd(), "components.json");

  if (fs.existsSync(componentsJsonPath)) {
    console.log("✅ ShadCN components detected");
  } else {
    const setup = await confirm({
      message:
        "ShadCN components not found (components.json missing). Did you run 'npx shadcn@latest init'?",
      initialValue: true,
    });

    if (setup) {
      console.log(
        "Please run 'npx shadcn@latest init' to set up components before using this CLI."
      );
    } else {
      console.warn("⚠️ ShadCN is required for generating forms.");
    }
  }

  if (allInstalled) {
    console.log("\n🎉 All required packages are already installed!");
  }
}
