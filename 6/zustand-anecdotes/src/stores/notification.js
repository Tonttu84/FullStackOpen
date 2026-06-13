import { create } from "zustand";

const useNotification = create((set) => ({
  notification: null,
  type: null,

  setNotification: (text, type) => {
    set({
      notification: text,
      type: type,
    });

    setTimeout(() => {
      set({
        notification: null,
        type: null,
      });
    }, 5000);
  },
}));

export default useNotification;