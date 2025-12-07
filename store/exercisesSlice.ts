import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  exercises: [
    {
      id: '1',
      name: 'Push-ups',
      description: 'A classic upper body exercise that targets the chest, shoulders, and triceps. Start in a plank position and lower your body until your chest nearly touches the floor, then push back up.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Squats',
      description: 'A fundamental lower body exercise that strengthens your quadriceps, hamstrings, and glutes. Stand with feet shoulder-width apart, lower your body as if sitting in a chair, then return to standing.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Plank',
      description: 'An isometric core exercise that builds strength and stability. Hold your body in a straight line from head to heels, engaging your core muscles throughout.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Running',
      description: 'A cardiovascular exercise that improves endurance and burns calories. Start with a comfortable pace and gradually increase distance and intensity.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ],
};

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    addExercise: (state: any, action: any) => {
      const newExercise: any = {
        ...action.payload,
        id: Date.now().toString(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.exercises.push(newExercise);
    },
    toggleExercise: (state: any, action: any) => {
      const exercise = state.exercises.find((ex: any) => ex.id === action.payload);
      if (exercise) {
        exercise.completed = !exercise.completed;
      }
    },
    deleteExercise: (state: any, action: any) => {
      state.exercises = state.exercises.filter((ex: any) => ex.id !== action.payload);
    },
  },
});

export const { addExercise, toggleExercise, deleteExercise } = exercisesSlice.actions;
export default exercisesSlice.reducer;

