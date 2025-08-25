import {
  updateHeaderText,
  updateImageText,
  updateFontText,
  updateLinkText,
  updateParagraphText,
  updateColor,
} from "src/redux/reducers/newsLetter.slice";

export const setHeaderText = (header, text) => (dispatch) => {
  dispatch(updateHeaderText({ header, text }));
};
export const setLinkText = (link, text) => (dispatch) => {
  dispatch(updateLinkText({ link, text }));
};
export const setParagraphText = (paragraph, text) => (dispatch) => {
  dispatch(updateParagraphText({ paragraph, text }));
};

export const setImageText = (image, text) => (dispatch) => {
  dispatch(updateImageText({ image, text }));
};
export const setFontText = (font) => (dispatch) => {
  dispatch(updateFontText({ font }));
};
export const setBackgroundColor = (color) => updateColor({ color });