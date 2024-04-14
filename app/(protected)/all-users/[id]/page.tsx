"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { RoleSchema } from "../../../../schemas";
import { Button } from "../../../../components/ui/button";
import { update_user } from "../../../../actions/update-user";
import { Input } from "../../../../components/ui/input";
import { UserRole } from "@prisma/client";
import { singleUser } from "../../../../actions/singleUser";
import { toast, Toaster } from "sonner";
type Props = {
  params: {
    id: string;
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

const SettingsPage = ({ params: { id } }: Props) => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: formData,
    resolver: zodResolver(RoleSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await singleUser(id);
      console.log(data);
      setUser(data);
      setFormData(data as any);
      console.log(register);
    };

    fetchData();
  }, [id]);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    startTransition(() => {
      update_user(data)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  // Use watch hook to update formData state on changes

  return (
    <div className="w-full  flex justify-center items-center pt-44">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email:
          </label>
          <Input
            id="email"
            type="email"
            //className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
        <Button type="submit" variant="default" onClick={() => onSubmit}>
          Update Role
        </Button>
        <Toaster position={"top-center"} richColors />
      </form>
    </div>
  );
};

export default SettingsPage;
