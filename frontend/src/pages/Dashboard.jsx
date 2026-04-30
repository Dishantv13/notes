import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import { Loader2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { NOTE_URLS } from '../enum/apiUrl';

import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import NoteCard from '../components/NoteCard';
import NoteModal from '../model/NoteModal';
import ViewNoteModal from '../model/ViewNoteModal';
import ChangePasswordModal from '../model/ChangePasswordModal';
import EditProfileModal from '../model/EditProfileModal';
import EmptyState from '../components/EmptyState';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [viewingNote, setViewingNote] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamValue = searchParams.get('search') || '';
  const editNoteId = searchParams.get('edit');
  const viewNoteId = searchParams.get('view');
  const [searchQuery, setSearchQuery] = useState(searchParamValue);
  
  const [currentNote, setCurrentNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchNotes = async (search = '') => {
    try {
      const { data } = await api.get(`${NOTE_URLS.GET_NOTES}?search=${search}`);
      setNotes(data.data);
    } catch (err) {
      console.error('Failed to fetch notes', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes(searchParamValue);
  }, [searchParamValue]);

  useEffect(() => {
    if (!searchQuery.trim() && searchParamValue) {
      const params = {};
      if (editNoteId) params.edit = editNoteId;
      if (viewNoteId) params.view = viewNoteId;
      setSearchParams(params);
    }
  }, [searchQuery, searchParamValue, editNoteId, viewNoteId, setSearchParams]);

  useEffect(() => {
    if (editNoteId && notes.length > 0) {
      const noteToEdit = notes.find(n => n._id === editNoteId);
      if (noteToEdit) {
        setCurrentNote(noteToEdit);
        setTitle(noteToEdit.title);
        setContent(noteToEdit.content);
        setTags(noteToEdit.tags.join(', '));
        setIsPinned(noteToEdit.isPinned);
        setIsModalOpen(true);
      }
    }
  }, [editNoteId, notes]);

  useEffect(() => {
    if (viewNoteId && notes.length > 0) {
      const noteToView = notes.find(n => n._id === viewNoteId);
      if (noteToView) {
        setViewingNote(noteToView);
        setIsViewModalOpen(true);
      }
    }
  }, [viewNoteId, notes]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const params = {};
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (editNoteId) params.edit = editNoteId;
      if (viewNoteId) params.view = viewNoteId;
      setSearchParams(params);
    }
  };

  const openViewModal = (note) => {
    const params = { view: note._id };
    if (searchParamValue) params.search = searchParamValue;
    setSearchParams(params);
  };

  const closeViewModal = () => {
    const params = {};
    if (searchParamValue) params.search = searchParamValue;
    setSearchParams(params);
    setIsViewModalOpen(false);
  };

  const openAddModal = () => {
    setCurrentNote(null);
    setTitle('');
    setContent('');
    setTags('');
    setIsPinned(false);
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    const params = { edit: note._id };
    if (searchParamValue) params.search = searchParamValue;
    setSearchParams(params);
  };

  const closeModal = (force = false) => {
    if (force !== true) {
      const isDirty = currentNote 
        ? (title !== currentNote.title || content !== currentNote.content || tags !== currentNote.tags.join(', ') || isPinned !== currentNote.isPinned)
        : (title.trim() || content.trim() || tags.trim());

      if (isDirty) {
        if (!window.confirm('You have unsaved changes. Are you sure you want to discard them?')) {
          return;
        }
      }
    }

    const params = {};
    if (searchParamValue) params.search = searchParamValue;
    setSearchParams(params);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const noteData = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      isPinned
    };

    try {
      if (currentNote) {
        await api.put(NOTE_URLS.UPDATE_NOTE(currentNote._id), noteData);
        addToast('Note updated successfully!');
      } else {
        await api.post(NOTE_URLS.CREATE_NOTE, noteData);
        addToast('Note created successfully!');
      }
      closeModal(true);
      fetchNotes(searchParamValue);
    } catch (err) {
      addToast(err.response?.data?.message || 'Error saving note', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.delete(NOTE_URLS.DELETE_NOTE(id));
        addToast('Note deleted successfully!');
        fetchNotes(searchParamValue);
      } catch (err) {
        addToast('Error deleting note', 'error');
      }
    }
  };

  const togglePin = async (note) => {
    try {
      await api.put(NOTE_URLS.UPDATE_NOTE(note._id), { isPinned: !note.isPinned });
      addToast(note.isPinned ? 'Note unpinned' : 'Note pinned');
      fetchNotes(searchParamValue);
    } catch (err) {
      addToast('Error toggling pin', 'error');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    const params = {};
    if (editNoteId) params.edit = editNoteId;
    if (viewNoteId) params.view = viewNoteId;
    setSearchParams(params);
  };

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully.');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <Navbar 
        userName={user?.name} 
        onLogout={handleLogout} 
        onChangePassword={() => setIsChangePasswordOpen(true)}
        onEditProfile={() => setIsEditProfileOpen(true)}
      />

      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onSearch={handleSearch}
        onClear={handleClearSearch}
        onAddNote={openAddModal} 
      />

      <div className="mx-auto max-w-6xl">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="animate-spin text-indigo-500" size={48} />
          </div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {notes.map((note) => (
                <NoteCard 
                  key={note._id}
                  note={note}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                  onTogglePin={togglePin}
                  onView={openViewModal}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      <NoteModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        tags={tags}
        setTags={setTags}
        isPinned={isPinned}
        setIsPinned={setIsPinned}
        submitting={submitting}
        isEditing={!!currentNote}
      />

      <ViewNoteModal 
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        note={viewingNote}
      />

      <ChangePasswordModal 
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />

      <EditProfileModal 
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        initialName={user?.name}
      />
    </div>
  );
};

export default Dashboard;
