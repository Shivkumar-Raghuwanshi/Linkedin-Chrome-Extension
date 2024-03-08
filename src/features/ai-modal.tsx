import React, { useCallback, useRef, useState } from "react";
import GeneratingWindow from "./components/GeneratingWindow";
import NotGeneratingWindow from "./components/NotGeneratingWindow";
import AIButton from "./components/ai-button";
import { useModalState, useModalHandlers } from "./hooks/useModal";

interface AIModalProps {}

export const AIModal: React.FC<AIModalProps> = () => {
  const [state, handlers] = useModalState();
  const modalHandlers = useModalHandlers(state, handlers);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target as Node)
      ) {
        setIsModalOpen(false);
        handlers.setState((prevState) => ({ ...prevState, isClicked: false }));
      }
    },
    [handlers]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      modalHandlers.handleInputChange(e);
    },
    [modalHandlers.handleInputChange]
  );

  const handleGenerate = useCallback(() => {
    modalHandlers.handleGenerate();
  }, [modalHandlers.handleGenerate]);

  const handleInsert = useCallback(() => {
    modalHandlers.handleInsert();
    setIsModalOpen(false);
  }, [modalHandlers.handleInsert, handlers]);

  const handleButtonClick = useCallback(() => {
    setIsModalOpen(true);
    handlers.setState((prevState) => ({ ...prevState, isClicked: true }));
  }, [handlers]);

  return (
    <>
      <AIButton isClicked={state.isClicked} onClick={handleButtonClick} />
      {isModalOpen && (
        <div
          className="modal fixed inset-0 bg-gray-500 bg-opacity-50"
          onClick={handleModalClick}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`modal-content fixed left-1/2 transform -translate-x-1/2 ${
              state.showGeneratingWindow
                ? "top-[50px]"
                : "top-1/2 -translate-y-1/2"
            }`}
            role="document"
            ref={modalContentRef}
          >
            {!state.showGeneratingWindow && (
              <NotGeneratingWindow
                userInput={state.userInput}
                handleInputChange={handleInputChange}
                handleGenerate={handleGenerate}
              />
            )}
            {state.showGeneratingWindow && (
              <GeneratingWindow
                userInput={state.userInput}
                aiResponse={state.aiResponse}
                handleInputChange={handleInputChange}
                handleInsert={handleInsert}
                handleRegenerate={modalHandlers.handleRegenerate}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};