"use client";
import React from "react";
import { toast } from "./use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, ImageIcon, Trash2 } from "lucide-react";
import { Button } from "./button";
import { IconButton } from "./icon-button";
import dynamic from "next/dynamic";

// Viewer'ı dinamik import et, ssr kapalı
const Viewer = dynamic(() => import("react-viewer"), { ssr: false });
export interface IFileProps {
  file?: any;
}

const getExtension = (fileName: string) => {
  return fileName.split(".").pop();
};

const renderFileIcon = (fileName: string) => {
  const extension = getExtension(fileName);
  switch (extension) {
    case "docx":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3294_35699)">
            <rect width="48" height="48" fill="#E6ECFF" />
            <path
              d="M15.2238 20.994L16.8238 27.394C16.9006 27.7012 17.1514 27.9342 17.4634 27.9882C17.7754 28.0423 18.0899 27.9072 18.2656 27.6437L19.1999 26.2422L20.1343 27.6437C20.31 27.9072 20.6245 28.0423 20.9365 27.9882C21.2485 27.9342 21.4993 27.7012 21.5761 27.394L23.1761 20.994L21.6238 20.606L20.4624 25.2515L19.8656 24.3562C19.7172 24.1337 19.4674 24 19.1999 24C18.9325 24 18.6827 24.1337 18.5343 24.3562L17.9374 25.2515L16.7761 20.606L15.2238 20.994Z"
              fill="#1A50FF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.6 12C16.2745 12 15.2 13.0745 15.2 14.4V16.8H14.4C13.0745 16.8 12 17.8745 12 19.2V28.8C12 30.1255 13.0745 31.2 14.4 31.2H15.2V33.6C15.2 34.9255 16.2745 36 17.6 36H33.6C34.9255 36 36 34.9255 36 33.6V14.4C36 13.0745 34.9255 12 33.6 12H17.6ZM14.4 18.4C13.9582 18.4 13.6 18.7582 13.6 19.2V28.8C13.6 29.2418 13.9582 29.6 14.4 29.6H24C24.4418 29.6 24.8 29.2418 24.8 28.8V19.2C24.8 18.7582 24.4418 18.4 24 18.4H14.4Z"
              fill="#1A50FF"
            />
          </g>
          <defs>
            <clipPath id="clip0_3294_35699">
              <rect width="48" height="48" rx="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "xlsx":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3294_36640)">
            <rect width="48" height="48" fill="#E9FDF8" />
            <path
              d="M18.0687 24L15.4344 21.3656L16.5657 20.2343L19.2001 22.8686L21.8344 20.2343L22.9657 21.3656L20.3314 24L22.9657 26.6343L21.8344 27.7656L19.2001 25.1313L16.5657 27.7656L15.4344 26.6343L18.0687 24Z"
              fill="#18BA92"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.6 12C16.2745 12 15.2 13.0745 15.2 14.4V16.8H14.4C13.0745 16.8 12 17.8745 12 19.2V28.8C12 30.1255 13.0745 31.2 14.4 31.2H15.2V33.6C15.2 34.9255 16.2745 36 17.6 36H33.6C34.9255 36 36 34.9255 36 33.6V14.4C36 13.0745 34.9255 12 33.6 12H17.6ZM14.4 18.4C13.9582 18.4 13.6 18.7582 13.6 19.2V28.8C13.6 29.2418 13.9582 29.6 14.4 29.6H24C24.4418 29.6 24.8 29.2418 24.8 28.8V19.2C24.8 18.7582 24.4418 18.4 24 18.4H14.4Z"
              fill="#18BA92"
            />
          </g>
          <defs>
            <clipPath id="clip0_3294_36640">
              <rect width="48" height="48" rx="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "bmp":
    case "gif":
    case "tif":
    case "tiff":
    case "webp":
    case "jpg":
    case "jpeg":
    case "png":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3805_58694)">
            <rect width="48" height="48" fill="#FFF1E6" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.6 14.4C13.6 13.0745 14.6745 12 16 12H29.1314L34.4 17.2686V28.4665L30.4007 24.4611L25.6662 29.1925L19.1997 21.1199L13.6 28.1195V14.4ZM29.6 21.6H28V20H29.6V21.6Z"
              fill="#FFB780"
            />
            <path
              d="M13.6 30.6808V33.6C13.6 34.9255 14.6745 36 16 36H32C33.3255 36 34.4 34.9255 34.4 33.6V30.731L30.3995 26.7243L25.534 31.5867L19.2005 23.6802L13.6 30.6808Z"
              fill="#FFB780"
            />
          </g>
          <defs>
            <clipPath id="clip0_3805_58694">
              <rect width="48" height="48" rx="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "pdf":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3805_59781)">
            <rect width="48" height="48" fill="#F9F9F9" />
            <path
              d="M17.6 24.8H16.8V23.2H17.6C18.0418 23.2 18.4 23.5582 18.4 24C18.4 24.4418 18.0418 24.8 17.6 24.8Z"
              fill="#615E69"
            />
            <path
              d="M23.2 28V23.2H24C24.4418 23.2 24.8 23.5582 24.8 24V27.2C24.8 27.6418 24.4418 28 24 28H23.2Z"
              fill="#615E69"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.6 14.4C13.6 13.0745 14.6745 12 16 12H29.1314L34.4 17.2686V33.6C34.4 34.9255 33.3255 36 32 36H16C14.6745 36 13.6 34.9255 13.6 33.6V14.4ZM17.6 21.6H15.2V29.6H16.8V26.4H17.6C18.9255 26.4 20 25.3255 20 24C20 22.6745 18.9255 21.6 17.6 21.6ZM24 21.6H21.6V29.6H24C25.3255 29.6 26.4 28.5255 26.4 27.2V24C26.4 22.6745 25.3255 21.6 24 21.6ZM28 29.6V21.6H32.8V23.2H29.6V24.8H31.2V26.4H29.6V29.6H28Z"
              fill="#615E69"
            />
          </g>
          <defs>
            <clipPath id="clip0_3805_59781">
              <rect width="48" height="48" rx="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "zip":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3805_59725)">
            <rect width="48" height="48" fill="#FEEAEA" />
            <path
              d="M19.2 12C17.8745 12 16.8 13.0745 16.8 14.4V25.6C16.8 26.9255 17.8745 28 19.2 28H33.6C34.9255 28 36 26.9255 36 25.6V17.6C36 16.2745 34.9255 15.2 33.6 15.2H27.5314L24.3314 12H19.2Z"
              fill="#F76969"
            />
            <path
              d="M31.2 29.6H19.2C16.9909 29.6 15.2 27.8091 15.2 25.6V20H14.4C13.0745 20 12 21.0745 12 22.4V33.6C12 34.9255 13.0745 36 14.4 36H28.8C30.1255 36 31.2 34.9255 31.2 33.6V29.6Z"
              fill="#F76969"
            />
          </g>
          <defs>
            <clipPath id="clip0_3805_59725">
              <rect width="48" height="48" rx="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    default:
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3805_56315)">
            <rect width="48" height="48" fill="#F9F9F9" />
            <path
              d="M14.4 13.6C13.0745 13.6 12 14.6745 12 16V32C12 33.3255 13.0745 34.4 14.4 34.4H33.6C34.9255 34.4 36 33.3255 36 32V19.2C36 17.8745 34.9255 16.8 33.6 16.8H24.3314L21.1314 13.6H14.4Z"
              fill="#615E69"
            />
          </g>
          <defs>
            <clipPath id="clip0_3805_56315">
              <rect width="48" height="48" rx="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
  }
};

