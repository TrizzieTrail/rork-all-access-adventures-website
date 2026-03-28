import { Link, type Href } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { palette } from "@/constants/colors";

const NAV_ITEMS: { label: string; href: Href; path: string }[] = [
  { label: "Home", href: "/(tabs)", path: "/" },
  { label: "Book a Trip", href: "/(tabs)/book-options", path: "/book-options" },
  { label: "Start a Travel Business", href: "/(tabs)/start-business", path: "/start-business" },
];

type BrandNavProps = {
  activePath: string;
};

export default function BrandNav({ activePath }: BrandNavProps) {
  const items = useMemo(() => NAV_ITEMS, []);

  return (
    <View style={styles.container} testID="brand-nav">
      <Pressable onPress={() => {}} testID="brand-logo-button">
        <Link href="/(tabs)" style={styles.brandButton}>
          <View style={styles.brandInner}>
            <Text style={styles.brandTitle}>All Access Adventures</Text>
            <Text style={styles.brandTagline}>Curated escapes & limitless possibilities</Text>
          </View>
        </Link>
      </Pressable>
      <View style={styles.linkRow} testID="brand-nav-links">
        {items.map((item) => {
          const isActive = activePath === item.path;
          return (
            <Link key={`nav-${item.label}`} href={item.href}>
              <View
                style={[styles.linkButton, isActive && styles.linkButtonActive]}
              >
                <Text style={[styles.linkText, isActive && styles.linkTextActive]}>{item.label}</Text>
              </View>
            </Link>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 16,
    gap: 16,
    borderBottomWidth: 1,
    borderColor: palette.border,
  },
  brandButton: {
    textDecorationLine: "none" as const,
  },
  brandInner: {
    alignItems: "flex-start",
    gap: 4,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: palette.gold,
  },
  brandTagline: {
    fontSize: 14,
    color: palette.textMuted,
  },
  linkRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  linkButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: "transparent",
  },
  linkButtonActive: {
    backgroundColor: "rgba(216, 178, 92, 0.12)", // Gold with opacity
    borderColor: palette.gold,
  },
  linkText: {
    fontSize: 14,
    color: palette.text,
    fontWeight: "600",
  },
  linkTextActive: {
    color: palette.gold,
  },
});
