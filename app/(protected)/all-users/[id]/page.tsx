"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { getUserById } from "../../../../data/user";
import { useSession } from "next-auth/react";

import { Switch } from "../../../../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { SettingsSchema } from "../../../../schemas";
import { Card, CardHeader, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { update_user } from "../../../../actions/update-user";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";

import { FormError } from "../../../../components/form-error";
import { FormSucces } from "../../../../components/form-succes";
import { UserRole } from "@prisma/client";
import { singleUser } from "../../../../actions/singleUser";
type Props = {
  params: {
    id: string;
  };
};
const SettingsPage = ({ params: { id } }: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [user, setUser] = useState<any>([]);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      email: user?.email,
      role: user.role || undefined,
      //name: user.id,
    },
  });
  const fetchData = async () => {
    const user = await singleUser(id);

    setUser(user);
    console.log(user);
  };

  useEffect(() => {
    fetchData(); // Fetch the first page on component mount
  }, []);

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    console.log(values.role);
    startTransition(() => {
      update_user(values)
        .then((data) => {
          /*  if (data.error) {
            setError(data.error);
          } */

          if (data.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{user.email}</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormSucces message={success} />
                    <FormError message={error} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
