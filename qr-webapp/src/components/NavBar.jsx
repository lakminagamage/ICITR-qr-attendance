
import Image from "next/image";

export default function NavBar({ setClientID }) {
  return (
    <header className="w-full bg-white py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <Image
          src="/logo.png"
          alt="ICITR 2024 Logo"
          width={80}
          height={80}
          className="object-contain"
        />
        <h1 className="text-2xl md:text-3xl font-medium text-black">
          International Conference on Information Technology Research - 2024
        </h1>
        <select
          className="ml-auto border border-white rounded-md p-2 text-white hover:text-black hover:border-gray-300"
          onChange={(e) => setClientID(e.target.value)}
        >
          <option value="5bf8fed6-8e92-4618-9bba-1603e5dc736e">Client 1</option>
          <option value="7ddf697b-732a-4a25-b74f-a4d5f482ef10">Client 2</option>
          <option value="66d71bd5-9adc-4c53-bc84-0527caf29dfb">Client 3</option>
        </select>
      </div>
    </header>
  );
}