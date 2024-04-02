import { Header } from "./header";
import { BackButton } from "./backbutton";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../card";
export default function ErrorCard() {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops! something went wrong" />
      </CardHeader>
      <CardFooter>
        <BackButton label="back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
}
