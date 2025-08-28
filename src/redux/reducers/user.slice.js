import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allUsers: [],
  filteredUsers:[],
  allContacts: [],
  filteredContacts:[],
  liveUsers: [],
  connectedUsers: [],
  connects: [],
  connects2: [],
  isLoading: false,
  editedParagraphs:{},
  chatGptAnswer:{},
  aiTrigger:'',
  candidateInFocus:{},
  info: '',
  error: '',
  message: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersPending: (state) => {
        state.isLoading = true;
        state.error = '';
        state.message = '';
      },
      fetchUsersSuccess: (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload;
        state.filteredUsers = action.payload;
        state.error = '';
        state.message = action.payload.msg;
    },
    fetchContactsSuccess: (state, action) => {
        state.isLoading = false;
        state.allContacts = action.payload;
        state.filteredContacts = action.payload;
        state.error = '';
        state.message = action.payload.msg; 
    },
    saveFilteredUsers: (state, action) => { 
      state.filteredUsers = action.payload;
     
  },
  saveEditedParagraphs: (state, action) => { 
    state.editedParagraphs = action.payload;
   
},
saveChatGptAnswer: (state, action) => { 
  state.chatGptAnswer = action.payload;
 
},
saveAiTrigger: (state, action) => { 
  state.aiTrigger = action.payload;
 
},
  saveFilteredContacts: (state, action) => { 
      state.filteredContacts = action.payload;
  },
  saveCandidateInFocus: (state, action) => { 
    state.candidateInFocus = action.payload;
   
},
    fetchRealTimeUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.liveUsers = action.payload;
      state.error = '';
      state.message = action.payload.msg;
  },
  fetchConnectedUserSuccess: (state, action) => {
    state.isLoading = false;
    state.connectedUsers = action.payload;
    state.error = '';
    state.message = action.payload.msg;
},
    fetchUsersFailed: (state, { payload }) => {
      (state.isLoading = false);
        (state.error = payload.errorMessage);
    },
    fetchContactsFailed: (state, { payload }) => {
      (state.isLoading = false);
        (state.error = payload.errorMessage);
    },
    initiatePending: (state) => {
      state.isLoading = true;
      state.error = '';
      state.message = '';
    },
    initiateSuccess: (state, action) => {
      state.isLoading = false;
      state.connects = action.payload;
      state.error = '';
  },
    initiateSuccess2: (state, action) => {
      state.isLoading = false;
      state.connects2 = action.payload;
      state.error = '';
  },
  initiateFailed: (state, { payload }) => {
     state.isLoading = false;
     state.info = payload.errorMessage;
  },
  resetConnects: (state, { payload }) => {
    state.connectedUsers = [];
 },
    clearUser: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = userSlice;

export const {
 fetchUsersPending,
 fetchUsersSuccess,
 fetchContactsSuccess,
 fetchContactsFailed,
 saveFilteredUsers,
 saveEditedParagraphs,
 saveChatGptAnswer,
 saveAiTrigger,
 saveFilteredContacts,
 saveCandidateInFocus,
 fetchRealTimeUsersSuccess,
 fetchConnectedUserSuccess,
 fetchUsersFailed,
 initiatePending,
 initiateSuccess,
 initiateSuccess2,
 initiateFailed,
 resetConnects,
 clearUser,
} = actions;

export default reducer;


