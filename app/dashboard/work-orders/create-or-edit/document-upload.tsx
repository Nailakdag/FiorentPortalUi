"use client";

import React, { useEffect, useState } from "react";
import CardContainer from "@/components/ui/card-container";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import FileUploadComponent from "@/components/forms/file-add-form";
import { File } from "@/components/ui/file";
import { useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { IconButton } from "@/components/ui/icon-button";
import { Plus } from "lucide-react";

export default function DocumentUpload() {
  const [openCreateNoteModal, setOpenCreateNoteModal] = useState(false);
  const searchParams = useSearchParams();
  const [files, setFiles] = useState<any[]>([]);

  const fetchFiles = async () => {
    const currentQueryParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );
    currentQueryParams.set("appModule", "122");

    const search = currentQueryParams.toString();
    const query = search ? `?${search}` : "";

    const response = await fetch(`/api/file${query}`);

    if (!response?.ok) {
      return toast({
        title: "Beklenmedik bir hata oluştu.",
        description: "Lütfen daha sonra tekrar deneyin.",
        variant: "destructive",
      });
    }

    const files = await response.json();

    if (files) {
      setFiles(files);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [searchParams]);

  return (
    <>
      <CardContainer
        title="Doküman Yükle"
        headerAction={
          <button onClick={() => setOpenCreateNoteModal(true)} type="button">
            <Plus className="bg-purple-500 rounded text-white" />
          </button>
        }
        icon={<DocumentArrowUpIcon />}
        colorScheme="purple"
      >
        {files && files.length > 0 ? (
          files.map((file: any, index: number) => {
            return <File key={index} file={file} />;
          })
        ) : (
          <>
            <IconButton
              type="button"
              onClick={() => setOpenCreateNoteModal(true)}
              className={`group relative overflow-hidden bg-gradient-to-br from-white-50 to-blue-50 hover:from-blue-50 hover:to-blue-50 border border-solid border-purple-700 hover:border-purple-400 rounded-xl py-12 px-6 w-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200 `}
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
            </IconButton>
          </>
        )}
      </CardContainer>

      <Dialog open={openCreateNoteModal} onOpenChange={setOpenCreateNoteModal}>
        <DialogContent className="max-h-[800px] max-xs:max-h-full">
          <DialogHeader>
            <DialogTitle>Yeni Dosya Ekle</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <FileUploadComponent closeModal={setOpenCreateNoteModal} />
        </DialogContent>
      </Dialog>
    </>
  );
}
