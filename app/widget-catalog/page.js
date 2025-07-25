"use client";
import WidgetCatalog from "@/components/WidgetCatalog/WidgetCatalog";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WidgetCatalogPage() {
  const [token, setToken] = useState();
  const router = useRouter();
  /*To check if user has a valid token */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push("/"); // redirect to login only if token missing
    }
  }, []);

  return <WidgetCatalog />;
}
