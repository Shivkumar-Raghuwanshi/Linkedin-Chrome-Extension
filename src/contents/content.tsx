import cssText from "data-text:~style.css"
import React, { useState, useEffect } from "react";
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import { AIModal } from "~features/ai-modal"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector(`.msg-form__contenteditable[aria-label="Write a message…"]`);
  
const PlasmoOverlay = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const inputField = document.querySelector(
      `.msg-form__contenteditable[aria-label="Write a message…"]`
    );

    const handleFocus = () => {
      setIsInputFocused(true);
    };

    if (inputField) {
      inputField.addEventListener("focus", handleFocus);
    }

    return () => {
      if (inputField) {
        inputField.removeEventListener("focus", handleFocus);
      }
    };
  }, []);

  return (
    <>
    {isInputFocused && <AIModal/>}
    </>
    
  )
}
export default PlasmoOverlay
