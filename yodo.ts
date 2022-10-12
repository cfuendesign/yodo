import { Command } from "https://deno.land/x/cliffy@v0.25.2/command/mod.ts";
import todoDAO from "./todoDAO.ts";

await new Command()
  // Main command.
  .name("yodo")
  .version("0.5.0")
  .description("A simple YAML-based todo list manager")
  .arguments("<fileName:string>")
  .action((options, fileName) => {
    const dao = new todoDAO(fileName);
    dao.printList("")
  })
  .command("add")
  .description("Adds a new todo\n(Adds an item to the \"todo\" section of the list)")
  .arguments("<fileName:string> <newTodo:string>")
  .action((options, fileName, newTodo) => {
    const dao = new todoDAO(fileName);
    dao.addTodo(newTodo)
  })
  .command("do")
  .description("Marks a todo as done\n(Moves a \"todo\" item to the \"done\" section of the list)\ntodoNumber is the number that identifies the todo you want to mark as done, starting from 0 (The first todo in the list is 0)")
  .arguments("<fileName:string> <todoNumber:number>")
  .action((options, fileName, todoNumber) => {
    const dao = new todoDAO(fileName);
    dao.markAsDone(todoNumber)
  })
  .command("flush")
  .description("Clears items marked as done\n(Deletes all items in the \"done\" section of the list)")
  .option("-t, --todos", "Flush todos")
  .arguments("<fileName:string>")
  .action((options, fileName) => {
    const dao = new todoDAO(fileName);
    options.todos ? dao.flushTodos() : dao.flushDones()
  })
  .parse(Deno.args);
