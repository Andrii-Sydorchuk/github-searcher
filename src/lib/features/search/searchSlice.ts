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
  currentRequestId: string | null;
}

const initialState: SearchState = {
  searchTerm: "",
  entityType: "users",
  results: [],
  loading: false,
  error: null,
  cache: {},
  hasSearched: false,
  currentRequestId: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.hasSearched = false;
      state.loading = false;
      state.error = null;
      state.currentRequestId = null;
    },
    setEntityType: (state, action: PayloadAction<EntityType>) => {
      state.entityType = action.payload;
      state.results = [];
      state.loading = false;
      state.error = null;
      state.hasSearched = false;
      state.currentRequestId = null;
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
      state.currentRequestId = null;
    },
    clearCache: (state) => {
      state.cache = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.results = action.payload.data;
        state.cache[action.payload.key] = action.payload.data;
        state.hasSearched = true;
        state.currentRequestId = null;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        if (action.meta.aborted) {
          state.loading = false;
          state.currentRequestId = null;
          return;
        }

        state.loading = false;
        state.error = action.payload || "Failed to fetch results";
        state.currentRequestId = null;
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
