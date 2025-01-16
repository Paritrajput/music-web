"use client";

import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // Navigate back
    } else {
      router.push("/"); // Navigate to a default page if no history
    }
  };

  return (
    <button onClick={handleBack} className="btn-back">
      <img src="/go-back.png" className="h-7"/>
    </button>
  );
};

export default BackButton;
