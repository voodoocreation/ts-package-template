#!/usr/bin/env node

import { createInterface } from "readline";

import { greet } from "./index.js";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is your name?\n", (answer) => {
  console.log(greet(answer));

  rl.close();
});
