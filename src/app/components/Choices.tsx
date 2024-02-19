import { Dispatch, SetStateAction } from 'react';

export type ChoicesType = "MIT" | "Stanford" | "Harvard"

interface ChoiceProps {
  handleChange: Dispatch<SetStateAction<ChoicesType>>;
  choice: ChoicesType;
  selected: ChoicesType;
  disabled: boolean
}

const Choice: React.FC<ChoiceProps> = ({ handleChange, choice, selected, disabled }) => {
  return (
    <button
      onClick={() => handleChange(choice)}
      className={
        `transition outline-none m-1 px-2 py-1 text-center border rounded-md ${
        selected === choice ? 'bg-gray-800 text-[#F0F0F0]' : 'bg-[#FFFFFF]'
      } `}
      disabled={disabled}
    >
      {choice}
    </button>
  )
}

interface ChoicesProps {
  handleChange: Dispatch<SetStateAction<ChoicesType>>;
  selected: ChoicesType;
  disabled: boolean
}

export const Choices: React.FC<ChoicesProps> = ({ handleChange, selected, disabled }) => {
  const choices: ChoicesType[] = ["Stanford", "MIT", "Harvard"]

  return (
    <div className="text-sm border rounded-md flex mt-2 px-1 bg-[#F0F0F0]">
      {
        choices.map(
          choice => (
            <Choice
              handleChange={handleChange}
              choice={choice}
              selected={selected}
              disabled={disabled}
              key={choice}
            />
          )
        )
      }
    </div>
  );
};
