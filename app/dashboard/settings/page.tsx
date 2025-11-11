"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../../components/ui/button";
import { ControlledInput } from "../../../components/ui/controlled-input";
import { useToast } from "../../../components/ui/use-toast";

const profileSchema = z.object({
  name: z.string().min(1, { message: "Ad alanı zorunludur" }),
  surname: z.string().min(1, { message: "Soyad alanı zorunludur" }),
  phone: z.string().min(1, { message: "Telefon alanı zorunludur" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
});

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Mevcut şifre alanı zorunludur" }),
    newPassword: z
      .string()
      .min(6, { message: "Yeni şifre en az 6 karakter olmalıdır" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Şifre tekrarı alanı zorunludur" }),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmPassword;
    },
    {
      message: "Şifreler uyuşmuyor",
      path: ["confirmPassword"],
    },
  );

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      surname: "",
      phone: "",
      email: "",
    },
  });

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfilePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Hata",
          description: "Dosya boyutu 5MB'dan büyük olamaz",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Hata",
          description: "Sadece resim dosyaları yüklenebilir",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      toast({
        title: "Başarılı",
        description: "Profil fotoğrafınız başarıyla güncellendi",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Ayarlar → Kullanıcı Bilgilerim
        </h1>
        <Button onClick={handleProfileSubmit(onProfileSubmit)}>Kaydet</Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Genel Bilgiler
        </h2>

        <div className="flex items-start space-x-8">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden relative">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profil Fotoğrafı"
                  fill
                  className="object-cover rounded-full"
                  sizes="(max-width: 128px) 100vw, 128px"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <label className="cursor-pointer">
              <span className="text-blue-600 text-sm hover:underline">
                Profil Fotoğrafını Değiştir
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ControlledInput<ProfileFormData>
              control={profileControl}
              name="name"
              label="Ad"
              placeholder="Adınızı giriniz"
              required
            />

            <ControlledInput<ProfileFormData>
              control={profileControl}
              name="surname"
              label="Soyad"
              placeholder="Soyadınızı giriniz"
              required
            />

            <ControlledInput<ProfileFormData>
              control={profileControl}
              name="phone"
              label="Telefon Numarası"
              placeholder="Telefon numaranızı giriniz"
              required
            />

            <ControlledInput<ProfileFormData>
              control={profileControl}
              name="email"
              type="email"
              label="E-posta"
              placeholder="E-posta adresinizi giriniz"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Şifre İşlemleri
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <ControlledInput<PasswordFormData>
            control={passwordControl}
            name="currentPassword"
            type="password"
            label="Mevcut Şifre"
            placeholder="Mevcut şifrenizi giriniz"
            required
          />

          <ControlledInput<PasswordFormData>
            control={passwordControl}
            name="newPassword"
            type="password"
            label="Yeni Şifre"
            placeholder="Yeni şifrenizi giriniz"
            required
          />

          <ControlledInput<PasswordFormData>
            control={passwordControl}
            name="confirmPassword"
            type="password"
            label="Yeni Şifre Tekrar"
            placeholder="Yeni şifrenizi tekrar giriniz"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handlePasswordSubmit(onPasswordSubmit)}>
            Şifreyi Değiştir
          </Button>
        </div>
      </div>
    </div>
  );
}
