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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ShotGlass ID: {id}</DialogTitle>
          <DialogDescription>
            More info about the shot glass #{id}.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>Here you can show the image, description, etc.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
