import { makeVar } from "@apollo/client";
import { Todo } from "./todo";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";

// state initialization
export const todoListVar = makeVar<Todo[]>([
  {
    id: "123",
    description: "finish tut",
    completed: false,
  },
]);

// methods for manipulating todo list below

// adding a todo
export const addTodo = (description: string) => {
  todoListVar(
    produce(todoListVar(), (draft) => {
      draft.push({
        id: uuidv4(),
        description,
        completed: false,
      });
    })
  );
};

// removing a todo
export const removeTodo = (index: number) => {
  todoListVar(
    produce(todoListVar(), (draft) => {
      draft.splice(index, 1);
    })
  );
};

// toggle completion state of todo
export const toggleComplete = (index: number) => {
  todoListVar(
    produce(todoListVar(), (draft) => {
      draft[index].completed = !draft[index].completed;
    })
  );
};
