import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
