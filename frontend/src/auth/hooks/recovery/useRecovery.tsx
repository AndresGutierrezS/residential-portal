import { useMutation } from "@tanstack/react-query";
import { sendRecoveryCodeAction } from "@/auth/actions/recovery/sendRecoveryCode.action";
import { verifyRecoveryCodeAction } from "@/auth/actions/recovery/verifyRecoverCode.action";
import { resetPasswordAction } from "@/auth/actions/recovery/resetPassword.action";

export const useRecovery = () => {

  const sendCodeMutation = useMutation({
    mutationFn: (email: string) => sendRecoveryCodeAction(email),
  });

  const verifyCodeMutation = useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      verifyRecoveryCodeAction(email, code),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({
      email,
      code,
      password,
      password_confirmation,
    }: {
      email: string;
      code: string;
      password: string;
      password_confirmation: string;
    }) =>
      resetPasswordAction({email, code, password, password_confirmation}),
  });

  return {
    sendCode: sendCodeMutation.mutateAsync,
    sending: sendCodeMutation.isPending,
    sendError: sendCodeMutation.error,

    verifyCode: verifyCodeMutation.mutateAsync,
    verifying: verifyCodeMutation.isPending,
    verifyError: verifyCodeMutation.error,

    resetPassword: resetPasswordMutation.mutateAsync,
    resetting: resetPasswordMutation.isPending,
    resetError: resetPasswordMutation.error,
  };
};