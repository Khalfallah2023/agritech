import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { weatherService } from '../../services/api.service';

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async (_, { rejectWithValue }) => {
    try {
      const response = await weatherService.getCurrentWeather();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Une erreur est survenue');
    }
  }
);

const weatherReducer = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default weatherReducer.reducer;