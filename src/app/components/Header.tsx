
 import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4">
      <div>
        <Link href="/" className="text-xl font-bold">
            DegreeGuru
        </Link>
      </div>

    </div>
  );
};

export default Header;
