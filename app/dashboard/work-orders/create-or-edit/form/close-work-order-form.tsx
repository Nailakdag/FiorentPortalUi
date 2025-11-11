"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import * as React from "react";
import { useState } from "react";
import { useWorkOrderContext } from "../context/workOrderContext";

interface IAddItemFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: any;
  setIsOpen: any;
  row: any;
  handleEvent?: any;
}

type FormData = {
  startingDate: null;
  endingDate: null;
  planningEndingDate: null;
};

export function CloseWorkOrderForm({
  isOpen,
  setIsOpen,
  row,
  handleEvent,
}: IAddItemFormProps) {
  const rowOriginal = row;

  const { workOrder } = useWorkOrderContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    if (data?.startingDate) {
      setIsLoading(true);
      const url = "/api/services/work-order/spare-parts/create-or-edit";

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({}),
      });
      if (response.ok) {
        setIsOpen(false);
        toast({
          title: "Başarılı",
          variant: "success",
        });
        handleEvent?.();
      } else {
        toast({
          title: "Başarısız",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    } else {
      toast({
        title: "Lütfen zorunlu alanları doldurunuz",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="relative overflow-y-auto pl-4 pr-4">
      <div className="p-4">
        <p className="text-left mb-4 text-lg">
          İşleme devam etmek istediğinize emin misiniz?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Hayır
          </Button>
          <Button
            onClick={() => {
              // Handle close work order logic here
              setIsOpen(false);
            }}
          >
            Evet
          </Button>
        </div>
      </div>
    </div>
  );
}
