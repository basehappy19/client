"use client";
import { SessionProvider } from "next-auth/react";
import React, { useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState<Boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <SessionProvider>{children}</SessionProvider>;
  }

  return <SessionProvider>{children}</SessionProvider>;
};
