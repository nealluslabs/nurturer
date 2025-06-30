import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data - Card Templates organized by categories
const mockCardTemplates = {
  birthday: [
    {
      id: 1,
      title: 'Candles and Confetti',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      content: 'Cake. Candles. Confetti.',
      subtitle: 'A Celebration is in order',
      description: 'Happy Birthday',
      isDefault: true,
      category: 'birthday'
    },
    {
      id: 2,
      title: 'Coffee and Birthdays',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      content: 'May your special day perk you and your coffee stay strong today.',
      isDefault: false,
      category: 'birthday'
    }
  ],
  anniversary: [],
  holiday: [
    {
      id: 3,
      title: '4th of July',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      content: "Let the Good Times Roll\n\nHappy 4th of July!",
      subtitle: 'Happy 4th of July!',
      isDefault: false,
      category: 'holiday'
    }
  ],
  thankyou: []
};

// Async thunks
export const getCardTemplates = createAsyncThunk(
  'cardsApp/cards/getCardTemplates',
  async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCardTemplates);
      }, 1000);
    });
  }
);

export const addCardTemplate = createAsyncThunk(
  'cardsApp/cards/addCardTemplate',
  async ({ category, templateData }) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTemplate = {
          ...templateData,
          id: Date.now(),
          category,
          isDefault: false
        };
        resolve({ category, template: newTemplate });
      }, 500);
    });
  }
);

export const setDefaultTemplate = createAsyncThunk(
  'cardsApp/cards/setDefaultTemplate',
  async ({ category, templateId }) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ category, templateId });
      }, 500);
    });
  }
);

export const deleteTemplate = createAsyncThunk(
  'cardsApp/cards/deleteTemplate',
  async ({ category, templateId }) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ category, templateId });
      }, 500);
    });
  }
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    templates: {
      birthday: [],
      anniversary: [],
      holiday: [],
      thankyou: []
    },
    loading: false,
    error: null,
    searchText: '',
    selectedCategory: 'all',
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get card templates
      .addCase(getCardTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCardTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(getCardTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add card template
      .addCase(addCardTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCardTemplate.fulfilled, (state, action) => {
        state.loading = false;
        const { category, template } = action.payload;
        state.templates[category].push(template);
      })
      .addCase(addCardTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Set default template
      .addCase(setDefaultTemplate.fulfilled, (state, action) => {
        const { category, templateId } = action.payload;
        state.templates[category].forEach(template => {
          template.isDefault = template.id === templateId;
        });
      })
      // Delete template
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        const { category, templateId } = action.payload;
        state.templates[category] = state.templates[category].filter(
          template => template.id !== templateId
        );
      });
  },
});

export const { setSearchText, setSelectedCategory, clearError } = cardsSlice.actions;

// Selectors
export const selectCardTemplates = (state) => state.cardsApp.cards.templates;
export const selectCardsLoading = (state) => state.cardsApp.cards.loading;
export const selectCardsError = (state) => state.cardsApp.cards.error;
export const selectSearchText = (state) => state.cardsApp.cards.searchText;
export const selectSelectedCategory = (state) => state.cardsApp.cards.selectedCategory;

export const selectTemplatesByCategory = (category) => (state) => 
  state.cardsApp.cards.templates[category] || [];

export const selectAllTemplates = (state) => {
  const templates = selectCardTemplates(state);
  return Object.keys(templates).reduce((acc, category) => {
    return [...acc, ...templates[category]];
  }, []);
};

export const selectFilteredTemplates = (state) => {
  const templates = selectAllTemplates(state);
  const searchText = selectSearchText(state);
  
  if (!searchText) {
    return templates;
  }
  
  return templates.filter(template =>
    template.title.toLowerCase().includes(searchText.toLowerCase()) ||
    template.content.toLowerCase().includes(searchText.toLowerCase()) ||
    (template.subtitle && template.subtitle.toLowerCase().includes(searchText.toLowerCase()))
  );
};

export default cardsSlice.reducer;
