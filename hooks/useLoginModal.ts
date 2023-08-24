import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * A custom hook to manage the state of a login modal.
 *
 * This hook provides functions to control the visibility of the login modal:
 * - `isOpen`: Indicates whether the login modal is currently open.
 * - `onOpen`: Opens the login modal.
 * - `onClose`: Closes the login modal.
 *
 * @returns {Object} An object containing functions to manage the login modal state.
 */
const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
