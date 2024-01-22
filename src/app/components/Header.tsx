
import { 
  UserButton,
  SignedIn,
  SignedOut
 } from "@clerk/nextjs";
 import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4">
      <div>
        <Link href="/" className="text-xl font-bold">
            DegreeGuru
        </Link>
        <Link href="/premium" className="ml-4">
          premium
        </Link>
      </div>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <div>
          <Link href="/auth/sign-in" className="ml-4">
            Sign In
          </Link>
          <Link href="/auth/sign-up" className="ml-4">
            Sign Up
          </Link>
        </div>
      </SignedOut>

    </div>
  );
};

export default Header;
