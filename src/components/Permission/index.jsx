import { usePermission } from '@/hooks/usePermission';

const Permission = ({ permission, children }) => {
  const { hasPermission } = usePermission();

  if (!permission || hasPermission(permission)) {
    return children;
  }

  return null;
  // return <Navigate to="/403" />;
};

export default Permission;