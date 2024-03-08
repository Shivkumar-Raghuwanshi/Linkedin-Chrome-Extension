import React from 'react';
import GenerateIcon from "~/../assets/Vector.svg";

interface NotGeneratingWindowProps {
  userInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenerate: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const NotGeneratingWindow: React.FC<NotGeneratingWindowProps> = ({
  userInput,
  handleInputChange,
  handleGenerate,
}) => {
  return (
    <div className="flex flex-col items-end p-8 bg-gray-50 shadow-lg rounded-2xl">
      <div className="">
        <input
          className="box-border w-[818px] h-[61px] text-2xl font-medium text-[#666D80] px-4 bg-white border border-[#C1C7D0] rounded-[8px] flex-1"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Your prompt"
        />
      </div>
      <div className="flex flex-row justify-center items-center px-8 py-4 mt-6 gap-2.5 bg-blue-500 rounded-lg">
        <div className="w-6 h-6 bg-blue-500">
          <img src={GenerateIcon} alt="Generate" />
        </div>
        <button
          className="text-2xl font-semibold text-white"
          onClick={handleGenerate}
          disabled={!userInput}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default NotGeneratingWindow;