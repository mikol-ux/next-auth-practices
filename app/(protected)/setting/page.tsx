import { auth, signOut } from "../../../auth";
import { users } from "../../../actions/users";

const SettingsPage = async () => {
  const session = await auth();
  session?.user;

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
      <p>{}</p>
    </div>
  );
};
export default SettingsPage;
