import type { Entity } from "@/types/types"
import axiosInstance from "@/api/axiosInstance"
import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query"

const useMutationHook = () => {
  const queryClient = useQueryClient()

  const postData = async <T extends Entity>(newData: T, baseString: string): Promise<T> => {
    const { data } = await axiosInstance.post(`/${baseString}`, newData)
    return data
  }

  const putUpdateData = async <T extends Entity>(newData: T, baseString: string): Promise<T> => {
    const { data } = await axiosInstance.put(`/${baseString}/${newData.id}`, newData)
    return data
  }

  const deleteData = async (id: string, baseString: string): Promise<void> => {
    await axiosInstance.delete(`/${baseString}/${id}`)
  }

  const patchUpdateData = async <T extends Entity>(newData: T, baseString: string): Promise<T> => {
    const { data } = await axiosInstance.patch(`/${baseString}/${newData.id}`, newData)
    return data
  }

  const usePostMutation = <T extends Entity>(baseString: string): UseMutationResult<T, Error, T> => {
    return useMutation<T, Error, T>({
      mutationFn: (newData: T) => postData<T>(newData, baseString),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [baseString] })
      },
    })
  }

  const usePutMutation = <T extends Entity>(baseString: string): UseMutationResult<T, Error, T> => {
    return useMutation<T, Error, T>({
      mutationFn: (newData: T) => putUpdateData(newData, baseString),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [baseString] })
      },
    })
  }

  const useDeleteMutation = (baseString: string): UseMutationResult<void, Error, string> => {
    return useMutation<void, Error, string>({
      mutationFn: (id: string) => deleteData(id, baseString),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [baseString] })
      },
    })
  }

  const usePatchMutation = <T extends Entity>(baseString: string): UseMutationResult<T, Error, T> => {
    return useMutation<T, Error, T>({
      mutationFn: (newData: T) => patchUpdateData(newData, baseString),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [baseString] })
      },
    })
  }

  return { usePostMutation, usePutMutation, useDeleteMutation, usePatchMutation }
}

export default useMutationHook;

