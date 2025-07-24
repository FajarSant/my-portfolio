"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";

const LoginPage = () => {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.replace("/admin/dashboard"); // Ganti dengan route admin panel yang sesuai
  };

  return (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
