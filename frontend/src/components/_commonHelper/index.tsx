"use client";

import React from "react";

import { useSession } from "next-auth/react";
import { useAppDispatch } from "../../redux/store";
import { removeToken, setToken } from "../../redux/authSlice/slice";

export const CommonHelper: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (session) {
      dispatch(setToken(session.backendTokens?.accessToken));
    } else {
      dispatch(removeToken());
    }
  }, [session]);

  return <></>;
};
