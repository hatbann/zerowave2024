/** @format */

"use client";

import RedirectHome, { isNeedLogin } from "@/components/common/RedirectHome";
import { useLoginState } from "@/hooks/useLoginState";
import { isLoginLoading, userState } from "@/states/user";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import style from "../styles/common/main.module.scss";
import { selectedPlaceState } from "@/states/place";

const Main = ({ children }: { children: React.ReactNode }) => {
  const pagesNeedSignedIn: string[] = ["/profile", "/review", "/review/write"];
  const pagesNeedSignedOut: string[] = ["/login", "/join"];

  const [user, setUser] = useRecoilState(userState);
  //const isLoading = useRecoilValue(isLoginLoading);
  const loading = useLoginState();
  const isLogin = user.userId !== "";
  const pathname = usePathname();
  const setSelectedPlace = useSetRecoilState(selectedPlaceState);

  const isPageOnlyInLoggedIn = pagesNeedSignedIn.some((p) =>
    pathname.includes(p)
  );
  const isPageOnlyInLoggedOut = pagesNeedSignedOut.some((p) =>
    pathname.includes(p)
  );

  const API_URL =
    process.env.NODE_ENV === "production"
      ? "/api"
      : `${process.env.NEXT_PUBLIC_API_URL}/api`!;

  useEffect(() => {
    const getUserInfo = async () => {
      const res: { message: any; token: any; user: any } = await fetch(
        `${API_URL}/token`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .catch((e) => {
          console.log(e);
        });

      if (res.message === "OK") {
        setUser({
          username: res.user.nickname,
          userId: String(res.user._id),
        });
      }
    };

    getUserInfo();
    const address = localStorage.getItem("address");
    const place = localStorage.getItem("placeName");
    if (address && place) {
      setSelectedPlace({
        address,
        placeName: place,
      });
    }
  }, []);

  if (loading) {
    return <div className={style["loading"]}>loading...</div>;
  } else {
    if (isLogin) {
      if (isPageOnlyInLoggedIn || !isPageOnlyInLoggedOut) {
        return <>{children}</>;
      } else if (isPageOnlyInLoggedOut) {
        return <RedirectHome />;
      }
    } else {
      if (isPageOnlyInLoggedIn) {
        return <RedirectHome />;
      } else if (isPageOnlyInLoggedOut || !isPageOnlyInLoggedIn) {
        return <>{children}</>;
      }
    }
  }
};

export default Main;
