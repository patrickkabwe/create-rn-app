#! /usr/bin/env node

import { Command } from "commander";
import packageJson from "../package.json";
import { Options, createProject, getInput } from "./utils";

const program = new Command("@kazion/create-rn-app");

program
  .command("init")
  .description("initialize a new react native project")
  .version(
    "v" + packageJson.version,
    "-v, --version",
    "output the version number"
  )
  .option("-n, --projectName <projectName>", "name of the project")
  .option("-t, --template <template>", "template to use")
  .option("-p, --packageManager <packageManager>", "package manager to use")

  .action(async (args: Options) => {
    let answers: Options;
    if (!args.template || !args.packageManager || !args.projectName) {
      answers = await getInput(args);
      answers = { ...answers, ...args };
    } else {
      answers = args;
    }

    createProject(answers);
  });

program.parse(process.argv);
