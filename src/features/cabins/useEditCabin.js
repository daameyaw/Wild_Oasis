import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: function ({ newCabinData, id }) {
      createEditCabin(newCabinData, id);
    },
    mutationKey: ["cabins"],
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin successfully updated");
      //   reset();
    },
    onError: function (err) {
      toast.error(err.message);
    },
  });

  return { editCabin, isEditing };
}
