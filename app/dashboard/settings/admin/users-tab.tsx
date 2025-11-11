"use client";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  DataTable,
  Column,
} from "../../../../components/data-table/data-table";
import { UserPlus } from "lucide-react";
import UserModal from "./user-modal";
import useGlobalFilter from "@/lib/hooks/use-global-filter";

interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  userType: string;
  roles: string[];
  password: string;
  confirmPassword: string;
  forcePasswordChange: boolean;
  isActive: boolean;
}

const mockUsers = [
  {
    id: 1,
    firstName: "Burçin",
    lastName: "Özdemir",
    username: "burcin.ozdemir",
    email: "burcin.ozdemir@fiorent.com",
    userType: "admin",
    roles: ["Dashboard Görüntüleme", "Kullanıcı Yönetimi"],
    status: "Aktif",
    createdAt: "2025-06-23",
    forcePasswordChange: false,
    isActive: true,
  },
  {
    id: 2,
    firstName: "Kaan",
    lastName: "Uzman",
    username: "kaan.uzman",
    email: "kaan.uzman@fiorent.com",
    userType: "operator",
    roles: ["Dashboard Görüntüleme", "Talepler Yönetimi"],
    status: "Aktif",
    createdAt: "2025-06-22",
    forcePasswordChange: true,
    isActive: true,
  },
  {
    id: 3,
    firstName: "Nail",
    lastName: "Akdağ",
    username: "nail.akdag",
    email: "nail.akdağ@fiorent.com",
    userType: "technician",
    roles: ["Bakım Yönetimi", "Arıza Yönetimi"],
    status: "Pasif",
    createdAt: "2025-06-20",
    forcePasswordChange: false,
    isActive: false,
  },
  {
    id: 4,
    firstName: "Anıl",
    lastName: "Omay",
    username: "anil.omay",
    email: "anıl.omay@fiorent.com",
    userType: "driver",
    roles: ["Dashboard Görüntüleme"],
    status: "Aktif",
    createdAt: "2025-06-21",
    forcePasswordChange: false,
    isActive: true,
  },
];

const userTypeLabels = {
  admin: "Yönetici",
  operator: "Operatör",
  technician: "Teknisyen",
  driver: "Sürücü",
};

export default function UsersTab() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { globalFilter, setGlobalFilter } = useGlobalFilter(() => {
    setCurrentPage(1);
  });

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowUserModal(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDeactivateUser = (user: any) => {
    console.log("Kullanıcı pasifleştirildi:", user.id);
    // API call will be made here
  };

  const handleDeleteUser = (user: any) => {
    console.log("Kullanıcı silindi:", user.id);
    // API call will be made here
  };

  const handleSaveUser = (userData: User) => {
    console.log("Kullanıcı kaydedildi:", userData);
    setShowUserModal(false);
    // API call will be made here
  };

  const userColumns: Column[] = [
    {
      key: "name",
      header: "Ad Soyad",
      className: "font-medium",
      render: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    {
      key: "username",
      header: "Kullanıcı Adı",
    },
    {
      key: "email",
      header: "E-posta",
    },
    {
      key: "userType",
      header: "Kullanıcı Tipi",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "admin"
              ? "bg-red-100 text-red-800"
              : value === "operator"
              ? "bg-yellow-100 text-yellow-800"
              : value === "technician"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {userTypeLabels[value as keyof typeof userTypeLabels] || value}
        </span>
      ),
    },
    {
      key: "roles",
      header: "Roller",
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((role: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
            >
              {role}
            </span>
          ))}
          {value.length > 2 && (
            <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
              +{value.length - 2}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Durum",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {value ? "Aktif" : "Pasif"}
        </span>
      ),
    },
    {
      key: "forcePasswordChange",
      header: "Şifre Değişikliği",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value
              ? "bg-orange-100 text-orange-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value ? "Zorunlu" : "Opsiyonel"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Oluşturulma Tarihi",
    },
    {
      key: "actions",
      header: "İşlemler",
      className: "text-right",
      render: (_, row) => (
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleEditUser(row)}
            className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs hover:bg-blue-200 font-medium"
          >
            Düzenle
          </button>
          <button
            onClick={() => handleDeactivateUser(row)}
            className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs hover:bg-yellow-200 font-medium"
          >
            Pasifleştir
          </button>
          <button
            onClick={() => handleDeleteUser(row)}
            className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs hover:bg-red-200 font-medium"
          >
            Sil
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">
          Kullanıcı Yönetimi
        </h2>
        <Button
          onClick={handleAddUser}
          className="bg-[#1249BD] hover:bg-[#0B2F7B] flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Yeni Kullanıcı</span>
        </Button>
      </div>

      <DataTable
        columns={userColumns}
        data={mockUsers}
        totalCount={mockUsers.length}
        emptyMessage="Henüz kullanıcı bulunamadı"
        showSearch={true}
        searchPlaceholder="Kullanıcı ara..."
        limit={pageSize}
        skip={(currentPage - 1) * pageSize}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        externalPagination={false}
      />

      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSave={handleSaveUser}
        user={selectedUser}
      />
    </div>
  );
}
