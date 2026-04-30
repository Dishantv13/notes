import * as noteService from '../services/note.services.js';
import { validationResult } from 'express-validator';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/response.js';
import { HTTP_STATUS } from '../utils/httpCode.js';
import { NOTE_MESSAGES, VALIDATION_MESSAGE } from '../utils/successMessage.js';
import ApiError from '../utils/apiError.js';

export const getNotes = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const notes = await noteService.getNotes(req.user._id, search);
  successResponse(res, notes, HTTP_STATUS.OK, NOTE_MESSAGES.NOTE_FETCHED);
});

export const createNote = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, VALIDATION_MESSAGE.VALIDATION_FAILED, errors.array());
  }

  const note = await noteService.createNote(req.user._id, req.body);
  successResponse(res, note, HTTP_STATUS.CREATED, NOTE_MESSAGES.NOTE_CREATED);
});

export const updateNote = asyncHandler(async (req, res) => {
  const note = await noteService.updateNote(req.user._id, req.params.id, req.body);
  successResponse(res, note, HTTP_STATUS.OK, NOTE_MESSAGES.NOTE_UPDATED);
});

export const deleteNote = asyncHandler(async (req, res) => {
  await noteService.deleteNote(req.user._id, req.params.id);
  successResponse(res, null, HTTP_STATUS.OK, NOTE_MESSAGES.NOTE_DELETED);
});
