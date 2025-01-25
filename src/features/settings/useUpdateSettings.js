import { useMutation } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: function (field) {
      updateSetting(field);
    },
    mutationKey: ["settings"],
    onSuccess: () => {
      toast.success("Settings updated successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateSettings, isUpdating };
}
