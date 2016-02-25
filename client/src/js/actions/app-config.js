export const ENTER_ADMIN = "ENTER_ADMIN"
export const LEAVE_ADMIN = "LEAVE_ADMIN"

export function enterAdmin(){
  return { type: "ENTER_ADMIN" }
}

export function leaveAdmin(){
  return { type: "LEAVE_ADMIN" }
}
