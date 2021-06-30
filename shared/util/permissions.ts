export const hasPermission = (permissions: string[], ...permissionArr: (string | string[])[]) : boolean => {
  if(!permissionArr) return true;
  if(!permissions) return false;

  //Force the owner to have the admin permission.
  if(permissions.includes("owner") && !permissions.includes("admin")) permissions.push("admin");

  for (const permission of permissionArr) {
    if(typeof(permission) === "string" && permissions.includes(permission)) return true;
    else if(typeof(permission) === "object") {
      let flag = true;
      for (const item of permission) {
        if (!permissions.includes(item)) flag = false;
      }

      if (flag) return true;
    }
  }

  return false;
};