import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoadidng: isDeleting, mutate: deletecabin } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    //with only the mutstionFn the ui won't be in sync with the changes,we must add the onSuccess stuff
    onSuccess: () => {
      toast.success("Successfully deleted cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletecabin };
}
