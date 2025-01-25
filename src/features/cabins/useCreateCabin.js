import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: function (newCabin) {
      createEditCabin(newCabin);
    },
    mutationKey: ["cabins"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin has been created");
    },
    onError: function (err) {
      toast.error(err.message);
    },
  });

  return { isCreating, createCabin };
}
