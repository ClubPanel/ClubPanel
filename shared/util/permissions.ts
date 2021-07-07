/**
 * Checks if a list of permissions includes specific permissions.
 * @param permissions {string[]} - is the list of permissions that will be checked.
 * @param permissionArr {(string | string[])[]} - is a list comprising of strings and string arrays. If a user has any permissions in this list, this function will return true, otherwise it will return false. String arrays in this list require all of their elements to be present in the user's permissions.
 *
 * For example, if the user has `["testperm", "testperm2", "testperm3"]`, then `"testperm4", ["testperm2", "testperm3"]` will return true because while the user does not have `testperm4`, they do have both `testperm2` and `testperm3`. If that array included `testperm5`, however, it would return false, as the user does not have `testperm5`.
 */
export const hasPermission = (permissions: string[], ...permissionArr: (string | string[])[]) : boolean => {
  if(!permissionArr) return false;
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