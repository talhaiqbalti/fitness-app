import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleExercise } from '@/store/exercisesSlice';

export default function CompletedScreen() {
  const router: any = useRouter();
  const dispatch: any = useAppDispatch();
  const completedExercises: any = useAppSelector((state: any) =>
    state.exercises.exercises.filter((ex: any) => ex.completed)
  );

  const handleToggleComplete = (id: any) => {
    dispatch(toggleExercise(id));
  };

  if (completedExercises.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={32} color="#0a7ea4" />
            </View>
            <Text style={styles.headerTitle}>Completed Exercises</Text>
            <Text style={styles.headerSubtitle}>
              Track your fitness achievements
            </Text>
          </View>
        </View>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="trophy-outline" size={64} color="#687076" />
          </View>
          <Text style={styles.emptyTitle}>No completed exercises yet</Text>
          <Text style={styles.emptySubtitle}>
            Start completing exercises to see them here!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={32} color="#0a7ea4" />
          </View>
          <Text style={styles.headerTitle}>Completed Exercises</Text>
          <Text style={styles.headerSubtitle}>
            {completedExercises.length} {completedExercises.length === 1 ? 'exercise' : 'exercises'} completed
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {completedExercises.map((exercise: any) => (
          <TouchableOpacity
            key={exercise.id}
            style={styles.exerciseCard}
            onPress={() => router.push(`/exercise-detail?id=${exercise.id}`)}
            activeOpacity={0.7}
          >
            <View style={styles.exerciseImageContainer}>
              <Image
                source={{ uri: exercise.image }}
                style={styles.exerciseImage}
                contentFit="cover"
                transition={200}
              />
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
              </View>
            </View>
            <View style={styles.exerciseContent}>
              <View style={styles.exerciseHeader}>
                <View style={styles.exerciseNameContainer}>
                  <View style={styles.exerciseNameRow}>
                    <View style={styles.exerciseIcon}>
                      <Ionicons name="checkmark-done-circle" size={20} color="#10B981" />
                    </View>
                    <View style={styles.exerciseNameText}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text style={styles.exerciseDescription}>
                {exercise.description.substring(0, 80)}...
              </Text>
              <View style={styles.exerciseFooter}>
                <View style={styles.completedDate}>
                  <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                  <Text style={styles.completedDateText}>Completed</Text>
                </View>
                <TouchableOpacity
                  style={styles.uncompleteButton}
                  onPress={(e: any) => {
                    e.stopPropagation();
                    handleToggleComplete(exercise.id);
                  }}
                >
                  <Ionicons name="refresh-outline" size={18} color="#687076" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: '#e3f2fd',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#11181C',
  },
  headerSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#687076',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  exerciseCard: {
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#10B981',
    backgroundColor: '#fff',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  exerciseImageContainer: {
    position: 'relative',
    height: 180,
    width: '100%',
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  exerciseContent: {
    padding: 16,
  },
  exerciseHeader: {
    marginBottom: 8,
  },
  exerciseNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exerciseNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  exerciseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1fae5',
  },
  exerciseNameText: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#11181C',
  },
  exerciseDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    color: '#687076',
  },
  exerciseFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completedDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  completedDateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  uncompleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: '#f5f5f5',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#11181C',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#687076',
  },
});

