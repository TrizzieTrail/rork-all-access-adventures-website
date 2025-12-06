import { Link, usePathname } from "expo-router";
import React, { useCallback } from "react";
import {
  Alert,
  Linking,
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
import { CRUISE_FORM_URL, TRIP_FORM_URL } from "@/constants/externalLinks";

type FormButtonProps = {
  label: string;
  description: string;
  url: string;
  testID: string;
};

function FormButton({ label, description, url, testID }: FormButtonProps) {
  const handlePress = useCallback(async () => {
    console.log(`Attempting to open external form: ${label} -> ${url}`);
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert("Link unavailable", "We couldn't open the form. Please try again later.");
        return;
      }
      await Linking.openURL(url);
    } catch (error) {
      console.log("Failed to open external form", error);
      Alert.alert("Something went wrong", "Please check your connection and try again.");
    }
  }, [label, url]);

  return (
    <View style={styles.formButtonWrapper}>
      <Pressable onPress={handlePress} style={styles.formButton} testID={testID}>
        <Text style={styles.formButtonLabel}>{label}</Text>
      </Pressable>
      <Text style={styles.formButtonDescription}>{description}</Text>
    </View>
  );
}

export default function BookOptionsScreen() {
  const pathname = usePathname();

  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false} testID="book-options-scroll">
          <View style={styles.pageInner}>
            <BrandNav activePath={pathname} />
            <View style={styles.contentCard}>
              <Text style={styles.pageTitle}>Plan Your Getaway</Text>
              <Text style={styles.intro}>
                Choose the option below that fits your next adventure. You&apos;ll be redirected to our secure TravelJoy forms to submit your details.
              </Text>
              <View style={styles.buttonStack}>
                <FormButton
                  label="Trip Form"
                  description="For flights, hotels, all-inclusive stays, and more."
                  url={TRIP_FORM_URL}
                  testID="trip-form-button"
                />
                <FormButton
                  label="Cruise Form"
                  description="For cruise vacations and ocean getaways."
                  url={CRUISE_FORM_URL}
                  testID="cruise-form-button"
                />
              </View>
            </View>
            <Link href="/(tabs)" testID="book-options-back-home">
              <View style={styles.backLink}>
                <Text style={styles.backLinkText}>← Back to Home</Text>
              </View>
            </Link>
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
  contentCard: {
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
    fontSize: 28,
    fontWeight: "800",
    color: palette.navy,
  },
  intro: {
    fontSize: 16,
    color: "#4a4a4a",
    lineHeight: 22,
  },
  buttonStack: {
    gap: 20,
  },
  formButtonWrapper: {
    gap: 6,
  },
  formButton: {
    backgroundColor: palette.gold,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  formButtonLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  formButtonDescription: {
    fontSize: 14,
    color: palette.navy,
    textAlign: "center",
  },
  backLink: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingLeft: 8, // Add some padding since it's now outside card
  },
  backLinkText: {
    color: palette.skyBlue,
    fontSize: 16,
    fontWeight: "600",
  },
});
