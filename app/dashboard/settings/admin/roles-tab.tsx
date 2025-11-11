"use client";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Eye, List, FileEdit, Plus, Shuffle } from "lucide-react";

const roles = [
  { key: "musteri", name: "Müşteri Hizmetleri" },
  { key: "servis", name: "Servis Kullanıcısı" },
];

const modules = ["Talep", "Bakım", "Hasar", "İkame", "Lastik", "Dashboard"];

const permissions = [
  { key: "view", label: "Görüntüleme", icon: Eye },
  { key: "list", label: "Listeleme", icon: List },
  { key: "create", label: "Ekleme", icon: Plus },
  { key: "edit", label: "Düzenleme", icon: FileEdit },
  {
    key: "status",
    label: "Statü Değiştirme (Servisten al-çıkar)",
    icon: Shuffle,
  },
];

const sampleMatrix = {
  musteri: {
    Talep: { view: true, list: true, create: true, edit: true, status: false },
    Bakım: { view: true, list: true, create: true, edit: true, status: false },
    Hasar: { view: true, list: true, create: true, edit: true, status: false },
    İkame: { view: true, list: true, create: true, edit: true, status: false },
    Lastik: { view: true, list: true, create: true, edit: true, status: false },
    Dashboard: {
      view: true,
      list: true,
      create: false,
      edit: false,
      status: false,
    },
  },
  servis: {
    Talep: { view: true, list: true, create: false, edit: false, status: true },
    Bakım: { view: true, list: true, create: false, edit: false, status: true },
    Hasar: { view: true, list: true, create: false, edit: false, status: true },
    İkame: { view: true, list: true, create: false, edit: false, status: true },
    Lastik: {
      view: true,
      list: true,
      create: false,
      edit: false,
      status: true,
    },
    Dashboard: {
      view: true,
      list: true,
      create: false,
      edit: false,
      status: false,
    },
  },
};

export default function RolesTab() {
  const [selectedRole, setSelectedRole] = useState<string>(roles[0].key);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleEditRole = (role: any) => {
    setSelectedRole(role.key);
    setShowRoleModal(true);
  };

  const handleDeleteRole = (role: any) => {
    console.log("Rol silindi:", role.key);
    // API call will be made here
  };

  const handleEditPermissions = (role: any) => {
    setSelectedRole(role.key);
    setShowRoleModal(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">
          Rol ve Yetkilendirme
        </h2>
        <Button className="bg-[#1249BD] hover:bg-[#0B2F7B]">
          Yeni Rol Ekle
        </Button>
      </div>

      <div className="flex space-x-4 mb-4">
        {roles.map((role) => (
          <Button
            key={role.key}
            variant={selectedRole === role.key ? "default" : "outline"}
            onClick={() => setSelectedRole(role.key)}
          >
            {role.name}
          </Button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {roles.find((r) => r.key === selectedRole)?.name} Yetki Matrisi
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Modül
                </th>
                {permissions.map((permission) => (
                  <th
                    key={permission.key}
                    className="text-center py-3 px-2 font-medium text-gray-900"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <permission.icon className="w-4 h-4" />
                      <span className="text-xs text-center">
                        {permission.label}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module} className="border-t border-gray-200">
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {module}
                  </td>
                  {permissions.map((permission) => (
                    <td key={permission.key} className="text-center py-3 px-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={
                          (sampleMatrix as any)[selectedRole][module][
                            permission.key
                          ]
                        }
                        readOnly
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Rol Düzenle: {roles.find((r) => r.key === selectedRole)?.name}
            </h3>
            <p className="text-gray-600 mb-4">
              Rol düzenleme modalı burada implement edilecek.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowRoleModal(false)}>
                Kapat
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
