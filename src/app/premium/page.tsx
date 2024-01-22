
import Header from "../components/Header";
import { currentUser } from '@clerk/nextjs';

async function Page() {
  const getUserInfo = async () => {
    const user = await currentUser();

    if (!user) return <div>Not logged in</div>;

    return <div>Hello {user?.firstName} ({user?.id})</div>;
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div>Main content for Page 1 goes here.</div>
        {getUserInfo()}
      </div>
    </div>
  );
};

export default Page;
