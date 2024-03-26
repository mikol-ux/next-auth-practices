"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
export const LoginButton = ({ children, mode, asChild }: LoginButtonProps) => {
  const onClick = () => {
    router.push("/auth/login");
  };
  const router = useRouter();
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
