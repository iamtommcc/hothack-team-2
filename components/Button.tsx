import Spinner from "@/app/assets/icons/spinner";
import { ReactNode } from "react";

type ButtonProps = {
  text?: string;
  onClick: () => void;
  className?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  type?: "submit" | "button";
  form?: string;
};

function Button({
  text,
  onClick,
  className,
  icon,
  isLoading,
  type,
  form,
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={!isLoading ? onClick : () => null}
      className={`btn-primary ` + className}
      type={type ?? "button"}
      form={form}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {text}
          {icon && <i>{icon}</i>}
        </>
      )}
    </button>
  );
}

export default Button;
