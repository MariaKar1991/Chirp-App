import { create } from "zustand";

interface RegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * A custom hook to manage the state of a registration modal.
 *
 * This hook provides functions to control the visibility of the registration modal.
 *
 * @returns {Object} An object containing the modal's open state and functions to open and close the modal.
 */
const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
