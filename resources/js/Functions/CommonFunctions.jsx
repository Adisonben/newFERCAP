import { permissions } from "./MasterDatas";

/**
 * Function to check if a user role has permission for a given permission name
 * @param {string} permissionName - The name of the permission to check
 * @param {string} userRole - The role of the user
 * @returns {boolean} - Returns true if the role has the permission, false otherwise
 */
export function hasPermission(permissionName, userRole) {
    // Find the permission object that matches the given permission name
    const permission = permissions.find((perm) => perm.name === permissionName);

    // If the permission is found, check if the user role is included in the roles array
    if (permission) {
        return permission.roles.includes(userRole);
    }

    // If the permission is not found, return false
    return false;
}
