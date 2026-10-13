import { searchEntities } from "@/services/searchService";
import { EntityType } from "@/types/github";
import { Repository } from "@/types/repository";
import { GitHubUser } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const fetchSearchResults = createAsyncThunk<
  { key: string; data: (Repository | GitHubUser)[] },
  { entityType: EntityType; query: string },
  { state: { search: SearchState }; rejectValue: string }
>(
  "search/fetchResults",
  async ({ entityType, query }, { getState, rejectWithValue }) => {
    const normalizedQuery = query.trim().toLowerCase();
    const key = `${entityType}:${normalizedQuery}`;
    const state = getState();

    if (state.search.cache[key]) {
      return { key, data: state.search.cache[key] };
    }

    try {
      const data = await searchEntities(entityType, normalizedQuery);
      return { key, data };
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "An error occurred while searching",
      );
    }
  },
);

export interface SearchState {
  searchTerm: string;
  entityType: EntityType;
  results: (Repository | GitHubUser)[];
  loading: boolean;
  error: string | null;
  cache: Record<string, (Repository | GitHubUser)[]>;
}

const initialState: SearchState = {
  searchTerm: "",
  entityType: "users",
  results: [],
  loading: false,
  error: null,
  cache: {},
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setEntityType: (state, action: PayloadAction<EntityType>) => {
      state.entityType = action.payload;
      state.results = [];
      state.error = null;
    },
    setCacheEntry: (
      state,
      action: PayloadAction<{ key: string; data: (Repository | GitHubUser)[] }>,
    ) => {
      state.cache[action.payload.key] = action.payload.data;
    },
    clearSearch: (state) => {
      state.searchTerm = "";
      state.results = [];
      state.loading = false;
      state.error = null;
    },
    clearCache: (state) => {
      state.cache = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.data;
        state.cache[action.payload.key] = action.payload.data;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch results";
      });
  },
});

export const {
  setSearchTerm,
  setEntityType,
  setCacheEntry,
  clearSearch,
  clearCache,
} = searchSlice.actions;

export default searchSlice.reducer;
