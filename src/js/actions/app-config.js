export const ENTER_ADMIN = 'ENTER_ADMIN';
export const LEAVE_ADMIN = 'LEAVE_ADMIN';

export const ENTER_LOGIN = 'ENTER_LOGIN';
export const LEAVE_LOGIN = 'LEAVEL_LOGIN';

export function enterAdmin(){
  console.log('you have just entered admin');
  return { type: 'ENTER_ADMIN' };
}

export function leaveAdmin(){
  console.log('you have just left admin');
  return { type: 'LEAVE_ADMIN' };
}

export function enterLogin() {
  return { type: 'ENTER_LOGIN' };
}

export function leaveLogin() {
  return { type: 'LEAVE_LOGIN' };
}
