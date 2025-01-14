import { usePermission } from '@/hooks/usePermission';

const Permission = ({ permission, children }) => {
  const { hasPermission } = usePermission();

  if (!permission || hasPermission(permission)) {
    return children;
  }

  return null;
};

export default Permission;