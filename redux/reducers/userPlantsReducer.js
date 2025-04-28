import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userPlantService } from '../../services/api.service';
// Thunks
export const fetchUserPlants = createAsyncThunk(
  'userPlants/fetchUserPlants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userPlantService.getUserPlants();
      console.log('API Response for plants:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching plants:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || 'Une erreur est survenue');
    }
  }
);

// In your userPlantsReducer.js
export const addPlantToUser = createAsyncThunk(
  'userPlants/addPlant',
  async (plantData, { rejectWithValue }) => {
    try {
      console.log('Adding plant with data:', plantData);
      const response = await userPlantService.addPlantToUser(plantData);
      console.log('Add plant response:', response.data);
      return response.data;
    } catch (error) {
      // Better error logging
      console.error('Error in addPlantToUser action:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const removePlantFromUser = createAsyncThunk(
  'userPlants/removePlantFromUser',
  async (plantId, { rejectWithValue }) => {
    try {
      await userPlantService.removePlantFromUser(plantId);
      return plantId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Une erreur est survenue');
    }
  }
);

const userPlantsReducer = createSlice({
  name: 'userPlants',
  initialState: {
    plants: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add the missing resetLoading action
    resetLoading: (state) => {
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch user plants
      .addCase(fetchUserPlants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPlants.fulfilled, (state, action) => {
        state.loading = false;
        // Transformer correctement la réponse API en tenant compte de la structure réelle
        if (Array.isArray(action.payload)) {
          // Create a Map to track existing IDs and avoid duplicates
          const uniquePlants = new Map();
          
          action.payload.forEach(userPlant => {
            // S'assurer que les données nécessaires existent
            if (!userPlant.plant) {
              console.warn('Invalid userPlant data received:', userPlant);
              return;
            }
            
            const plant = {
              id: userPlant.plant.id,
              title: userPlant.plant.title,
              image: userPlant.plant.image,
              color: userPlant.plant.color || "#FFFFFF", // Valeurs par défaut
              backgroundColor: userPlant.plant.backgroundColor || "#E8F5E9",
              quantity: userPlant.plant.quantity || 1,
              plantingDate: userPlant.plant.plantingDate,
              expectedHarvest: userPlant.plant.expectedHarvest,
              wateringSchedule: userPlant.plant.wateringSchedule,
              lastWatered: userPlant.plant.lastWatered,
              growthPhase: userPlant.plant.growthPhase || "seedling",
              growthProgress: userPlant.plant.growthProgress || 0,
              addedAt: userPlant.addedAt || new Date().toISOString()
            };
            
            if (uniquePlants.has(plant.id)) {
              // If we already have this ID, create a more unique one using the addedAt timestamp
              const uniqueId = `${plant.id}-${new Date(plant.addedAt).getTime()}`;
              plant.id = uniqueId;
            }
            
            uniquePlants.set(plant.id, plant);
          });
          
          // Convert Map values to array
          state.plants = Array.from(uniquePlants.values());
        } else {
          console.error('Expected array but got:', typeof action.payload);
          state.error = "Format de données incorrect";
        }
      })
      .addCase(fetchUserPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur lors du chargement des plantes";
        console.error('Fetch plants rejected with payload:', action.payload);
      })
      
      // Add plant to user
      .addCase(addPlantToUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPlantToUser.fulfilled, (state, action) => {
        state.loading = false;
        // Only add to plants if action.payload is valid
        if (action.payload && action.payload.plant) {
          const newPlant = {
            id: action.payload.plant.id,
            title: action.payload.plant.title,
            image: action.payload.plant.image,
            color: action.payload.plant.color || "#FFFFFF",
            backgroundColor: action.payload.plant.backgroundColor || "#E8F5E9",
            quantity: action.payload.plant.quantity || 1,
            plantingDate: action.payload.plant.plantingDate,
            expectedHarvest: action.payload.plant.expectedHarvest,
            wateringSchedule: action.payload.plant.wateringSchedule,
            lastWatered: action.payload.plant.lastWatered,
            growthPhase: action.payload.plant.growthPhase || "seedling",
            growthProgress: action.payload.plant.growthProgress || 0,
            addedAt: action.payload.addedAt || new Date().toISOString()
          };
          
          // Check if this plant ID already exists
          const existingPlantIndex = state.plants.findIndex(p => p.id === newPlant.id);
          if (existingPlantIndex >= 0) {
            // Create a unique ID by appending timestamp
            newPlant.id = `${newPlant.id}-${new Date(newPlant.addedAt).getTime()}`;
          }
          
          state.plants.push(newPlant);
        }
      })
      .addCase(addPlantToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      
      // Remove plant from user
      .addCase(removePlantFromUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePlantFromUser.fulfilled, (state, action) => {
        state.loading = false;
        state.plants = state.plants.filter(plant => plant.id !== action.payload);
      })
      .addCase(removePlantFromUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions
export const { resetLoading, clearError } = userPlantsReducer.actions;

export default userPlantsReducer.reducer;