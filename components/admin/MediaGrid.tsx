"use client";

type Media = {
  id: string;
  url: string;
  secureUrl?: string;
  name: string;
  type: string;
  bytes?: number;
  width?: number;
  height?: number;
  format?: string;
  folder?: string;
};

export default function MediaGrid({ media }: { media: Media[] }) {
  if (media.length === 0) {
    return (
      <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-10 text-center text-zinc-400">
        No media uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {media.map((item) => {
        const imageUrl = item.secureUrl || item.url;

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]"
          >
            <div className="flex h-44 items-center justify-center bg-black/40">
              {item.type.startsWith("image") ? (
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm text-zinc-400">{item.type}</span>
              )}
            </div>

            <div className="p-4">
              <p className="truncate font-bold">{item.name}</p>

              <p className="mt-1 text-sm text-zinc-500">
                {((item.bytes ?? 0) / 1024).toFixed(1)} KB
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(imageUrl)}
                  className="flex-1 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:border-yellow-400/30 hover:text-yellow-300"
                >
                  Copy URL
                </button>

                <button
                  onClick={async () => {
                    if (!confirm("Delete this image?")) return;

                    await fetch(`/api/admin/media/${item.id}`, {
                      method: "DELETE",
                    });

                    window.location.reload();
                  }}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}