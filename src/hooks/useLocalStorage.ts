import { useState, useEffect } from "react";

export const useLocalStorage = <T>(todoList: string, initialList: T) => {
  const [storedList, setStoredList] = useState(() => {
    try {
      const item = window.localStorage.getItem(todoList);
      return item ? JSON.parse(item) : initialList;
    } catch (error) {
      console.error(error);
      return initialList;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(todoList, JSON.stringify(storedList));
    } catch (error) {
      console.error(error);
    }
  }, [todoList, storedList]);

  return [storedList, setStoredList];
};
