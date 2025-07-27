"use client";

import { useLocaleGeoName } from "@/hooks/useLocaleGeoName";
import { useShotGlassData } from "@/hooks/useShotGlassData";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLoadingBar } from "react-top-loading-bar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import LoadingSpinner from "./LoadingSpinner";

const customStyles = { height: "400px", width: "100%" };

const Map = dynamic(() => import("@/components/shared/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ),
});

const Modal = ({ id }: { id: string }) => {
  const router = useRouter();
  const loadingBar = useLoadingBar();
  const { data, isLoading, isError } = useShotGlassData(id);
  const city = useLocaleGeoName(data?.cityUkr, data?.cityEng);

  useEffect(() => {
    if (!loadingBar) return;

    if (isLoading) {
      loadingBar.start();
    } else {
      loadingBar.complete();
    }
  }, [isLoading, loadingBar]);

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{city}</DialogTitle>
        </DialogHeader>
        <Map
          zoom={6}
          customStyles={customStyles}
          data={data}
          city={city}
          isLoading={isLoading}
          isError={isError}
        />
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
