import React from 'react'
import { permissions } from '@/Functions/MasterDatas';

const PermissionGuard = ({ userRole, permissionName, children }) => {
    const permission = permissions.find((perm) => perm.name === permissionName);
    if (permission && permission.roles.includes(userRole)) {
        return <>{children}</>;
    }
    return null;
}

export default PermissionGuard
