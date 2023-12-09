import fs from "fs";
import { describe, expect, it } from "vitest";
import {
  Options,
  copyTemplate,
  getPackageList,
  getPackageManager,
  setScripts,
} from "../src/utils";

describe("utils", () => {
  it("should create project directory and copy template", () => {
    const options: Options = {
      projectName: "my-app",
      packageManager: "pnpm",
      template: "simple",
    };
    copyTemplate(options);
    const exists = fs.existsSync("my-app");
    expect(exists).toBe(true);
  });

  it("should return package list simple template", async () => {
    const packages = await getPackageList("simple");

    expect(packages).not.contain("graphql");
    expect(packages).not.contain("axios");
  });

  it("should return package list for graphql template", async () => {
    const packages = await getPackageList("graphql");

    expect(packages).contain("graphql");
  });

  it("should return package list for rest template", async () => {
    const packages = await getPackageList("rest");

    expect(packages).contain("axios");
  });

  it("should return package manager command with pnpx", () => {
    const command = getPackageManager("pnpm");
    expect(command).toBe("pnpx");
  });

  it("should return package manager command with npx", () => {
    const command = getPackageManager("npm");
    expect(command).toBe("npx");
  });

  it("should return package manager command with yarn", () => {
    const command = getPackageManager("yarn");
    expect(command).toBe("yarn");
  });

  it("should set scripts", () => {
    const options: Options = {
      projectName: "my-app",
      packageManager: "pnpm",
      template: "simple",
    };
    const packageJson = {
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
      },
    };

    const newPackageJson = setScripts(options, packageJson);

    expect(newPackageJson.scripts).toHaveProperty("start");
    expect(newPackageJson.scripts).toHaveProperty("pod");
    expect(newPackageJson.scripts).toHaveProperty("gradle");
  });
});
