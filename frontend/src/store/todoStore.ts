import { create } from "zustand";

import { ITodoStore } from "../types/types";

export const useTodoStore = create<ITodoStore>((set) => ({
  todos: [],

  getTodos: (data) =>
    set(() => ({
      todos: data,
    })),

  addTodo: (task) =>
    set((state) => ({
      todos: [...state.todos, task],
    })),

  completeTodo: (id, task) =>
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? task : todo)),
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  updateTodo: (id, task) =>
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? task : todo)),
    })),
}));
