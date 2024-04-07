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
import email from "next-auth/providers/email";
type Props = {
  params: {
    mail: string;
  };
};
interface FormData {
  id: string;
  name: string | null;
  email: string | undefined;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: UserRole;
}

const SettingsPage = ({ params: { mail } }: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    email: "",
    emailVerified: null,
    image: "",
    password: "",
    role: "USER",
  });

  // Form state management with useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: formData, // Use formData state as defaults
    resolver: zodResolver(SettingsSchema), // Optional schema for validation (define schema)
  });

  // Fetch data upon component mount and re-fetch on mail change
  useEffect(() => {
    const fetchData = async () => {
      const data = await singleUser(mail);
      console.log(data);
      setUser(data); // Update user state
      setFormData(data as any); // Update formData state with fetched data
      console.log(register);
    };

    fetchData();
  }, [mail]);

  // Handle form submission (replace with your logic)
  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Perform form data submission logic here (API call or other actions)
    startTransition(() => {
      update_user(data)
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

  // Use watch hook to update formData state on changes

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        {isLoading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isPending}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: "Invalid email format.",
              },
            })}
            value={formData.email as string} // Set initial value from stat
            onChange={(e) => setFormData({ ...formData, email: user?.email })} // Update email in state on change
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role:
          </label>
          <select
            id="role"
            disabled={isPending}
            {...register("role", { required: "Please select a role." })}
            value={formData.role} // Set initial value from state
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value as UserRole })
            } // Update role in state on change
            className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          >
            {/* Add your role options here */}
            <option value={UserRole.USER}>User</option>
            <option value={UserRole.ADMIN}>Admin</option>
            {/* Add more options as needed */}
          </select>
          {errors.role && (
            <p className="error-message">{errors.role.message}</p>
          )}
        </div>
        <Button type="submit" variant="default">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;
