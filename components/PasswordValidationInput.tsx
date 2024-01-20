import Eye from "@/app/assets/icons/eye";
import EyeSlash from "@/app/assets/icons/eye-slash";
import { ChangeEvent, useState } from "react";

export type PasswordValidationProps = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (value: any) => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  value: string;
  className?: string;
};

function PasswordValidationInput({
  placeholder,
  error,
  touched,
  value,
  className,
  handleChange,
  handleBlur,
}: PasswordValidationProps) {
  const [shouldShowPassword, setShouldShowPassword] = useState(false);

  const tooglePasswordVisibility = () => {
    setShouldShowPassword(!shouldShowPassword);
  };

  return (
    <div className="relative w-full">
      <input
        className={`input-primary text-[16px] ` + className}
        type={shouldShowPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(value) => handleChange(value)}
        onBlur={(value) => handleBlur(value)}
      />
      <div
        className="absolute right-2 top-[1px]"
        onClick={tooglePasswordVisibility}
      >
        {shouldShowPassword ? <Eye /> : <EyeSlash />}
      </div>

      {error && touched && (
        <div className="p-2 text-black border-[1px] rounded-lg mb-4 text-[14px]">
          {error}
        </div>
      )}
    </div>
  );
}

export default PasswordValidationInput;
