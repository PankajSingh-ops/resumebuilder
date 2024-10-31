"use client"
import Link from "next/link";
import { Header } from "./common/Header";
import { useAppSelector } from "@/redux/store/store";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user)
  return (
    <>
    <Header/>
    <Link  href="/pages/all-resume">Resume</Link>
    <p>{user?.email}</p>
    <p>{user?.credits}</p>
    </>
  );
}
