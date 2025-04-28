import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { plantMetricService } from '../../services/api.service';

export const fetchLatestMetrics = createAsyncThunk(
  'metrics/fetchLatestMetrics',
  async (plantId, { rejectWithValue }) => {
    try {
      const response = await plantMetricService.getLatestMetrics(plantId);
      return { plantId, metrics: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Une erreur est survenue');
    }
  }
);

const metricsReducer = createSlice({
  name: 'metrics',
  initialState: {
    plantMetrics: {}, // Structure: { plantId: [...metrics] }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestMetrics.fulfilled, (state, action) => {
        state.loading = false;
        const { plantId, metrics } = action.payload;
        state.plantMetrics[plantId] = metrics;
      })
      .addCase(fetchLatestMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default metricsReducer.reducer;