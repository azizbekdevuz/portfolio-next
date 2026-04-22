"use client";

import { ProofBrowseProvider } from "@/components/brand/ProofBrowseContext";
import { HomeShellProvider } from "@/components/shell/HomeShellContext";
import { DeviceShellBody } from "@/components/shell/DeviceShellBody";

export default function DeviceDetectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <HomeShellProvider>
      <ProofBrowseProvider>
        <DeviceShellBody>{children}</DeviceShellBody>
      </ProofBrowseProvider>
    </HomeShellProvider>
  );
}
