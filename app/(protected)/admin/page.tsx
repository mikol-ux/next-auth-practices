"use client";
import { UserInfo } from "../../../components/user-info";
import { useCurrentRole } from "../../../hooks/use-current-role";
import { useCurrentUser } from "../../../hooks/use-current-user";
import { currentUser } from "../../../lib/auth";

const AdminPage = () => {
  const role = useCurrentRole();
  return <div>Current Role :{role}</div>;
};
export default AdminPage;
