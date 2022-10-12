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

    printListWithTodoNumbers = async (topMessage: string) => {
        await this.#setUpTodoList();
        console.log(`${this.listIcon} ${this.#fileName} ${topMessage}`)
        this.#todoList?.todo.forEach((todo: any, index: number)=>console.log(`	${this.todoIcon} ${todo}`))
        this.#todoList?.done.forEach((done: any)=>console.log(`	${this.doneIcon} ${done}`))
    }

    #write = async (operation: () => void, topMessage: string) => {
        await this.#setUpTodoList();
        operation();
        await Deno.writeTextFile(this.#fileName, yamlStringify(this.#todoList))
        await this.printList(topMessage);
    }

    addTodo = async (newTodo: string) => {
        await this.#write(
            ()=>{this.#todoList.todo.push(newTodo);},
            `  ${this.addIcon} Added \"${newTodo}\"`
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
            ()=>{this.#todoList.done = []},
            `  ${this.flushIcon} Flushed items marked as \"done\"`
        )
    }

    flushTodos = async () => {
        await this.#write(
            ()=>{this.#todoList.todo = []},
            `  ${this.flushIcon} Flushed \"todo\" items`
        )
    }

}

export default todoDAO;

// const main = async () => {
//     const dao = new todoDAO("todos.yaml")
//     dao.listIcon = ""
//     dao.todoIcon = ""
//     dao.doneIcon = ""
//     dao.flushIcon = ""
//     dao.addIcon = ""
//     dao.deleteIcon = ""
//     
//     //all operations must be awaited inside an async function to make sure they work
//     await dao.printList("");
//     await dao.addTodo("Make sure this works well");
//     await dao.markAsDone(3);
//     await dao.flushDones();
// }
// 
// main();
