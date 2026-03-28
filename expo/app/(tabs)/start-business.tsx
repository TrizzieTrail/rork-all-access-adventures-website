import { Link, usePathname } from "expo-router";
import { Image } from "expo-image";
import React, { useCallback, useEffect } from "react";
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import BrandNav from "@/components/BrandNav";
import ErrorBoundary from "@/components/ErrorBoundary";
import { palette } from "@/constants/colors";
import { BUSINESS_FORM_URL } from "@/constants/externalLinks";

export default function StartBusinessScreen() {
  const pathname = usePathname();

  useEffect(() => {
    if (Platform.OS === 'web') {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      console.log('Loaded brush script font for web');
    }
  }, []);

  const handleOpenBusinessForm = useCallback(async () => {
    console.log(`Attempting to open business form: ${BUSINESS_FORM_URL}`);
    try {
      const supported = await Linking.canOpenURL(BUSINESS_FORM_URL);
      if (!supported) {
        Alert.alert("Link unavailable", "We couldn't open the business form. Please try again later.");
        return;
      }
      await Linking.openURL(BUSINESS_FORM_URL);
    } catch (error) {
      console.log("Failed to open business form", error);
      Alert.alert("Something went wrong", "Please check your connection and try again.");
    }
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false} testID="start-business-scroll">
          <View style={styles.pageInner}>
            <BrandNav activePath={pathname} />
            <View style={styles.heroCard}>
              <Text style={styles.pageTitle}>Start Your Own Travel Business</Text>
              <View style={styles.heroImageWrapper}>
                <Image
                  source={{
                    uri: "https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/a0n40k1rktukgjiekbror",
                  }}
                  style={styles.heroImage}
                  contentFit="cover"
                />
              </View>
              <Text style={styles.subheading}>My Why</Text>
              <Text style={styles.bodyText}>
                Have you ever felt like your family is getting the leftovers of your time and energy? That’s where I found myself
                — working full-time as a therapist, giving so much to others, but missing moments with the people who matter
                most. I love what I do, but it hasn’t given me the freedom or income to live life on my terms.
              </Text>
              <Text style={styles.bodyText}>
                I’ve traveled all over the world, and I want to keep doing that — but now, I want to bring my family with me. I
                want time, connection, and memories… not just survival.
              </Text>
              <Text style={styles.bodyText}>
                So I started a business that lets me build residual income and help others experience the power of travel —
                because it’s not just about vacations. Travel heals. It inspires. It brings people back to themselves.
              </Text>
              <Text style={styles.bodyText}>
                I’m doing this for my family. For freedom. For the legacy I want to leave. And if any of this speaks to your
                heart — maybe it’s time for you too.
              </Text>
              <Pressable style={styles.ctaButton} onPress={handleOpenBusinessForm} testID="start-business-cta">
                <Text style={styles.ctaButtonText}>Learn More</Text>
              </Pressable>
            </View>
            <View>
              <Link href="/(tabs)" testID="start-business-back-home">
                <View style={styles.backLink}>
                  <Text style={styles.backLinkText}>← Back to Home</Text>
                </View>
              </Link>
              <View style={styles.clientNoteWrapper}>
                <Text style={styles.clientNoteText}>Already a client? You can also book your next trip here.</Text>
                <Link href="/(tabs)/book-options" testID="client-book-link">
                  <Text style={styles.clientBookLink}>Go to Book Options →</Text>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  pageInner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 32,
  },
  heroCard: {
    backgroundColor: palette.cardBackground,
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: palette.gold,
    gap: 16,
    shadowColor: palette.gold,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  pageTitle: {
    fontSize: 48,
    fontWeight: Platform.OS === 'web' ? '400' as const : '600' as const,
    color: palette.gold,
    textAlign: 'center' as const,
    marginBottom: 8,
    ...(Platform.OS === 'web' && {
      fontFamily: 'Pacifico, cursive',
    }),
    ...Platform.select({
      ios: {
        fontFamily: 'Bradley Hand',
      },
      android: {
        fontFamily: 'cursive',
      },
    }),
  },
  heroImageWrapper: {
    borderRadius: 24,
    overflow: "hidden",
    height: 220,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "700",
    color: palette.gold,
    marginTop: 8,
  },
  bodyText: {
    fontSize: 16,
    color: "#4a4a4a",
    lineHeight: 24,
  },
  ctaButton: {
    marginTop: 12,
    backgroundColor: palette.gold,
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
  },
  ctaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  backLink: {
    marginTop: 4,
    alignSelf: "flex-start",
    paddingLeft: 8,
  },
  backLinkText: {
    color: palette.skyBlue,
    fontSize: 16,
    fontWeight: "600",
  },
  clientNoteWrapper: {
    marginTop: 12,
    gap: 4,
    paddingLeft: 8,
  },
  clientNoteText: {
    fontSize: 14,
    color: palette.textMuted,
  },
  clientBookLink: {
    color: palette.skyBlue,
    fontSize: 16,
    fontWeight: "600",
  },
});
