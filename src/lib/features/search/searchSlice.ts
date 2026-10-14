import { searchEntities } from "@/services/searchService";
import { EntityType } from "@/types/github";
import { Repository } from "@/types/repository";
import { GitHubUser } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchResults = createAsyncThunk<
  { key: string; data: (Repository | GitHubUser)[] },
  { entityType: EntityType; query: string },
  { state: { search: SearchState }; rejectValue: string }
>(
  "search/fetchResults",
  async ({ entityType, query }, { getState, signal, rejectWithValue }) => {
    const normalizedQuery = query.trim().toLowerCase();
    const key = `${entityType}:${normalizedQuery}`;
    const state = getState();

    if (state.search.cache[key]) {
      return { key, data: state.search.cache[key] };
    }

    try {
      const data = await searchEntities(entityType, normalizedQuery, signal);
      return { key, data };
    } catch (error: unknown) {
      if (axios.isCancel(error)) {
        return rejectWithValue("Search cancelled");
      }
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
  hasSearched: boolean;
}

const initialState: SearchState = {
  searchTerm: "",
  entityType: "users",
  results: [],
  loading: false,
  error: null,
  cache: {},
  hasSearched: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.hasSearched = false;
    },
    setEntityType: (state, action: PayloadAction<EntityType>) => {
      state.entityType = action.payload;
      state.results = [];
      state.error = null;
      state.hasSearched = false;
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
      state.hasSearched = false;
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
        state.hasSearched = true;
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
