"use client";

import { DocumentArrowUpIcon } from "@heroicons/react/20/solid";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

interface IFileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  closeModal: any;
}

export default function FileUploadComponent({ closeModal }: IFileUploadProps) {
  const searchParams = useSearchParams();
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessageActive, setErrorMessageActive] = useState<boolean>(false);

  const onDrop = useCallback(
    (droppedFiles: File[]) => {
      const updatedFiles = [...acceptedFiles, ...droppedFiles];
      setAcceptedFiles(updatedFiles);
    },
    [acceptedFiles],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
      "image/bmp": [".bmp"],
      "image/tiff": [".tiff", ".tif"],
      "image/webp": [".webp"],
      "text/html": [".html", ".htm"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.ms-excel": [".xls", ".xlsx"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxSize: 5 * 1024 * 1024,
    onDrop,
  });

  const handleSave = async () => {
    setIsLoading(true);
    setErrorMessageActive(false);
    const id = searchParams.get("id");

    if (acceptedFiles.length < 1) {
      setErrorMessageActive(true);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files", file);
    });

    if (id != null) {
      formData.append("appModule", "122");
      formData.append("relatedRecordId", id);
    }

    try {
      const response = await fetch("/api/file", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setAcceptedFiles([]);
        closeModal(false);
        location.reload();
        toast({
          title: "Başarılı",
          variant: "success",
        });
      } else {
        toast({
          title: "Başarısız",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (error) {}
  };

  return (
    <div>
      <p className="ml-4">Dosyanız Maksimum 5 Mb olmalıdır</p>
      {errorMessageActive ? (
        <p className="ml-4 text-red-500">
          Lütfen eklemek istediğiniz dosyayı ekleyiniz
        </p>
      ) : null}

      <section className="container p-0 ">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className="relative mt-3 flex h-40 w-full flex-col items-center justify-center rounded-xl bg-slate-50">
            <DocumentArrowUpIcon className="h-14" />
            <div className="mt-2">Sürükle ve bırak, dosyanızı yükleyin</div>
          </div>
        </div>
      </section>
      <aside className="ml-4">
        <ul>
          {acceptedFiles.map((file, index) => (
            <li key={index}>
              {file.name} - {file.size} bytes
            </li>
          ))}
        </ul>
      </aside>

      <div className="m-4 text-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className="mr-2 mt-1 h-4 w-4 animate-spin" />
          )}
          Kaydet
        </Button>
      </div>
    </div>
  );
}
