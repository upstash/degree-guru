import { SignIn } from "@clerk/nextjs";
import Header from "../../components/Header";

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <SignIn />;
      </div>
    </div>
  );

}