import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatMessages: [
    {isViewed:false,
      messageText: "I hope you're doing well and navigating this season with clarity. I saw the recent news about the leadership restructuring at Boeing and immediately thought of you. I can only imagine how much is being navigated at your level—balancing strategic realignment while keeping day-to-day momentum. It must be a challenging but transformative time for your team.\n\n      While reading through some industry updates, I came across a couple of articles that I thought you might enjoy. They touch on themes that are relevant to leadership transition, innovation under pressure, and shifting talent strategies in large organizations:\n\n      • “A breath of fresh air for the national aviation industry” – PwC, March 2025 <a href='https://www.pwc.com/id/en/media-centre/infrastructure-news/march-2025/a-breath-of-fresh-air-for-the-national-aviation-industry.html' target='_blank' rel='noopener noreferrer'>PwC Link</a>\n\n      • “Deloitte Global's 2025 Airline CEO Survey” – Deloitte, May 30, 2025 <a href='https://www.deloitte.com/global/en/about/press-room/deloitte-global-airline-ceo-survey.html' target='_blank' rel='noopener noreferrer'>Deloitte Link</a>\n\n      We had some great conversations previously, and I really valued the opportunity to understand what you were working toward. Let me know if you have time for a brief catch-up in the coming weeks. Either way, wishing you continued momentum."



      ,
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
       state.selectedChatUser = null;
       state.selectedChatUser = action.payload;
    },
    clearChat: (state) => {
      return {
        ...initialState,
      };
    },
    clearCurrentChat: (state) => {
      state.selectedChatUser = {};
    },
  },
});

const { actions, reducer } = chatSlice;

export const {
 fetchChatsPending,
 fetchChatsSuccess,
 fetchChatsFailed,
 setCurrentChat,
 clearCurrentChat,
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