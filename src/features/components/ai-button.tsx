import React from 'react';
import BeforeClickIcon from '~/../assets/BeforeClickIcon.svg';
import AfterClickIcon from '~/../assets/AfterClickIcon.svg';

interface AIButtonProps {
  isClicked: boolean;
  onClick: () => void;
}

const AIButton: React.FC<AIButtonProps> = ({ isClicked, onClick }) => {
  return (
    <button
      className="fixed bottom-[120px] right-[520px]"
      onClick={onClick}
    >
      {isClicked ? (
        <div className="w-8 h-8">
          <img src={AfterClickIcon} alt="AfterClick" />
        </div>
      ) : (
        <div className="w-8 h-8">
          <img src={BeforeClickIcon} alt="BeforeClick" />
        </div>
      )}
    </button>
  );
};

export default AIButton;