"use client";
import { useRouter } from "next/navigation";

export default function ShotGlassModal({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold">
          Modal for ShotGlass ID: {params.id}
        </h2>
        <p>Some content about shot glass #{params.id}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
