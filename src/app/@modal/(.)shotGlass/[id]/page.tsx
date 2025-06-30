import Map from "@/components/shared/Map";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default async function ShotGlassModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Dialog open={true}>
      <DialogContent className="p-0 w-[1060px] max-w-[1060px] min-h-[540px] bg-white overflow-hidden">
        <DialogHeader>
          <DialogTitle>ShotGlass ID: {id}</DialogTitle>
          <DialogDescription>
            More info about the shot glass #{id}.
          </DialogDescription>
        </DialogHeader>
        <Map id={id} />
      </DialogContent>
    </Dialog>
  );
}
