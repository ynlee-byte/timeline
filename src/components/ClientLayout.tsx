"use client";

import React, { ReactNode } from "react";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return <>{children}</>;
}