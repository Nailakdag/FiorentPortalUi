import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export const Footer = () => {
    const CURRENT_YEAR = new Date().getFullYear();
    const PRIVACY_POLICY_URL = "https://www.fiorent.com/fiorent-privacy-policy";

    return (
        <div className="text-center text-xs text-gray-500 space-y-2">
        <div>
          ©{CURRENT_YEAR} Fiorent, Inc. Tüm Hakları Saklıdır.
        </div>
        <Link
          href={PRIVACY_POLICY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Gizlilik Sözleşmesi
          <ArrowTopRightOnSquareIcon className="ml-1 h-3 w-3" />
        </Link>
      </div>
    )
   
}