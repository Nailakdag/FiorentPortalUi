"use client";
import React, { useState } from "react";
import { Menu, Bell, User, LogOut, ChevronLeft } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { sidebarItems } from "@/contants/sidebarItems";
import { usePathname } from "next/navigation";
import NotificationDrawer from "@/components/notifications/notification-drawer";

interface HeaderProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({
  sidebarCollapsed,
  setSidebarCollapsed,
  setMobileMenuOpen,
}: HeaderProps) {
  const user = useSession();
  const pathname = usePathname();
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <header
      className={`bg-white border-b border-gray-200 px-4 py-3 h-[80px] fixed top-0 left-0 ${
        sidebarCollapsed ? "lg:left-16" : "lg:left-64"
      } right-0 z-50`}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop sidebar toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden lg:block"
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform ${
                sidebarCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>

          <h1 className="text-xl font-semibold text-gray-800">
            {sidebarItems.find((item) => item.href === pathname)?.label}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button
            onClick={() => setNotificationOpen(true)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Notification Drawer */}
          <NotificationDrawer
            open={notificationOpen}
            onOpenChange={setNotificationOpen}
          />

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800">
                {`${user.data?.user?.name ?? ""} ${
                  user.data?.user?.surname ?? ""
                }`}
              </p>
            </div>
            <button
              onClick={() => signOut()}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Çıkış Yap"
            >
              <LogOut className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
