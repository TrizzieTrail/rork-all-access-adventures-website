import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  handleReset = () => {
    console.log("ErrorBoundary: resetting state");
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.fallback} testID="error-boundary-fallback">
          <Text style={styles.title}>Something went wrong.</Text>
          <Text style={styles.subtitle}>Please try again. If the issue persists, refresh the app.</Text>
          <Pressable style={styles.button} onPress={this.handleReset} testID="error-boundary-reset-button">
            <Text style={styles.buttonText}>Try Again</Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fdfbf7",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#0b3c49",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#4a4a4a",
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: "#1c8c9c",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
