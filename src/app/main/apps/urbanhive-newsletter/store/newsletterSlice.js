import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createNewsletter = createAsyncThunk(
  'newsletterApp/newsletter/createNewsletter',
  async ({ subject, content, recipients, scheduleDate }, { dispatch, getState }) => {
    const { id: userId } = getState().newsletterApp.user;

    const response = await axios.post('/api/newsletter/create', {
      subject,
      content,
      recipients,
      scheduleDate,
      userId,
    });

    return response.data;
  }
);

export const saveNewsletterDraft = createAsyncThunk(
  'newsletterApp/newsletter/saveNewsletterDraft',
  async ({ subject, content, recipients }, { dispatch, getState }) => {
    const { id: userId } = getState().newsletterApp.user;

    const response = await axios.post('/api/newsletter/save-draft', {
      subject,
      content,
      recipients,
      userId,
    });

    return response.data;
  }
);

export const sendNewsletter = createAsyncThunk(
  'newsletterApp/newsletter/sendNewsletter',
  async ({ newsletterId }, { dispatch, getState }) => {
    const response = await axios.post('/api/newsletter/send', { newsletterId });
    return response.data;
  }
);

const newsletterSlice = createSlice({
  name: 'newsletterApp/newsletter',
  initialState: {
    draft: {
      subject: '',
      content: '',
      recipients: [],
      scheduleDate: null,
    },
    isPreviewOpen: false,
    selectedContacts: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    updateDraft: (state, action) => {
      state.draft = { ...state.draft, ...action.payload };
    },
    setSelectedContacts: (state, action) => {
      state.selectedContacts = action.payload;
    },
    addSelectedContact: (state, action) => {
      const contactId = action.payload;
      if (!state.selectedContacts.includes(contactId)) {
        state.selectedContacts.push(contactId);
      }
    },
    removeSelectedContact: (state, action) => {
      const contactId = action.payload;
      state.selectedContacts = state.selectedContacts.filter(id => id !== contactId);
    },
    toggleContactSelection: (state, action) => {
      const contactId = action.payload;
      const index = state.selectedContacts.indexOf(contactId);
      if (index > -1) {
        state.selectedContacts.splice(index, 1);
      } else {
        state.selectedContacts.push(contactId);
      }
    },
    togglePreview: (state) => {
      state.isPreviewOpen = !state.isPreviewOpen;
    },
    clearDraft: (state) => {
      state.draft = {
        subject: '',
        content: '',
        recipients: [],
        scheduleDate: null,
      };
      state.selectedContacts = [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [createNewsletter.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [createNewsletter.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.draft = {
        subject: '',
        content: '',
        recipients: [],
        scheduleDate: null,
      };
      state.selectedContacts = [];
    },
    [createNewsletter.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [saveNewsletterDraft.pending]: (state) => {
      state.isLoading = true;
    },
    [saveNewsletterDraft.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [saveNewsletterDraft.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [sendNewsletter.pending]: (state) => {
      state.isLoading = true;
    },
    [sendNewsletter.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [sendNewsletter.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const {
  updateDraft,
  setSelectedContacts,
  addSelectedContact,
  removeSelectedContact,
  toggleContactSelection,
  togglePreview,
  clearDraft,
  setLoading,
  setError,
} = newsletterSlice.actions;

export default newsletterSlice.reducer;
