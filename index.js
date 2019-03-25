#!/usr/bin/env node
"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const resume = require("./resume.json");

const response = chalk.bold.green;
const resumePrompts = {
  type: "list",
  name: "resumeOptions",
  message: "What would you like to know about me?",
  choices: [...Object.keys(resume), "Exit"]
};

const main = () => {
  console.log(`Hello, I'm Jagadees and welcome to my resume`);
  resumeHandler();
};

const resumeHandler = () => {
  inquirer.prompt(resumePrompts).then(answer => {
    if (answer.resumeOptions === "Exit") {
      return;
    }

    const option = answer.resumeOptions;
    console.log(response("--------------------------"));
    resume[`${option}`].forEach(info => {
      console.log(response("|   => " + info));
    });
    console.log(response("--------------------------"));

    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Go Back", "Exit"]
      })
      .then(choice => {
        if (choice.exitBack === "Go Back") {
          resumeHandler();
        } else {
          return;
        }
      });
  });
};

main();
