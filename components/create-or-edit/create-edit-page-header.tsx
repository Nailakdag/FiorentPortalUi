"use client";
import { ArrowLeftIcon, ChevronDownIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { GeneralStatus, WorkOrderReasonCode } from "@/contants/enums";

interface AccordionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface CreateEditPageHeaderProps {
  rightPanel?: React.ReactNode;
  isActionButtonExist?: boolean;
  actionButtonItems?: AccordionItem[];
  isSaveButtonExist?: boolean;
  breadcrumb?: string;
  isLoading?: boolean;
  subReason?: any;
  subTitle?: any;
  backUrl?: string;
  status?: any;
}

export default function CreateEditPageHeader({
  rightPanel,
  isActionButtonExist = true,
  actionButtonItems = [],
  isSaveButtonExist = true,
  breadcrumb = "İş Emirleri",
  isLoading,
  subTitle = "Yeni Talep",
  subReason,
  backUrl,
  status,
}: CreateEditPageHeaderProps) {
  const router = useRouter();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-black shadow-md">
      <div className="flex items-center justify-center h-full px-8">
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (backUrl) {
                  router.push(backUrl);
                } else {
                  router.push("/dashboard/work-orders");
                }
              }}
              type="button"
              className="flex items-center justify-center w-12 h-12 bg-transparent border border-gray-600 rounded hover:bg-gray-800 transition-colors"
              aria-label="Geri Dön"
            >
              <ArrowLeftIcon className="w-4 h-4 text-gray-300" />
            </button>
            <div className="flex items-center gap-2 text-white">
              <span className="text-gray-400 text-2xl">{breadcrumb}</span>
              <span className="text-gray-400 text-2xl">›</span>
              <span
                className={`font-medium text-2xl ${
                  subReason
                    ? getReasonTextColor(subReason.workOrderReasonCode)
                    : "text-white"
                }`}
              >
                {subReason ? subReason?.label : subTitle}
              </span>

              {status && (
                <>
                  <div className="h-5 w-px bg-gray-600 mx-3"></div>
                  <div className="flex items-center text-center justify-center gap-2 rounded-lg px-3 py-1 bg-transparent text-white border border-dashed border-white">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusColor(
                        status.id,
                      )}`}
                    />
                    <span className="text-sm font-medium ">{status.label}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {rightPanel}
            {isActionButtonExist && actionButtonItems.length > 0 && (
              <DropdownMenu.Root
                onOpenChange={setIsAccordionOpen}
                modal={false}
              >
                <DropdownMenu.Trigger asChild>
                  <div className="px-4 items-center gap-1 justify-center flex-1 text-white flex cursor-pointer bg-denizFiloBlue rounded-md hover:bg-blue-600 h-10 transition-colors text-md">
                    İşlemler
                    <ChevronDownIcon
                      className="h-5 w-5 mt-1 text-white-400"
                      aria-hidden="true"
                    />
                  </div>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content
                  className="z-[60] w-[300px] max-h-[300px] overflow-y-auto bg-white border border-borderGray rounded-md shadow-lg"
                  side="bottom"
                  align="end"
                  sideOffset={10}
                >
                  {actionButtonItems.map((item, idx) => (
                    <DropdownMenu.Item
                      key={idx}
                      className="w-full px-2 py-2 font-medium text-left text-primaryGray border-b border-borderGray cursor-pointer hover:bg-borderGray outline-none last:border-b-0"
                    >
                      <div
                        onClick={item.onClick}
                        className="w-full h-full flex items-center justify-start px-2 py-1 gap-2"
                      >
                        {item.icon}
                        {item.label}
                      </div>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {isSaveButtonExist && (
              <Button
                variant="outline"
                disabled={isLoading}
                type="submit"
                className="h-10 text-md px-4 py-2 font-medium text-white border hover:bg-transparent  border-white/40 bg-transparent rounded-md transition-all hover:shadow-lg hover:shadow-white/20 hover:text-white disabled:opacity-50"
              >
                Kaydet
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getReasonTextColor(code: number) {
  switch (code) {
    case WorkOrderReasonCode.WorkOrderReasonCode_Maintenance:
      return "text-blue-400"; // 🔵 Soğuk ve belirgin mavi – Bakım
    case WorkOrderReasonCode.WorkOrderReasonCode_Fault:
      return "text-amber-400"; // 🌹 Sıcak, dikkat çeken pembe-kırmızı – Arıza
    case WorkOrderReasonCode.WorkOrderReasonCode_Damage:
      return "text-rose-400"; // 🟡 Sarımsı turuncu – Hasar
    case WorkOrderReasonCode.WorkOrderReasonCode_InternalReplacementEquipment:
      return "text-emerald-400"; // 💚 Doygun yeşil – İkame
    case WorkOrderReasonCode.WorkOrderReasonCode_ExternalReplacementEquipment:
      return "text-violet-400"; // 🟣 Mor – Dış Kaynak Yedek Ekipman
    case WorkOrderReasonCode.WorkOrderReasonCode_Tire:
      return "text-orange-400"; // 🟠 Parlak turuncu – Lastik
    case WorkOrderReasonCode.WorkOrderReasonCode_PreBackup:
      return "text-lime-400"; // 🟢 Fosforlu yeşil – Ön Yedekleme
    default:
      return "text-white"; // Fallback
  }
}

function getStatusColor(id: number) {
  switch (id) {
    case GeneralStatus.GeneralStatus_New: // Yeni
      return "bg-blue-400";
    case GeneralStatus.GeneralStatus_InProgress: // Devam Ediyor
      return "bg-orange-400";
    case GeneralStatus.GeneralStatus_Approved: // Onaylandı
      return "bg-green-400";
    case GeneralStatus.GeneralStatus_Reject: // Reddedildi
      return "bg-red-500";
    case GeneralStatus.GeneralStatus_Cancelled: // İptal edildi
      return "bg-gray-400";
    case GeneralStatus.GeneralStatus_Completed: // Tamamlandı
      return "bg-indigo-400";
    case GeneralStatus.GeneralStatus_Dispute: // Onaylandı İtiraz Edildi
      return "bg-yellow-400";
    case GeneralStatus.GeneralStatus_MissingDocuments: // Eksik Evrak
      return "bg-rose-400";
    default:
      return "bg-gray-300";
  }
}
