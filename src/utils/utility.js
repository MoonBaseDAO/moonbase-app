import { getConfig } from "src/config/near";

export const yoktoNear = 1000000000000000000000000;
export const nearConfig = getConfig(process.env.NODE_ENV || 'development');

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const getDaoId = (daoAddr) => {
  if(!daoAddr) return "";
  const names = daoAddr.split('.');
  return names[0];
}

export const convertDuration = (duration) => {
  let utcSeconds = duration / 1e9;
  let epoch = new Date(0);
  epoch.setUTCSeconds(utcSeconds);
  return epoch;
};

export const getUserAvatarId = (userId) => {
  let num = '';
  for (let i = 0; i < userId.length; i++) {
    num += userId.charCodeAt(i);
  }
  return parseInt(num) % 100;
}