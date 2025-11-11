"use client";
import React, { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

interface Layout {
  children: React.ReactNode;
}

export default function Layout({ children }: Layout) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        {/* Header */}
        <Header
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Main Content Area */}
        <main className="px-[20px] pt-[100px]">{children}</main>
      </div>
    </div>
  );
}
