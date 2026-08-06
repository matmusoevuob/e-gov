import React from "react";
import { Metadata } from "next";
import { DocumentVault } from "@/components/DocumentVault";

export const metadata: Metadata = {
  title: "Захираи Ҳуҷҷатҳо (Vault) | my.gov.tj",
  description: "Сайфи рақамии ҳуҷҷатҳои шаҳрвандӣ бо муҳофизати E-Seal ва коди QR",
};

export default function DocumentVaultPage() {
  return (
    <div className="space-y-6">
      <DocumentVault />
    </div>
  );
}
