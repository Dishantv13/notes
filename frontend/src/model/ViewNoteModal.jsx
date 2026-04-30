import { X, Calendar, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ViewNoteModal = ({ isOpen, onClose, note }) => {
  if (!note) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white w-full max-w-2xl rounded-xl p-8 shadow-xl relative max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 pr-8">{note.title}</h2>
              <div className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Calendar size={14} />
                Last updated: {new Date(note.updatedAt).toLocaleDateString()}
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg">
                {note.content}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, i) => (
                  <span key={i} className="flex items-center gap-1 rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200">
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-lg bg-slate-900 px-6 py-2.5 font-semibold text-white hover:bg-slate-800 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ViewNoteModal;
