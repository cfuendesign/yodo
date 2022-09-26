import {
  parse as yamlParse,
  stringify as yamlStringify,
} from 'https://deno.land/std@0.82.0/encoding/yaml.ts';
import { Command, EnumType } from "https://deno.land/x/cliffy@v0.25.0/command/mod.ts";

// https://www.woolha.com/tutorials/deno-read-and-write-yaml-files-examples

let globalFileName: any;
let todoList: any;

const printList = (topMessage: string) => {
    console.log(`✀ ${globalFileName}\n ${topMessage}`)
    todoList.todo?.forEach((todo: any)=>console.log(`	✗ ${todo}`))
    //✀✔✗
    //
    todoList.done?.forEach((done: any)=>console.log(`	✔ ${done}`))
}

await new Command()
  .name("yodo")
  .version("0.1.0")
  .description("Simple YAML-Based todo list manager"
            +"\n<fileName> is the name of the YAML file containing the todo data you want to work with")
  .arguments("<fileName:string>")
  .action(async (options, fileName) => {
    globalFileName = fileName;
	  todoList = await yamlParse(await Deno.readTextFile(globalFileName));
    printList("");
  })
  .command("add", "Adds a todo to the list")
  .arguments("<newTodo:string>")
  .action(async (options, ...args) => {
    //globalFileName = options.file;
	  todoList = await yamlParse(await Deno.readTextFile(globalFileName));
    todoList.todo.push(args[0], globalFileName);
    await Deno.writeTextFile(globalFileName, yamlStringify(todoList))

    printList(` added "${newTodo}"`);
  })
  .parse(Deno.args);
