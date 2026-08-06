import React from "react";
import { Metadata } from "next";
import { CivilRegistryDashboard } from "@/components/CivilRegistryDashboard";

export const metadata: Metadata = {
  title: "Панели ЗАГС | my.gov.tj",
  description: "Сабти асноди ҳолати шаҳрвандӣ: дархости шаҳодатномаи таваллуд, никоҳ ва пайгирӣ",
};

export default function CivilRegistryPage() {
  return (
    <div className="space-y-6">
      <CivilRegistryDashboard />
    </div>
  );
}
