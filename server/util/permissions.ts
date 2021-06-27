export const hasPermission = (permissions: string[], permission: string | string[]) : boolean => {
  if(!permission) return true;
  if(!permissions) return false;

  //Force the owner to have the admin permission.
  if(permissions.includes("owner") && !permissions.includes("admin")) permissions.push("admin");

  if(typeof permission === "string") return permissions.includes(permission);

  for (const item of permission) {
    if(!permissions.includes(item)) return false;
  }

  return true;
};