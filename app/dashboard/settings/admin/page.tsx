"use client";
import React, { useState } from "react";
import { Users, Shield } from "lucide-react";
import UsersTab from "./users-tab";
import RolesTab from "./roles-tab";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Ayarlar → Sistem Ayarları
        </h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "users"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Kullanıcılar</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("roles")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "roles"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Rol ve Yetkilendirme</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "users" && <UsersTab />}
          {activeTab === "roles" && <RolesTab />}
        </div>
      </div>
    </div>
  );
}
