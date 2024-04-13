"use client";

import { UserRole } from "@prisma/client";
import { useCurrentRole } from "../../hooks/use-current-role";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
  secondRole: UserRole;
}

export const RoleGate = ({
  children,
  allowedRole,
  secondRole,
}: RoleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRole && role !== secondRole) {
    return (
      <FormError message="you do not have permission to view this content" />
    );
  }

  return <>{children}</>;
};
