import { Note } from "../models/note.model.js";
import ApiError from "../utils/apiError.js";
import { HTTP_STATUS } from "../utils/httpCode.js";
import { getPagination, getPaginationMeta } from "../utils/pagination.js";

export const getNotes = async (userId, search = "", queryOptions = {}) => {
  const { page, limit, skip } = getPagination(queryOptions);
  const query = { user: userId };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }
  const notes = await Note.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ isPinned: -1, updatedAt: -1 });
  const totalItems = await Note.countDocuments(query);
  const pagination = getPaginationMeta(totalItems, page, limit);

  return { notes, pagination };
};

export const createNote = async (userId, noteData) => {
  const { title, content, tags, isPinned } = noteData;

  if (!title || !content) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Title and content are required",
    );
  }

  const note = new Note({
    user: userId,
    title,
    content,
    tags,
    isPinned,
  });

  return await note.save();
};

export const updateNote = async (userId, noteId, updateData) => {
  const note = await Note.findById(noteId);

  if (!note) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Note not found");
  }

  if (note.user.toString() !== userId.toString()) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Not authorized");
  }

  const { title, content, tags, isPinned } = updateData;
  note.title = title || note.title;
  note.content = content || note.content;
  note.tags = tags || note.tags;
  if (isPinned !== undefined) note.isPinned = isPinned;

  return await note.save();
};

export const deleteNote = async (userId, noteId) => {
  const note = await Note.findById(noteId);

  if (!note) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Note not found");
  }

  if (note.user.toString() !== userId.toString()) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Not authorized");
  }

  return await Note.findByIdAndDelete(noteId);
};
