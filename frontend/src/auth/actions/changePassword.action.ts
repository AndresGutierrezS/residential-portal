import { portalGateApi } from "@/api/portalGateApi"


interface ChangePasswordDto {
  current_password: string
  new_password: string
  new_password_confirmation: string
}

export const changePasswordAction = async (
  payload: ChangePasswordDto
) => {

  try {

    await portalGateApi.post("/change-password", payload)

    return true

  } catch (error) {

    return false

  }

}