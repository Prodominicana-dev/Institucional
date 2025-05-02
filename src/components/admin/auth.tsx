"use client";
import { validateUser } from "@/services/auth/validation";
import { useUser } from "@auth0/nextjs-auth0";
import { Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import AccessDenied from "./auth/accessDenied";
import Login from "./auth/login";

export default function AuthUser({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission: string;
}) {
  const { user, isLoading } = useUser();

  const [auth, setAuth] = useState<boolean>(false);
  const [validate, setValidate] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user && !isLoading) {
        try {
          const result = await validateUser(user.sub as string, permission);
          setAuth(result);
          setValidate(true);
        } catch (error) {
          // Manejar cualquier error que ocurra durante la validación
          console.error("Error durante la validación:", error);
          setAuth(false); // Establecer a false si ocurre un error
        }
      }
    };
    fetchData();
  }, [user, isLoading, permission]);

  if (auth && user && !isLoading) {
    return <>{children}</>;
  }
  if (!auth && !isLoading && !user) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Login />
      </div>
    );
  }
  if (!auth && !isLoading && validate) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <AccessDenied />
      </div>
    );
  }
  if (isLoading) {
    return (
      <>
        <div className="w-full h-[85vh] flex justify-center items-center">
          <Spinner
            className="w-7 h-7"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
      </>
    );
  }
}
