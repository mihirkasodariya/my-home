import React, { useState } from "react";
import { AdminNavbar } from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";

export const AdminLayout = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <AdminNavbar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu}/>
      <AdminSidebar mobileMenu={mobileMenu} />
    </>
  );
};
