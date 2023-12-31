import { execa } from "execa";
import inquirer, { QuestionCollection } from "inquirer";
import fs from "node:fs";
import path from "node:path";
import ora from "ora";
import { packages } from "./resources";

export type Template = "graphql" | "rest" | "simple";
export type PackageManager = "pnpm" | "npm" | "yarn";

export interface Options {
  projectName: string;
  template: Template;
  packageManager: PackageManager;
}

export const getInput = async (initialValues?: Options) => {
  const questions: QuestionCollection<Options>[] = [
    {
      name: "template",
      message: "Select a template",
      choices: ["graphql", "rest", "simple"],
      type: "list",
      default: "simple",
      when(answers) {
        return !answers.template && !initialValues?.template;
      },
      validate: () => {
        if (
          initialValues?.template === "graphql" ||
          initialValues?.template === "rest" ||
          initialValues?.template === "simple"
        ) {
          return true;
        }
        return "Please select a template";
      },
    },
    {
      name: "projectName",
      message: "Enter a project name",
      type: "input",
      default: "my-app",
      when(answers) {
        return !answers.projectName && !initialValues?.projectName;
      },
    },
    {
      name: "packageManager",
      message: "Select a package manager",
      askAnswered: true,
      choices: ["pnpm", "npm", "yarn"],
      type: "list",
      default: "pnpm",
      validate: () => {
        if (
          initialValues?.packageManager === "npm" ||
          initialValues?.packageManager === "pnpm" ||
          initialValues?.packageManager === "yarn"
        ) {
          return true;
        }
        return "Please select a package manager";
      },
    },
  ];
  const answers = await inquirer.prompt(questions);

  return answers;
};

export const createProject = (options: Options) => {
  const { projectName, packageManager } = options;
  const command = getPackageManager(packageManager);
  const execaProcess = execa(command, ["react-native", "init", projectName], {
    stdio: "inherit",
    shell: true,
  });

  execaProcess.on("exit", () => {
    const packageJsonPath = path.join(
      process.cwd(),
      projectName,
      "package.json"
    );
    const packageJson = require(packageJsonPath);
    copyTemplate(options);
    const newPackageJson = setScripts(options, packageJson);
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(newPackageJson, null, 2),
      "utf-8"
    );

    installPackages(options);
  });
};

export const getPackageManager = (packageManager: PackageManager) => {
  return packageManager === "pnpm"
    ? "pnpx"
    : packageManager === "yarn"
    ? "yarn"
    : "npx";
};

export const copyTemplate = (options: Options) => {
  const copingSpinner = ora("Coping template").start();
  const { template, projectName } = options;

  const templatePath = `./templates/rn-${template}/`;
  execa("cp", ["-a", templatePath, projectName]);
  copingSpinner.succeed();
};

export const getPackageList = (template: Template) => {
  switch (template) {
    case "graphql":
      return ["@apollo/client", "graphql", "graphql-ws", ...packages];
    case "rest":
      return ["axios", ...packages];
    default:
      return packages;
  }
};

export const setScripts = (options: Options, packageJson: any) => {
  const spinner = ora("Setting up scripts").start();
  const { packageManager } = options;

  const copyOfPackageJson = { ...packageJson };
  packageJson.scripts = {
    ...copyOfPackageJson.scripts,
    pod: "cd ios && pod install && cd ..",
    gradle: "cd android && ./gradlew clean && cd ..",
    clean: `${packageManager} gradle && ${packageManager} pod`,
    start: "react-native start --reset-cache",
  };

  spinner.succeed();
  return packageJson;
};

export const installPackages = (options: Options) => {
  const installSpinner = ora("Installing packages").start();
  const { packageManager, projectName } = options;
  const command = packageManager || "pnpm";
  const packages = getPackageList(options.template);
  execa(command, ["install", ...packages], {
    cwd: "./" + projectName,
    cleanup: true,
    stdio: "inherit",
  });
  installSpinner.succeed("Installed packages");
};
