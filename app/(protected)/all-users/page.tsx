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
import { UserRole } from "@prisma/client";
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

const Users = async () => {
  const data = await users();

  //console.log(data);
  return (
    <Table className="w-[600px] bg-secondary">
      <TableCaption>authenticated user </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>s/n</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((invoice, index) => (
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
