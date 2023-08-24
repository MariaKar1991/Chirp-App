import { create } from "zustand";

/**
 * Represents the state and actions for controlling an edit modal's visibility.
 */
interface EditModalStore {
  /**
   * Indicates whether the edit modal is currently open or not.
   */
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * A custom hook that uses Zustand to manage the state of an edit modal's visibility.
 *
 * @returns {EditModalStore} An object containing state and actions for controlling
 * the edit modal's visibility.
 */
const useEditModal = create<EditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditModal;
