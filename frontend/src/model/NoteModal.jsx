import { X, Pin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NoteModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, setTitle, 
  content, setContent, 
  tags, setTags, 
  isPinned, setIsPinned,
  submitting,
  isEditing
}) => {
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
            className="bg-white w-full max-w-xl rounded-xl p-8 shadow-xl relative"
          >
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>

            <h2 className="mb-6 text-xl font-bold text-slate-900">
              {isEditing ? 'Edit Note' : 'New Note'}
            </h2>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter title..."
                  className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Content</label>
                <textarea 
                  rows={6}
                  required
                  placeholder="Write your note here..."
                  className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Tags</label>
                <input 
                  type="text" 
                  placeholder="Work, Personal, Ideas (separated by comma)"
                  className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPinned(!isPinned)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${isPinned ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-50'}`}
                >
                  <Pin size={16} fill={isPinned ? 'currentColor' : 'none'} />
                  {isPinned ? 'Pinned' : 'Pin Note'}
                </button>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg bg-slate-100 py-3 font-semibold text-slate-600 hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-[2] rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : isEditing ? 'Save Changes' : 'Create Note'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NoteModal;
