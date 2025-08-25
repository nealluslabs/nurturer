import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  header: {
    "First Header": "",
    "Second Header": "",
    "Third Header": "",
    "Fourth Header": "",
  },
  link: {
    "First Link": "",
    "Second Link": "",
    "Third Link": "",
    "Fourth Link": "",
  },
  paragraph: {
    "First Paragraph": "",
    "Second Paragraph": "",
    "Third Paragraph": "",
    "Fourth Paragraph": "",
    "Fifth Paragraph": "",
  },
  images: {
    "First Image": "",
    "Second Image": "",
    "Third Image": "",
    "Fourth Image": "",
  },
  fonts: {
    Poppins: "Poppins",
    Serif: "Noto Serif",
    Roboto: "Roboto",
    Lato: "Lato",
  },
  selectedFont: "Poppins",
  backgroundColor: {
    red: "#FF0000",
    blue: "#0000FF",
    green: "#00FF00",
    yellow: "#FEC600",
    black: "#000000",
  },
  selectedBackgroundColor: "#5C62AD", // default background
};

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState,
  reducers: {
    updateHeaderText: (state, action) => {
      const { header, text } = action.payload;
      if (!state.header) {
        state.header = {};
      }
      state.header[header] = text;
    },

    updateLinkText: (state, action) => {
      const { link, text } = action.payload;
      if (!state.link) {
        state.link = {};
      }
      state.link[link] = text;
    },

    updateParagraphText: (state, action) => {
      const { paragraph, text } = action.payload;
      if (!state.paragraph) {
        state.paragraph = {};
      }
      state.paragraph[paragraph] = text;
    },

    updateImageText: (state, action) => {
      const { image, text } = action.payload;
      if (!state.images) {
        state.images = {};
      }
      state.images[image] = text;
    },

    updateFontText: (state, action) => {
      state.selectedFont = action.payload.font;
    },

    updateColor: (state, action) => {
      state.selectedBackgroundColor = action.payload.color;
    },
  },
});

const { actions, reducer } = newsletterSlice;

export const {
  updateHeaderText,
  updateImageText,
  updateLinkText,
  updateParagraphText,
  updateFontText,
  updateColor,
} = actions;

export default reducer;
