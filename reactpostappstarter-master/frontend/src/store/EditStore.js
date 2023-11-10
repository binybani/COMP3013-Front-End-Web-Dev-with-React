import { create } from "zustand";

export const useEditStore = create((set) => ({
  isEditing: false,
  setIsEditing: () =>
    set((state) => ({
      isEditing: !state.isEditing,
    })),
  editedList: {},
  setEditedList: () => set({ editedList: {} }),
  editPost: (val) =>
    set(() => ({
      editedList: {
        id: val.id,
        title: val.title,
        category: val.category,
        image: val.image,
        content: val.content,
      },
    })),
}));
