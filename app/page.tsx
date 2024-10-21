import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <UserButton />
      <h2>Hi👋, welcome</h2>
    </>
  );
}