const File = React.forwardRef<HTMLDivElement, IFileProps>(({ file }, ref) => {
  const deleteFile = async () => {
    const query = file.fileRecord.id ? `?id=${file.fileRecord.id}` : "";
    const response = await fetch(`/api/file${query}`, { method: "DELETE" });

    if (response.ok) {
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
    }
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");

  const isImage = String(file?.fileRecord?.fileType).includes("image");

  const fetchImage = async () => {
    const response = await fetch(
      `/api/file/download?fileName=${encodeURIComponent(
        file.fileRecord.uniqueFileName,
      )}&originalFileName=${encodeURIComponent(
        file.fileRecord.originalFileName,
      )}&filePath=${encodeURIComponent(file.fileRecord.filePath)}`,
    );
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
  };

  const showImage = async () => {
    const url = await fetchImage();
    setImageUrl(url);
    setVisible(true);
  };

  const downloadFile = async () => {
    const query =
      file && file.fileRecord.appModule != null
        ? `?fileName=${encodeURIComponent(
            file.fileRecord.uniqueFileName,
          )}&originalFileName=${encodeURIComponent(
            file.fileRecord.originalFileName,
          )}&filePath=${encodeURIComponent(
            file.fileRecord.filePath,
          )}&appModule=${encodeURIComponent(
            file.fileRecord.appModule.toString(),
          )}`
        : "";

    const response = await fetch(`/api/file/download${query}`);
    const urlvalue = await response.blob();
    const url = window.URL.createObjectURL(urlvalue);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.fileRecord.originalFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (response.ok) {
      return toast({
        title: "Başarılı",
        variant: "success",
      });
    } else {
      return toast({
        title: "Başarısız",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="mt-5 flex h-14 items-center justify-between space-x-4 truncate p-4">
        <div className="flex space-x-3">
          {file && renderFileIcon(file.fileRecord.originalFileName)}
          <div>
            <p className="max-w-xs truncate pt-1.5 text-sm font-normal text-black">
              {file.fileRecord.originalFileName.length > 30
                ? file.fileRecord.originalFileName.slice(0, 30) + "..."
                : file.fileRecord.originalFileName}
            </p>
            <p className="text-xs font-normal text-stone-400">
              {file.fileRecord.fileSize &&
                (file.fileRecord.fileSize / 1000 / 1000).toFixed(2)}{" "}
              Mb
            </p>
          </div>
        </div>

        <div className="flex space-x-1">
          <IconButton
            onClick={(event: any) => {
              event.stopPropagation();
              event.preventDefault();
              if (isImage) {
                showImage();
              } else {
                downloadFile();
              }
            }}
            className="h-full"
          >
            {isImage ? (
              <ImageIcon size={15} color="#77757F" />
            ) : (
              <Download size={15} color="#77757F" />
            )}
          </IconButton>
          <IconButton
            type="button"
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
            className="h-full"
          >
            <Trash2 size={16} color="#77757F" />
          </IconButton>
        </div>
      </div>
      <Viewer
        visible={visible}
        images={[
          {
            src: imageUrl,
            alt: file.fileRecord.originalFileName,
            downloadUrl: imageUrl,
          },
        ]}
        onClose={() => setVisible(false)}
        downloadable
        showTotal={false}
        noNavbar
        changeable={false}
      />
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-h-[800px] max-xs:max-h-full">
          <DialogHeader>
            <DialogTitle>Dosya Sil</DialogTitle>
            <DialogDescription>
              Dosyayı silmek istediğinize emin misiniz?
            </DialogDescription>
          </DialogHeader>
          <div className="imtes-center flex justify-center gap-4">
            <Button
              type="button"
              onClick={(event: any) => {
                event.stopPropagation();
                event.preventDefault();
                deleteFile();
                setIsDeleteModalOpen(false);
              }}
            >
              Evet
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsDeleteModalOpen(false);
              }}
            >
              Hayır
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});
File.displayName = "File";

export { File };
