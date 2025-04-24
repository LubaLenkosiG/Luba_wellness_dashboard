import Image from "next/image";
import SignIn from "./signin/page";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <SignIn />
      
    </div>
  );
}
