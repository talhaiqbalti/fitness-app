import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '@/store/hooks';
import { addExercise } from '@/store/exercisesSlice';
import { useState } from 'react';

export default function AddExerciseScreen() {
  const router: any = useRouter();
  const dispatch: any = useAppDispatch();

  const [name, setName]: any = useState('');
  const [description, setDescription]: any = useState('');
  const [image, setImage]: any = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const defaultImage = image.trim() || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800';

    dispatch(
      addExercise({
        name: name.trim(),
        description: description.trim(),
        image: defaultImage,
      })
    );

    Alert.alert('Success', 'Exercise added successfully!', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={28} color="#11181C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Exercise</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="fitness-outline" size={20} color="#0a7ea4" />
            <Text style={styles.label}>Exercise Name</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="e.g., Push-ups, Squats, Running"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="document-text-outline" size={20} color="#0a7ea4" />
            <Text style={styles.label}>Description</Text>
          </View>
          <TextInput
            style={styles.textArea}
            placeholder="Describe the exercise, how to perform it, and its benefits..."
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="image-outline" size={20} color="#0a7ea4" />
            <Text style={styles.label}>Image URL (Optional)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="https://example.com/image.jpg"
            placeholderTextColor="#999"
            value={image}
            onChangeText={setImage}
            autoCapitalize="none"
            keyboardType="url"
          />
          <Text style={styles.hint}>
            Leave empty to use default image
          </Text>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.submitButtonText}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#11181C',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  formGroup: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#11181C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 52,
    backgroundColor: '#fff',
    color: '#11181C',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    backgroundColor: '#fff',
    color: '#11181C',
  },
  hint: {
    fontSize: 12,
    marginTop: 8,
    color: '#687076',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 16,
    gap: 12,
    marginTop: 8,
    backgroundColor: '#0a7ea4',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

