import { toggleExercise } from '@/store/exercisesSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router: any = useRouter();
  const dispatch: any = useAppDispatch();
  const exercises: any = useAppSelector((state: any) => state.exercises.exercises);

  const handleToggleComplete = (id: any) => {
    dispatch(toggleExercise(id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <Ionicons name="fitness" size={32} color="#0a7ea4" />
            <View style={styles.titleBadge}>
              <Ionicons name="flame" size={16} color="#0a7ea4" />
            </View>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color="#0a7ea4" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statNumber}>{exercises.filter((e : any) => e.completed).length}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
          <View style={styles.statCard2}>
            <Ionicons name="list" size={24} color="#687076" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statNumber}>{exercises.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {exercises.map((exercise: any) => (
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
              <TouchableOpacity
                style={[styles.completeButton, exercise.completed && styles.completeButtonActive]}
                onPress={(e: any) => {
                  e.stopPropagation();
                  handleToggleComplete(exercise.id);
                }}
              >
                <Ionicons
                  name={exercise.completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
                  size={28}
                  color={exercise.completed ? '#10B981' : '#687076'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.exerciseContent}>
              <View style={styles.exerciseHeader}>
                <View style={styles.exerciseNameContainer}>
                  <View style={styles.exerciseNameRow}>
                    <View style={styles.exerciseIcon}>
                      <Ionicons name="barbell" size={20} color="#0a7ea4" />
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
                <View style={styles.exerciseDate}>
                  <Ionicons name="time-outline" size={14} color="#687076" />
                  <Text style={styles.exerciseDateText}>
                    {new Date(exercise.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.exerciseArrow}>
                  <Ionicons name="chevron-forward" size={20} color="#0a7ea4" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/add-exercise')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    backgroundColor: '#e3f2fd',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    backgroundColor: '#e3f2fd',
  },
  statCard2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    backgroundColor: '#f5f5f5',
  },
  statTextContainer: {
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#11181C',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
    color: '#687076',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  exerciseCard: {
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  exerciseImageContainer: {
    position: 'relative',
    height: 200,
    width: '100%',
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
  },
  completeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  completeButtonActive: {
    backgroundColor: '#10B981',
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
    backgroundColor: '#e3f2fd',
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
  exerciseDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  exerciseDateText: {
    fontSize: 12,
    color: '#687076',
  },
  exerciseArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3f2fd',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
