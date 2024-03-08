import { useEffect, useRef, useState } from "react";
import GeneratingWindow from "./components/GeneratingWindow";
import NotGeneratingWindow from "./components/NotGeneratingWindow";
import AIButton from "./components/ai-button";

interface AIModalProps {}

interface AIModalState {
  isOpen: boolean;
  userInput: string;
  aiResponse: string;
  isGenerating: boolean;
  showGeneratingWindow: boolean;
}

export const AIModal: React.FC<AIModalProps> = () => {
  const [state, setState] = useState<AIModalState>({
    isOpen: false,
    userInput: "",
    aiResponse: "",
    isGenerating: false,
    showGeneratingWindow: false,
  });
  const [isClicked, setIsClicked] = useState(false);
  const messageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleFocus = () => {
      setState({ ...state, isOpen: true });
    };
    const handleBlur = () => {
      setState({ ...state, isOpen: false });
    };
    const messageInput = messageInputRef.current;
    if (messageInput) {
      messageInput.addEventListener("focus", handleFocus);
      messageInput.addEventListener("blur", handleBlur);
    }
    return () => {
      if (messageInput) {
        messageInput.removeEventListener("focus", handleFocus);
        messageInput.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  const openModal = () => {
    setState({ ...state, isOpen: true });
  };

  const closeModal = () => {
    setState({ ...state, isOpen: false, showGeneratingWindow: false });
    setIsClicked(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, userInput: e.target.value });
  };

  const handleGenerate = () => {
    setState({
      ...state,
      isGenerating: true,
      showGeneratingWindow: true,
      aiResponse:
        "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
    });
  };

  const handleInsert = () => {
    const messageInput = document.querySelector(
      '.msg-form__contenteditable[aria-label="Write a message…"]'
    ) as HTMLDivElement;
    const sendButton = document.querySelector(
      ".msg-form__send-button"
    ) as HTMLButtonElement;
    const placeholderElement = document.querySelector(
      ".msg-form__placeholder"
    ) as HTMLDivElement;
    if (messageInput && sendButton && placeholderElement) {
      placeholderElement.style.display = "none";
      messageInput.textContent = state.aiResponse;
      sendButton.removeAttribute("disabled");
    }
    closeModal();
  };

  const handleClick = () => {
    setIsClicked(true);
    openModal();
  };

  return (
    <>
     <AIButton isClicked={isClicked} onClick={handleClick} />
      {state.isOpen && (
        <div
          className="modal fixed inset-0 bg-gray-500 bg-opacity-50"
          onClick={closeModal}
        >
          <div 
          className={`modal-content fixed left-1/2 transform -translate-x-1/2 ${
            state.showGeneratingWindow
              ? "top-[50px]"
              : "top-1/2 -translate-y-1/2"
          }`}
          onClick={(e) => e.stopPropagation()}
          >
            {!state.showGeneratingWindow && (
              <NotGeneratingWindow
                userInput={state.userInput}
                handleInputChange={handleInputChange}
                handleGenerate={handleGenerate}
                messageInputRef={messageInputRef}
              />
            )}
            {state.showGeneratingWindow && (
              <GeneratingWindow
                userInput={state.userInput}
                aiResponse={state.aiResponse}
                handleInputChange={handleInputChange}
                handleInsert={handleInsert}
                messageInputRef={messageInputRef}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};