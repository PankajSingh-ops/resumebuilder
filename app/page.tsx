import Link from "next/link";
import { Header } from "./common/Header";

export default function Home() {
  return (
    <>
    <Header/>
    <Link  href="/pages/all-resume">Resume</Link>
    </>
  );
}
