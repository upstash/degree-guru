import Markdown from 'markdown-to-jsx'
import { List } from 'postcss/lib/list';
import { Dispatch, SetStateAction } from 'react';

export type ChoicesType = "MIT" | "Stanford" | "Harvard"

interface ChoiceProps {
  handleChange: Dispatch<SetStateAction<ChoicesType>>;
  choice: ChoicesType;
  selected: ChoicesType
}

const Choice: React.FC<ChoiceProps> = ({ handleChange, choice, selected }) => {
  return (
    <button
      onClick={() => handleChange(choice)}
      className={
        `transition outline-none w-20 m-1 px-2 py-1 text-center border rounded-md ${
        selected === choice ? 'bg-gray-800 text-[#F0F0F0]' : 'bg-[#FFFFFF]'
      } `}
    >
      {choice}
    </button>
  )
}

interface ChoicesProps {
  handleChange: Dispatch<SetStateAction<ChoicesType>>;
  selected: ChoicesType;
}

export const Choices: React.FC<ChoicesProps> = ({ handleChange, selected }) => {
  const choices: ChoicesType[] = ["MIT", "Stanford", "Harvard"]

  return (
    <div className="border rounded-md flex mt-2 px-1 bg-[#F0F0F0]">
      {
        choices.map(
          choice => (
            <Choice
              handleChange={handleChange}
              choice={choice}
              selected={selected}
              key={choice}
            />
          )
        )
      }
    </div>
  );
};
