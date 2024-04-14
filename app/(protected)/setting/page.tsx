"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useCurrentUser } from "../../../hooks/use-current-user";
import { SettingsSchema } from "../../../schemas";
import { settings } from "../../../actions/settings";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import { useSession } from "next-auth/react";
import { Button } from "../../../components/ui/button";
const SettingsPage = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const onclick = () => {
    startTransition(() => {
      settings({
        name: "fingerly",
      }).then(() => {
        update();
      });
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">settings</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onclick}>
          Update name
        </Button>
      </CardContent>
    </Card>
  );
};
export default SettingsPage;
