import * as React from "react";
import style from "@/components/Admin/Header/Header.module.scss";
import Image from "next/image";

import {signOut} from "next-auth/react";
import {redirect} from "next/navigation";

const HeaderLogOut = () => {

  const handleLogout = async () => {
    await signOut();
    redirect("/login");
  }

  return (
    <button
      type="button"
      className={style.logout}
      onClick={handleLogout}
    >
      <Image
        src="/icons/admin/log-out.svg"
        width={50}
        height={50}
        alt={"Log out"}
      />
    </button>
  );
}

export default HeaderLogOut;