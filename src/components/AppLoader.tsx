"use client";

import { RefreshCw } from "lucide-react";
import TextHeader from "./TextHeader";

interface AppLoaderProps {
  title?: string;
}

const AppLoader: React.FC<AppLoaderProps> = ({ title = "Please Wait..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#007381]/70 z-100000">
      <div className="w-60 h-32 flex flex-col justify-evenly items-center rounded bg-[#007381] shadow-lg p-4">
        {/* Loader Spinner */}
        <RefreshCw className="h-8 w-8 animate-spin text-white" />

        {/* Title */}
        <TextHeader title={title} fontSize="text-lg" textColor="text-white" />
      </div>
    </div>
  );
};

export default AppLoader;
