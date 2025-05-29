import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatMessages: [
    {isViewed:false,
      messageText:  "Hi Doug,\n\n      I hope you\'re doing well. I was thinking about our last conversation and wanted to check in—especially with everything going on at Boeing recently. I saw the recent updates about leadership restructuring and the continued focus on operational excellence. I imagine it’s been a demanding but pivotal time at the top.\n\n      I also remembered you mentioned your love for cars, and it struck me how much overlap there is between precision engineering in aerospace and the craftsmanship in automotive design. Given your background, I thought you might enjoy these two reads:\n\n      “From Jetliners to Racetracks: What Aerospace Can Teach Car Design” (A fascinating piece on engineering parallels between aircraft and hypercars.)\n\n      “Boeing’s Operational Reset: What the Aviation Industry Is Watching in Q3” (A current analysis on Boeing’s recent moves and what they signal for global aviation.)\n\n      If you\'re open to it, I\'d love to reconnect—whether it\'s about where we left off or just catching up on priorities for the year. I’d be happy to tailor our platform more closely to Boeing’s evolving goals if the timing is right.\n\n      Let me know what works for you. Even a quick reply would be appreciated.",
      unread:0,
      user1:"yZIpS4WcZxZ150nesewtKL5U6w43",
      user2:"m1aFbUYJCDhIFrFia4EbHVoALIk1",
      time:"2025-04-21T12:57:40.205Z" 

    

     },
  ],
  isLoading: false,
  chatStarted: false,
  selectedChatUser: null,
  message: '',
  error: '',
};

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    fetchChatsPending: (state) => {
        state.isLoading = true;
        state.error = '';
        state.message = '';
      },
      fetchChatsSuccess: (state, action) => {
        state.isLoading = false;
        state.chatMessages = action.payload;
        state.error = '';
    },
    fetchChatsFailed: (state, { payload }) => {
       state.isLoading = false;
       state.error = payload.errorMessage;
    },
    setCurrentChat: (state, action) => {
       state.chatStarted = true;
       state.selectedChatUser = action.payload;
    },
    clearChat: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = chatSlice;

export const {
 fetchChatsPending,
 fetchChatsSuccess,
 fetchChatsFailed,
 setCurrentChat,
 clearChat,
} = actions;

export default reducer;


/*

"Hi Doug,

      I hope you're doing well. I was thinking about our last conversation and wanted to check in—especially with everything going on at Boeing recently. I saw the recent updates about leadership restructuring and the continued focus on operational excellence. I imagine it’s been a demanding but pivotal time at the top.
      
      I also remembered you mentioned your love for cars, and it struck me how much overlap there is between precision engineering in aerospace and the craftsmanship in automotive design. Given your background, I thought you might enjoy these two reads:
      
      “From Jetliners to Racetracks: What Aerospace Can Teach Car Design” (A fascinating piece on engineering parallels between aircraft and hypercars.)
      
      “Boeing’s Operational Reset: What the Aviation Industry Is Watching in Q3” (A current analysis on Boeing’s recent moves and what they signal for global aviation.)
      
      If you're open to it, I'd love to reconnect—whether it's about where we left off or just catching up on priorities for the year. I’d be happy to tailor our platform more closely to Boeing’s evolving goals if the timing is right.
      
      Let me know what works for you. Even a quick reply would be appreciated."

*/