import { StickyNote } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-24 text-center bg-white/50">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-300">
        <StickyNote size={40} />
      </div>
      <h3 className="text-xl font-bold text-slate-900">No notes found</h3>
      <p className="mt-2 text-slate-500">
        Your notes will appear here once you create them.
      </p>
    </div>
  );
};

export default EmptyState;
