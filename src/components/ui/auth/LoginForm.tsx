import { CardWrapper } from "./card-wrapper";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="welcome back"
      backButtonLabel="Dont have an Account"
      backbuttonHref="/auth/register"
      showSocial
    >
      <div>Login Form</div>
    </CardWrapper>
  );
};
