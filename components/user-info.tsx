import { ExtendedUser } from "../next.auth";
import { Card, CardContent, CardHeader } from "./ui/card";

// server and client conponent
interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium ">ID</p>
          <p className="truncate text-xs maw-w-[180px] font-mono bg-slate-100 rounded-md ">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium ">NAME</p>
          <p className="truncate text-xs maw-w-[180px] font-mono bg-slate-100 rounded-md ">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium ">EMAIl</p>
          <p className="truncate text-xs maw-w-[180px] font-mono bg-slate-100 rounded-md ">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium ">ROLE</p>
          <p className="truncate text-xs maw-w-[180px] font-mono bg-slate-100 rounded-md ">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium ">TWO FACTOR AUTHENTICATION</p>
          <p className="truncate text-xs maw-w-[180px] font-mono bg-slate-100 rounded-md ">
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
