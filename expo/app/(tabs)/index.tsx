import { usePathname, useRouter } from "expo-router";
import React, { useMemo, useRef } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import BrandNav from "@/components/BrandNav";
import ErrorBoundary from "@/components/ErrorBoundary";
import { palette } from "@/constants/colors";


type ActionBubbleProps = {
  title: string;
  subtitle?: string;
  description: string;
  buttonLabel: string;
  onPress: () => void;
  variant: "primary" | "secondary";
  testID: string;
};

function ActionBubble({ title, subtitle, description, buttonLabel, onPress, variant, testID }: ActionBubbleProps) {
  const translation = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_event, gestureState) => {
          translation.setValue({ x: gestureState.dx * 0.08, y: gestureState.dy * 0.08 });
        },
        onPanResponderRelease: () => {
          Animated.spring(translation, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        },
      }),
    [translation],
  );

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    console.log(`ActionBubble pressed: ${title}`);
    onPress();
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.bubble,
        variant === "primary" ? styles.primaryBubble : styles.secondaryBubble,
        {
          transform: [...translation.getTranslateTransform(), { scale }],
        },
      ]}
    >
      <Text style={styles.bubbleEyebrow}>{subtitle}</Text>
      <Text style={styles.bubbleTitle}>{title}</Text>
      <Text style={styles.bubbleDescription}>{description}</Text>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={styles.bubbleButton}
        testID={testID}
      >
        <Text style={styles.bubbleButtonText}>{buttonLabel}</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false} testID="home-scroll">
          <View style={styles.pageInner}>
            <BrandNav activePath={pathname} />
            <View style={[styles.hero, isWide ? styles.heroRow : styles.heroColumn]}>
              <ActionBubble
                title="All Access Adventures"
                subtitle="Book a Trip"
                description="Plan your next escape with a dedicated travel specialist."
                buttonLabel="Book a Trip"
                onPress={() => {
                  console.log("Navigating to Book Options from Home bubble");
                  router.push("/(tabs)/book-options");
                }}
                variant="primary"
                testID="book-trip-bubble-button"
              />
              <ActionBubble
                title="Start Your Own Travel Business"
                description="Learn how to earn income through travel."
                buttonLabel="Start Your Own Travel Business"
                onPress={() => {
                  console.log("Navigating to Start Business from Home bubble");
                  router.push("/(tabs)/start-business");
                }}
                variant="secondary"
                testID="start-business-bubble-button"
              />
            </View>
            <Text style={styles.helperText} testID="home-helper-text">
              Not sure where to start? You can always come back here and choose again.
            </Text>
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
  hero: {
    flex: 1,
    gap: 16,
    justifyContent: "center",
  },
  heroRow: {
    flexDirection: "row",
  },
  heroColumn: {
    flexDirection: "column",
  },
  bubble: {
    flex: 1,
    padding: 28,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: palette.gold,
    backgroundColor: palette.cardBackground,
    gap: 12,
    minHeight: 280,
    shadowColor: palette.gold,
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  primaryBubble: {
    backgroundColor: palette.cardBackground,
  },
  secondaryBubble: {
    backgroundColor: palette.cardBackground,
  },
  bubbleEyebrow: {
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: palette.gold,
    fontWeight: "700",
  },
  bubbleTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: palette.background, // Navy text inside white card
  },
  bubbleDescription: {
    fontSize: 16,
    color: "#4a4a4a", // Dark gray for readability on white
    lineHeight: 22,
  },
  bubbleButton: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: palette.gold,
    alignSelf: "flex-start",
  },
  bubbleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  helperText: {
    textAlign: "center",
    fontSize: 14,
    color: palette.textMuted,
  },
});
