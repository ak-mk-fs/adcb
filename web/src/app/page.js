import Image from "next/image";
import List from "./components/List";
export default function Home() {
  return (
    <div className="grid items-center  min-h-screen main-page-wrapper">
      <List />
    </div>
  );
}
