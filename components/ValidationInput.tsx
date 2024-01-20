import { ChangeEvent, ReactNode } from "react";
import { HTMLInputTypeAttribute } from "react";

type ValidationInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: "NUMBER" | "TEXT";
  inputType?: HTMLInputTypeAttribute;
  icon?: ReactNode;
  error?: string;
  touched?: boolean;
  name?: string;
};

function ValidationInput({
  placeholder,
  className,
  value,
  type,
  inputType,
  icon,
  error,
  touched,
  name,
  onChange,
}: ValidationInputProps): JSX.Element {
  const validateIsNumber = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) return;
    onChange(e);
  };

  return (
    <div className="relative w-full">
      <input
        className={`input-primary text-[16px] ` + className}
        type={inputType}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={(e) =>
          type === "NUMBER" ? validateIsNumber(e) : onChange(e)
        }
      />
      {icon && <div className="absolute right-2 top-[15px]">{icon}</div>}
      {error && touched && (
        <div className="bg-error-base p-2 text-white-base border-[1px] border-grey-100 rounded-lg mb-4 text-[14px]">
          {error}
        </div>
      )}
    </div>
  );
}

export default ValidationInput;
