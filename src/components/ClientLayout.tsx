"use client";

import React, { ReactNode } from "react";
import { DevDebugPanel } from "./DevDebugPanel";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      {children}
      <DevDebugPanel />
    </>
  );
}