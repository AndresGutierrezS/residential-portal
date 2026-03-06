import { CSSTransition } from "react-transition-group";

interface Props {
  show: boolean;
}

export const LoadingSpinner = ({ show }: Props) => {

  return (
    <CSSTransition
      in={show}
      timeout={200}
      classNames={{
        enter: "opacity-0",
        enterActive: "opacity-100 transition-opacity duration-200",
        exit: "opacity-100",
        exitActive: "opacity-0 transition-opacity duration-200"
      }}
      unmountOnExit
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"/>
      </div>
    </CSSTransition>
  );
};