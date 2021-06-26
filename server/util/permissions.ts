export const hasPermission = (permissions: string[], permission: string | string[]) : boolean => {
  if(!permission) return true;
  if(!permissions) return false;

  if(typeof permission === "string") return permissions.includes(permission);

  for (const item of permission) {
    if(!permissions.includes(item)) return false;
  }

  return true;
};