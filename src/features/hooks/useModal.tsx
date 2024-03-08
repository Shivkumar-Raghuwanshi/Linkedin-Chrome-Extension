import { useCallback, useRef, useState } from "react";

interface AIModalState {
  isOpen: boolean;
  userInput: string;
  aiResponse: string;
  isGenerating: boolean;
  showGeneratingWindow: boolean;
  isClicked: boolean;
}

/*
 * Custom hook to manage the state of the AI modal.
 * @returns {[AIModalState, { openModal: () => void, closeModal: () => void, updateUserInput: (e: React.ChangeEvent<HTMLInputElement>) => void, generateAIResponse: () => void, regenerateAIResponse: () => void, setState: React.Dispatch<React.SetStateAction<AIModalState>> }]}
 */
export const useModalState = () => {
  const [state, setState] = useState<AIModalState>({
    isOpen: false,
    userInput: "",
    aiResponse: "",
    isGenerating: false,
    showGeneratingWindow: false,
    isClicked: false,
  });

  const openModal = useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: true }));
  }, []);

  const closeModal = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isOpen: false,
      showGeneratingWindow: false,
      isClicked: false,
    }));
  }, []);

  const updateUserInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({ ...prevState, userInput: e.target.value }));
    },
    []
  );

  const generateAIResponse = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isGenerating: true,
      showGeneratingWindow: true,
      aiResponse:
        "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
    }));
  }, []);

  const regenerateAIResponse = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isGenerating: true,
      aiResponse:
        "Here's a regenerated response: I'd be happy to assist you further with any other questions or tasks you might have.",
    }));
  }, []);

  return [
    state,
    {
      openModal,
      closeModal,
      updateUserInput,
      generateAIResponse,
      regenerateAIResponse,
      setState,
    },
  ] as const;
};

/*
 * Custom hook to handle modal events and actions.
 * @param state The current state of the AI modal.
 * @param handlers Object containing modal state handlers.
 * @returns {Object} Object containing modal event handlers and utility functions.
 */
export const useModalHandlers = (
  state: AIModalState,
  handlers: {
    openModal: () => void;
    closeModal: () => void;
    updateUserInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    generateAIResponse: () => void;
    regenerateAIResponse: () => void;
    setState: React.Dispatch<React.SetStateAction<AIModalState>>;
  }
) => {
  const messageInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = useCallback(() => {
    handlers.setState((prevState) => ({ ...prevState, isClicked: true }));
    handlers.openModal();
  }, [handlers.openModal, handlers.setState]);

  const handleInputChange = handlers.updateUserInput;

  const handleGenerate = handlers.generateAIResponse;

  const handleRegenerate = handlers.regenerateAIResponse;

  const handleInsert = useCallback(() => {
    const messageInput = document.querySelector(
      '.msg-form__contenteditable[aria-label="Write a message…"]'
    );
    const sendButton = document.querySelector(".msg-form__send-button");
    const placeholderElement = document.querySelector(".msg-form__placeholder");

    if (messageInput && sendButton && placeholderElement) {
      (placeholderElement as HTMLDivElement).style.display = "none";
      (messageInput as HTMLDivElement).textContent = state.aiResponse;
      (sendButton as HTMLButtonElement).removeAttribute("disabled");
    } else {
      console.error("Failed to find required elements");
    }

    handlers.closeModal();
  }, [state.aiResponse, handlers.closeModal]);

  return {
    messageInputRef,
    handleClick,
    handleInputChange,
    handleGenerate,
    handleRegenerate,
    handleInsert,
  };
};