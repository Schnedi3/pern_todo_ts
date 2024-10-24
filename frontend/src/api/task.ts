import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import customAxios from "./axios";
import { toast } from "react-toastify";

export const useTask = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customAxios.get("/task");
      return data.result;
    },
  });
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => {
      return customAxios.post("/task", { text });
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ completed, id }: { completed: boolean; id: number }) => {
      return customAxios.put(`/task/complete/${id}`, { completed });
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ updatedText, id }: { updatedText: string; id: number }) => {
      return customAxios.put(`/task/update/${id}`, { updatedText });
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return customAxios.delete(`/task/${id}`);
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
