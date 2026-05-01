import { Pin, Calendar, Tag, Edit3, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";

const NoteCard = ({ note, onEdit, onDelete, onTogglePin, onView }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white border border-slate-200 rounded-xl p-6 relative group shadow-sm hover:shadow-md transition-all flex flex-col h-full"
    >
      <button
        onClick={() => onTogglePin(note)}
        className={`absolute right-4 top-4 p-2 rounded-lg transition-all ${note.isPinned ? "text-indigo-600 bg-indigo-50" : "text-slate-300 hover:text-slate-500 hover:bg-slate-50"}`}
      >
        <Pin size={18} fill={note.isPinned ? "currentColor" : "none"} />
      </button>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 pr-8 line-clamp-1">
          {note.title}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-slate-400">
          <Calendar size={12} />
          {new Date(note.updatedAt).toLocaleDateString()}
        </div>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-slate-600 line-clamp-4">
        {note.content}
      </p>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {note.tags.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200"
          >
            <Tag size={10} />
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-1 opacity-100 transition-opacity">
        <button
          onClick={() => onView(note)}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
          title="View Note"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={() => onEdit(note)}
          className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
          title="Edit Note"
        >
          <Edit3 size={18} />
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
          title="Delete Note"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default NoteCard;
