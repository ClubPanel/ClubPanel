export const hasPermission = (permissions: string[], permission: string) : boolean => {
  if(!permission) return true;
  if(!permissions) return false;
  return permissions.includes(permission);
};