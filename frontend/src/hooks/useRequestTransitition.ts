import { useState, useTransition } from "react";

type AlertType = "success" | "error" | "info";

export const useRequestTransition = () => {

  const [isPending, startTransition] = useTransition();

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertType>("success");

  const execute = async (
    action: () => Promise<any>,
    successMessage = "Operación realizada correctamente",
    errorMessage = "Ocurrió un error"
  ) => {

    startTransition(async () => {

      try {

        await action();

        setType("success");
        setMessage(successMessage);
        setShowAlert(true);

      } catch (error) {

        setType("error");
        setMessage(errorMessage);
        setShowAlert(true);

      }

    });

  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return {
    loading: isPending,
    showAlert,
    message,
    type,
    execute,
    closeAlert
  };

};