import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchInputState {
  searchPhrase: string;
  langRestrict: boolean;
}
const initialState: SearchInputState = {
  searchPhrase: "",
  langRestrict: false,
};

const searchInputSlice = createSlice({
  name: "searchInput",
  initialState,
  reducers: {
    changeSearchPhrase: (
      state,
      action: PayloadAction<{ searchPhrase: string }>
    ) => {
      state.searchPhrase = action.payload.searchPhrase;
    },
    restrictLanguage: (
      state,
      action: PayloadAction<{ langRestrict: boolean }>
    ) => {
      state.langRestrict = action.payload.langRestrict;
    },
  },
});

export const { changeSearchPhrase, restrictLanguage } =
  searchInputSlice.actions;

export default searchInputSlice.reducer;
