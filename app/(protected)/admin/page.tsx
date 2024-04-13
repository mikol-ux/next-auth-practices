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
import { Button } from "../../../components/ui/button";
import { toast, Toaster } from "sonner";
import { admin } from "../../../actions/admin";
const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        console.log("OK");
        toast.success("Allowed API route");
      } else {
        console.error("Forbidden");
        toast.error("Forbidden API route");
      }
    });
  };
  const onServerClick = () => {
    admin().then((data) => {
      if (data.success) {
        console.log("OK");
        toast.success(data.success);
      }
      if (data.error) {
        console.error("Forbidden");
        toast.error(data.error);
      }
    });
  };
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
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin Server Action</p>
          <Button onClick={onServerClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p>Admin Api Action</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
      </CardContent>
      <Toaster position={"top-center"} richColors expand />
    </Card>
  );
};
export default AdminPage;
