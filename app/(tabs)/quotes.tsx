import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function QuotesScreen() {
  const router: any = useRouter();
  const [quotes, setQuotes]: any = useState([]);
  const [loading, setLoading]: any = useState(true);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response: any = await fetch('https://zenquotes.io/api/quotes');
      const data: any = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const formattedQuotes: any = data.slice(0, 10).map((item: any) => ({
          text: item.q || item.text || 'Stay motivated and keep pushing forward!',
          author: item.a || item.author || 'Unknown',
        }));
        setQuotes(formattedQuotes);
      } else {
        setQuotes([
          {
            text: 'The only bad workout is the one that didn\'t happen.',
            author: 'Unknown',
          }
        ]);
      }
    } catch (error: any) {
      setQuotes([
        {
          text: 'The only bad workout is the one that didn\'t happen.',
          author: 'Unknown',
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="sparkles" size={32} color="#0a7ea4" />
          </View>
          <Text style={styles.headerTitle}>Motivational Quotes</Text>
          <Text style={styles.headerSubtitle}>
            Get inspired to achieve your fitness goals
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {loading && quotes.length === 0 ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingIcon}>
              <Ionicons name="hourglass-outline" size={48} color="#687076" />
            </View>
            <Text style={styles.loadingText}>Loading quotes...</Text>
          </View>
        ) : (
          quotes.map((quote: any, index: any) => (
            <View
              key={index}
              style={styles.quoteCard}
            >
              <View style={styles.quoteIcon}>
                <Ionicons name="text" size={24} color="#0a7ea4" />
              </View>
              <Text style={styles.quoteText}>{quote.text}</Text>
              <View style={styles.quoteAuthorContainer}>
                <View style={styles.quoteAuthorLine} />
                <Text style={styles.quoteAuthor}>— {quote.author}</Text>
              </View>
            </View>
          ))
        )}
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
  quoteCard: {
    borderRadius: 20,
    marginBottom: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quoteIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: '#e3f2fd',
  },
  quoteText: {
    fontSize: 18,
    lineHeight: 28,
    fontStyle: 'italic',
    marginBottom: 16,
    color: '#11181C',
  },
  quoteAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quoteAuthorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  quoteAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a7ea4',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    minHeight: 300,
  },
  loadingIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#687076',
  },
});

