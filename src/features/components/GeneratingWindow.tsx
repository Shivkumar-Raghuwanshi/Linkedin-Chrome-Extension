import React from 'react';
import InsertIcon from "~/../assets/Insert.svg";
import RegenerateIcon from "~/../assets/Regenerate.svg";

interface GeneratingWindowProps {
  userInput: string;
  aiResponse: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInsert: () => void;
  messageInputRef: React.RefObject<HTMLInputElement>;
}

const GeneratingWindow: React.FC<GeneratingWindowProps> = ({
  userInput,
  aiResponse,
  handleInputChange,
  handleInsert,
  messageInputRef,
}) => {
  return (
    <div className=" flex flex-col items-end p-8 bg-gray-50 shadow-lg rounded-2xl">
      <div className="flex flex-col gap-6 w-[818px]">
        <div className="flex items-end w-[472px] p-4 gap-1 bg-[#DFE1E7] rounded-[12px] self-end">
          <p className="text-2xl text-[#666D80]">{userInput}</p>
        </div>
        <div className="flex items-start w-[631px] p-4 gap-1 bg-blue-100 rounded-[12px] self-start">
          <p className="text-2xl text-[#666D80]">{aiResponse}</p>
        </div>
      </div>
      <div className="">
        <input
          className="box-border w-[818px] h-[61px] text-2xl font-medium text-[#666D80] px-4 mt-6 bg-white border border-[#C1C7D0] rounded-[8px] flex-1"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Your prompt"
          ref={messageInputRef}
        />
      </div>
      <div className="flex flex-row justify-end items-start gap-6">
        <div className="flex flex-row justify-center items-center px-8 py-3 mt-6 gap-2.5 rounded-lg border-2 border-[#666D80]">
          <div className="w-6 h-6">
            <img src={InsertIcon} alt="Insert" />
          </div>
          <button
            className="text-2xl font-semibold text-[#666D80]"
            onClick={handleInsert}
            disabled={!userInput}
          >
            Insert
          </button>
        </div>
        <div className="flex flex-row justify-center items-center px-8 py-4 mt-6 gap-2.5 bg-blue-500 rounded-lg">
          <div className="w-6 h-6 bg-blue-500">
            <img src={RegenerateIcon} alt="Regenerate" />
          </div>
          <button className="text-2xl font-semibold text-white" disabled={true}>
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratingWindow;