import {
  parse as yamlParse,
  stringify as yamlStringify,
} from 'https://deno.land/std@0.82.0/encoding/yaml.ts';

class todoDAO {

    #fileName: any;
    #todoList: any;
    listIcon: string = "✀ ";
    todoIcon: string = "✗";
    doneIcon: string = "✔";
    flushIcon: string = "⌫";
    addIcon: string = "+";
    deleteIcon: string = "-";

    constructor(newFileName: string) {
        this.#fileName = newFileName;
    }

    #setUpTodoList = async () => {
        this.#todoList = await yamlParse(await Deno.readTextFile(this.#fileName));
    }

    printList = async (topMessage: string) => {
        await this.#setUpTodoList();
        console.log(`${this.listIcon} ${this.#fileName} ${topMessage}`)
        this.#todoList?.todo.forEach((todo: any)=>console.log(`	${this.todoIcon} ${todo}`))
        //✀✔✗
        //
        this.#todoList?.done.forEach((done: any)=>console.log(`	${this.doneIcon} ${done}`))
    }

    #write = async (operation: () => void, topMessage: string) => {
        await this.#setUpTodoList();
        operation();
        await Deno.writeTextFile(this.#fileName, yamlStringify(this.#todoList))
        this.printList(topMessage);
    }

    addTodo = async (newTodo: string) => {
        await this.#write(
            ()=>{this.#todoList.todo.push(newTodo);},
            `  + Added \"${newTodo}\"`
        )
    }

    // a "markMultipleAsDone" func is next
    markAsDone = async (todoID: number) => {
        await this.#write(
            ()=>{
                    this.#todoList.todo.splice(todoID, 1).forEach(
                        (markedAsDone: string) => {this.#todoList.done.push(markedAsDone)}
                    );
            },
            `  ${this.doneIcon} Marked \"${todoID}\" as \"done\"`
        )
    }

    flushDones = async () => {
        await this.#write(
            ()=>{this.#todoList.done = new Array(0)},
            `  ${this.flushIcon} Flushed items marked as \"done\"`
        )
    }
}

const dao = new todoDAO("todos.yaml")
dao.listIcon = ""
dao.todoIcon = ""
dao.doneIcon = ""
dao.flushIcon = ""
dao.addIcon = ""
dao.deleteIcon = ""

dao.printList("");
dao.addTodo("Make sure this works well");
dao.markAsDone(3);
dao.flushDones();
