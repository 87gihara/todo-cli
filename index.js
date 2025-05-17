#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";
import path from "path";
import chalk from "chalk";

const DB = path.resolve(".todos.json");

const load = () =>
  fs.existsSync(DB) ? JSON.parse(fs.readFileSync(DB)) : [];

const save = (todos) => fs.writeFileSync(DB, JSON.stringify(todos, null, 2));

program
  .command("add <task>")
  .description("タスクを追加")
  .action((task) => {
    const todos = load();
    todos.push({ id: Date.now(), task, done: false });
    save(todos);
    console.log(chalk.green("✔ Added:"), task);
  });

program
  .command("list")
  .description("一覧表示")
  .action(() => {
    load().forEach((t, i) =>
      console.log(
        `${i + 1}. ${t.done ? chalk.strikethrough(t.task) : t.task}`
      )
    );
  });

program
  .command("done <num>")
  .description("完了フラグを付与")
  .action((num) => {
    const todos = load();
    const idx = num - 1;
    if (todos[idx]) {
      todos[idx].done = true;
      save(todos);
      console.log(chalk.blue("✔ Marked done:"), todos[idx].task);
    }
  });

program
  .command("del <num>")
  .description("削除")
  .action((num) => {
    const todos = load();
    const removed = todos.splice(num - 1, 1);
    save(todos);
    console.log(chalk.red("✖ Deleted:"), removed[0]?.task);
  });

program.parse();
