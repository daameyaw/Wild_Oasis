import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteABooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),

    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { deleteABooking, isDeletingBooking };
}
