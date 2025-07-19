import Modal from "@/components/shared/Modal";

export default async function ShotGlassModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <Modal id={id} />;
}
