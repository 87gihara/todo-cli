import fs from "fs";
import { execSync } from "child_process";

test("add command creates a todo", () => {
  fs.rmSync(".todos.json", { force: true });
  execSync('node index.js add "test"');
  const db = JSON.parse(fs.readFileSync(".todos.json"));
  expect(db[0].task).toBe("test");
});
