import { ComponentProps, FC, FormEvent } from "react";
import cx from "@/utils/cx";
import { IconArrowBack } from "@tabler/icons-react";
import { Avatar } from "@/components/message";

const Form: FC<{
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  inputProps: ComponentProps<"input">;
  buttonProps: ComponentProps<"button">;
}> = ({ onSubmit = () => {}, inputProps, buttonProps }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="relative m-auto flex items-center gap-4 mx-4 md:mx-6 justify-center"
    >
      <Avatar isUser={true} className="md:size-10 bg-gray-300" />

      <input
        placeholder="Your question..."
        {...inputProps}
        className={cx(
          "transition h-8 md:h-10 pl-4 pr-12 flex-1 rounded-md border border-gray-400",
          inputProps.className,
        )}
        type="text"
      />
      <button
        {...buttonProps}
        type="submit"
        tabIndex={-1}
        className={cx(
          "absolute right-3 top-1/2 -translate-y-1/2",
          "opacity-50 pointer-events-none",
        )}
      >
        <IconArrowBack stroke={1.5} />
      </button>
    </form>
  );
};

export default Form;
