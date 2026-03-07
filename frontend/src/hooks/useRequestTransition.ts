import { useState } from "react";

type AlertType = "success" | "error" | "info";

export const useRequestTransition = () => {

  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertType>("success");

  const execute = async (
    action: () => Promise<any>,
    successMessage = "Operación realizada correctamente",
    errorMessage = "Ocurrió un error"
  ) => {

    try {

      setLoading(true);

      await action();

      setType("success");
      setMessage(successMessage);
      setShowAlert(true);

    } catch (error) {

      setType("error");
      setMessage(errorMessage);
      setShowAlert(true);

    } finally {

      setLoading(false);

    }

  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return {
    loading,
    showAlert,
    message,
    type,
    execute,
    closeAlert
  };

};