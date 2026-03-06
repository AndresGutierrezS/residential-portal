import { CSSTransition } from "react-transition-group";

interface Props {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export const AlertMessage = ({ show, message, type }: Props) => {

  const colors =
    type === "success"
      ? "bg-green-500"
      : "bg-red-500";

  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames={{
        enter: "opacity-0 -translate-y-4",
        enterActive:
          "opacity-100 translate-y-0 transition-all duration-300",
        exit: "opacity-100",
        exitActive: "opacity-0 transition-opacity duration-200"
      }}
      unmountOnExit
    >
      <div
        className={`fixed top-6 right-6 px-6 py-3 rounded-lg text-white shadow-lg ${colors}`}
      >
        {message}
      </div>
    </CSSTransition>
  );
};