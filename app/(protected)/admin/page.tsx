"use client";
import { UserRole } from "@prisma/client";
import { RoleGate } from "../../../components/auth/role-gate";
import { FormSucces } from "../../../components/form-succes";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { UserInfo } from "../../../components/user-info";
import { useCurrentRole } from "../../../hooks/use-current-role";
import { useCurrentUser } from "../../../hooks/use-current-user";
import { currentUser } from "../../../lib/auth";
import { currentRole } from "../../../lib/auth";
const AdminPage = () => {
  const role = useCurrentRole();
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center ">ADMIN</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate
          allowedRole={UserRole.ADMIN}
          secondRole={UserRole.SUPER_ADMIN}
        >
          <FormSucces message="you are allowed to see this content" />
        </RoleGate>
      </CardContent>
    </Card>
  );
};
export default AdminPage;
