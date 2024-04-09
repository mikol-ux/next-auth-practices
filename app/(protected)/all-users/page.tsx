"use client";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { SettingsSchema } from "../../../schemas";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "../../../components/ui/table";
import { users } from "../../../actions/users";
import { Value } from "@radix-ui/react-select";
import { UserRole } from "@prisma/client";
import { Form } from "../../../components/ui/form";
import { update_user } from "../../../actions/update-user";
import { useEffect, useState } from "react";
import Link from "next/link";
type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: UserRole;
};

const Users = () => {
  const [Users, setUsers] = useState<User[]>([]);
  const fetchData = async () => {
    const Allusers = await users();
    setUsers(Allusers);
  };
  useEffect(() => {
    fetchData(); // Fetch the first page on component mount
  }, []);

  return (
    <Table className="px-12">
      <TableCaption>authenticated users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">s/n</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Users.map((invoice, index) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>

            <TableCell>
              {invoice.role === "SUPER_ADMIN" ? (
                <p className="opacity-50">{invoice.name}</p>
              ) : (
                <Link href={`/all-users/${invoice.id}`}>{invoice.name}</Link>
              )}
            </TableCell>
            <TableCell>{invoice.email}</TableCell>
            <TableCell className="text-right">{invoice.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/*       <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};
export default Users;
