"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
const page = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return <div>{searchParams}</div>;
};

export default page;
