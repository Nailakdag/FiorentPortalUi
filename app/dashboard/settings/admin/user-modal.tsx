"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../../../components/ui/button";
import { ControlledInput } from "../../../../components/ui/controlled-input";
import { X, Tag } from "lucide-react";

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

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user?: User | null;
}

const userTypes = [
  { id: 1, name: "Yönetici", value: "admin" },
  { id: 2, name: "Operatör", value: "operator" },
  { id: 3, name: "Teknisyen", value: "technician" },
  { id: 4, name: "Sürücü", value: "driver" },
];

const availableRoles = [
  "Dashboard Görüntüleme",
  "Talepler Yönetimi",
  "Bakım Yönetimi",
  "Hasar Yönetimi",
  "Arıza Yönetimi",
  "Lastik Yönetimi",
  "Muayene Yönetimi",
  "Araç Bağlama ve Kurtarma",
  "Şikayetler Yönetimi",
  "Kullanıcı Yönetimi",
  "Rapor Görüntüleme",
];

const userSchema = z
  .object({
    firstName: z.string().min(1, { message: "Ad alanı zorunludur" }),
    lastName: z.string().min(1, { message: "Soyad alanı zorunludur" }),
    username: z.string().min(1, { message: "Kullanıcı adı zorunludur" }),
    email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
    userType: z.string().min(1, { message: "Kullanıcı tipi seçilmelidir" }),
    roles: z.array(z.string()),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    forcePasswordChange: z.boolean(),
    isActive: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.password && data.password.length < 6) {
        return false;
      }
      return true;
    },
    {
      message: "Şifre en az 6 karakter olmalıdır",
      path: ["password"],
    },
  )
  .refine(
    (data) => {
      if (data.password && data.password !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Şifreler eşleşmiyor",
      path: ["confirmPassword"],
    },
  );

type UserFormData = z.infer<typeof userSchema>;

export default function UserModal({
  isOpen,
  onClose,
  onSave,
  user,
}: UserModalProps) {
  const isNewUser = !user;

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      userType: "",
      roles: [],
      password: "",
      confirmPassword: "",
      forcePasswordChange: false,
      isActive: true,
    },
    mode: "onChange",
  });

  const watchedRoles = watch("roles") || [];

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        userType: user.userType || "",
        roles: user.roles || [],
        password: "",
        confirmPassword: "",
        forcePasswordChange: user.forcePasswordChange || false,
        isActive: user.isActive !== undefined ? user.isActive : true,
      });
    } else {
      reset({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        userType: "",
        roles: [],
        password: "",
        confirmPassword: "",
        forcePasswordChange: false,
        isActive: true,
      });
    }
  }, [user, isOpen, reset]);

  const onSubmit = async (data: UserFormData) => {
    if (isNewUser && !data.password) {
      await trigger("password");
      return;
    }

    const userData: User = {
      id: user?.id,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      userType: data.userType,
      roles: data.roles,
      password: data.password || "",
      confirmPassword: data.confirmPassword || "",
      forcePasswordChange: data.forcePasswordChange,
      isActive: data.isActive,
    };
    onSave(userData);
  };

  const handleRoleToggle = (role: string) => {
    const currentRoles = watchedRoles;
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter((r) => r !== role)
      : [...currentRoles, role];
    setValue("roles", newRoles);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {user ? "Kullanıcı Düzenle" : "Yeni Kullanıcı Ekle"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ControlledInput<UserFormData>
              control={control}
              name="firstName"
              label="Ad"
              placeholder="Ad giriniz"
              required
            />

            <ControlledInput<UserFormData>
              control={control}
              name="lastName"
              label="Soyad"
              placeholder="Soyad giriniz"
              required
            />
          </div>

          <ControlledInput<UserFormData>
            control={control}
            name="username"
            label="Kullanıcı Adı"
            placeholder="Kullanıcı adı giriniz"
            required
          />

          <ControlledInput<UserFormData>
            control={control}
            name="email"
            type="email"
            label="E-posta"
            placeholder="E-posta giriniz"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kullanıcı Tipi <span className="text-red-500">*</span>
            </label>
            <select
              {...control.register("userType")}
              className={`w-full h-14 border border-gray-300 rounded-md px-3 ${
                errors.userType ? "border-red-500" : ""
              }`}
            >
              <option value="">Kullanıcı tipi seçiniz</option>
              {userTypes.map((type) => (
                <option key={type.id} value={type.value}>
                  {type.name}
                </option>
              ))}
            </select>
            {errors.userType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.userType.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Roller
            </label>
            <div className="flex flex-wrap gap-2">
              {availableRoles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleToggle(role)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm border ${
                    watchedRoles.includes(role)
                      ? "bg-blue-100 text-blue-800 border-blue-300"
                      : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  <span>{role}</span>
                </button>
              ))}
            </div>
          </div>

          {!user && (
            <div className="grid grid-cols-2 gap-4">
              <ControlledInput<UserFormData>
                control={control}
                name="password"
                type="password"
                label="Şifre"
                placeholder="Şifre giriniz"
                required={isNewUser}
              />

              <ControlledInput<UserFormData>
                control={control}
                name="confirmPassword"
                type="password"
                label="Şifre Tekrar"
                placeholder="Şifreyi tekrar giriniz"
                required={isNewUser}
              />
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="forcePasswordChange"
                {...control.register("forcePasswordChange")}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="forcePasswordChange"
                className="ml-2 text-sm text-gray-700"
              >
                İlk girişte şifre değiştirilmesi zorunlu olsun
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                {...control.register("isActive")}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                Aktif mi?
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit" className="bg-[#1249BD] hover:bg-[#0B2F7B]">
              {user ? "Güncelle" : "Ekle"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
