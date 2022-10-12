<p align="middle">
  <img width="300" src="https://i.imgur.com/QNMbMJu.png"/>
</p>

# yodo v0.5.0

Pronounced "You-do", yodo is a simple CLI tool to read and execute CRUD operations on YAML files representing todo lists.

### why

I just want to create a simple todo list that I can easily take a peek from the terminal to track my progress without having to leave Neovim. No internet, no apps, no smartphone, nothing. Just a command in my terminal.

### the name sucks

I know. It stands for "YAML todo". I had a better name but forgot what it stood for so I'm sticking to "yodo", which has a simple meaning and is written the same as iodine (the halogen) in spanish.

### roadmap

v1.0
- [x] Read todos from file [Done in API and program] (`yodo` command)
- [x] Add todo [Done in API and program] (`yodo add` command)
- [x] Mark todo as done [Done in API and program] (`yodo do` command)
- [x] Flush items marked as "done" [Done in API and program] (`yodo flush` command)
- [x] Flush todos [Done in API and program] (`yodo --todos/-t flush` command)
- [ ] Customizable bullet-points/icons when reading todos [Done in API] (`yodo.conf.ts`)
- [ ] Show todos' numbers (`yodo.conf.ts: todo-number`)

v1.x
- [ ] Marking "done" items as "todo" (undoing dones) v1.1 (`yodo undo` command)
- [ ] Delete specific todos v1.2 (`yodo delete t#` command)
- [ ] Delete specific items marked as done v1.3 (`yodo delete d#` command)
- [ ] Mark multiple todos as done in a single command v1.4 (`yodo do --bulk #,#,#,#` command)
- [ ] Flush mode (flush "done" items every time a todo is deleted)
- [ ] Show dones' IDs (`yodo.conf.ts: todo-number`)

v2.0
- [ ] Basic todo read is now achieved through the `yodo read` command
- [ ] TUI with normie bindings (`yodo` command, which is a breaking change)

v2.x
- [ ] Modal editing/Vim bindings (Insert Mode, Todo Mode) v2.1
