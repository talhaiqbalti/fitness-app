import { StyleSheet, View, ScrollView, TouchableOpacity, Alert, Text } from 'react-native';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleExercise, deleteExercise } from '@/store/exercisesSlice';

export default function ExerciseDetailScreen() {
  const router: any = useRouter();
  const { id }: any = useLocalSearchParams();
  const dispatch: any = useAppDispatch();
  const exercise: any = useAppSelector((state: any) => state.exercises.exercises.find((ex: any) => ex.id === id));

  if (!exercise) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#687076" />
          <Text style={styles.errorText}>Exercise not found</Text>
        </View>
      </View>
    );
  }

  const handleToggleComplete = () => {
    dispatch(toggleExercise(exercise.id));
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Exercise',
      `Are you sure you want to delete "${exercise.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteExercise(exercise.id));
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: exercise.image }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="barbell" size={28} color="#0a7ea4" />
              </View>
              <View style={styles.titleTextContainer}>
                <Text style={styles.title}>{exercise.name}</Text>
                <View style={styles.date}>
                  <Ionicons name="calendar-outline" size={14} color="#687076" />
                  <Text style={styles.dateText}>
                    Added {new Date(exercise.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <View style={styles.descriptionLabel}>
              <Ionicons name="document-text-outline" size={18} color="#0a7ea4" />
              <Text style={styles.descriptionLabelText}>Description</Text>
            </View>
            <Text style={styles.description}>
              {exercise.description}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.completeButton, exercise.completed && styles.completeButtonActive]}
            onPress={handleToggleComplete}
            activeOpacity={0.8}
          >
            <Ionicons
              name={exercise.completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={24}
              color={exercise.completed ? '#fff' : '#687076'}
            />
            <Text
              style={[styles.completeButtonText, exercise.completed && styles.completeButtonTextActive]}
            >
              {exercise.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3f2fd',
  },
  titleTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#11181C',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#687076',
  },
  descriptionContainer: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    backgroundColor: '#f5f5f5',
  },
  descriptionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  descriptionLabelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#11181C',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 16,
    gap: 12,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  completeButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#11181C',
  },
  completeButtonTextActive: {
    color: '#fff',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
    color: '#11181C',
  },
});

