"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { mockNotificationData } from "@/lib/mockNotificationData";
import { Bell, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface NotificationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NotificationDrawer({
  open,
  onOpenChange,
}: NotificationDrawerProps) {
  const notifications = mockNotificationData;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <SheetTitle className="text-xl font-semibold">
                  Bildirimler
                </SheetTitle>
              </div>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <SheetDescription className="text-left">
              {notifications.length} bildirim
            </SheetDescription>
          </SheetHeader>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <Bell className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500">Henüz bildirim yok</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.isRead ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                          !notification.isRead
                            ? "bg-blue-500"
                            : "bg-transparent"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4
                            className={`text-sm font-medium ${
                              !notification.isRead
                                ? "text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${notification.type.color}`}
                          >
                            {notification.type.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDistanceToNow(notification.date, {
                            addSuffix: true,
                            locale: tr,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
