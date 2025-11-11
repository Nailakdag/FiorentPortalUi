"use client";
import React, { useState } from "react";
import { Settings, ChevronDown, ChevronRight, User } from "lucide-react";
import { sidebarItems } from "@/contants/sidebarItems";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Sidebar({
  sidebarCollapsed,
  mobileMenuOpen,
  setMobileMenuOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Simulated user role - this should come from your auth context
  const isAdmin = true; // Change this based on actual user role

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col
        ${sidebarCollapsed ? "w-16" : "w-64"}
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <div className="flex p-4 border-b border-gray-200 h-[80px] items-center">
        <div className="h-[60px] w-full relative">
          {!sidebarCollapsed ? (
            <div className="w-[90%] h-full relative">
              <Image
                src="/images/deniz-filo.png"
                alt="Deniz Filo Logo"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 230px"
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-full relative">
              <Image
                src="/images/deniz-filo-logo-without-text.png"
                alt="Deniz Filo Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-4">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={`
                  flex items-center px-3 py-2 rounded-lg transition-colors text-sm font-medium
                  ${
                    pathname === item.href
                      ? "bg-denizFiloBlue text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  ${sidebarCollapsed ? "justify-center" : "justify-start"}
                `}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="ml-3 truncate">{item.label}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings Section */}
      <div className="border-t border-gray-200 p-3 mt-auto">
        {sidebarCollapsed ? (
          <Link
            className="flex items-center w-full px-3 py-2 rounded-lg transition-colors text-sm font-medium text-gray-700 hover:bg-gray-100 justify-center"
            href="/dashboard/settings"
            title="Ayarlar"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
          </Link>
        ) : (
          <div>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`
                flex items-center w-full px-3 py-2 rounded-lg transition-colors text-sm font-medium text-gray-700 hover:bg-gray-100 justify-between
                ${pathname.startsWith("/dashboard/settings") ? "bg-blue-50 text-blue-700" : ""}
              `}
            >
              <div className="flex items-center">
                <Settings className="w-5 h-5 flex-shrink-0" />
                <span className="ml-3">Ayarlar</span>
              </div>
              {settingsOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {settingsOpen && (
              <div className="mt-2 space-y-1">
                <Link
                  href="/dashboard/settings"
                  className={`
                    flex items-center px-6 py-2 rounded-lg transition-colors text-sm font-medium
                    ${
                      pathname === "/dashboard/settings"
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span className="ml-2">Kullanıcı Bilgilerim</span>
                </Link>

                {isAdmin && (
                  <Link
                    href="/dashboard/settings/admin"
                    className={`
                      flex items-center px-6 py-2 rounded-lg transition-colors text-sm font-medium
                      ${
                        pathname === "/dashboard/settings/admin"
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                  >
                    <Settings className="w-4 h-4 flex-shrink-0" />
                    <span className="ml-2">Ayarlar</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
