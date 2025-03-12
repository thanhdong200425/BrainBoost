import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import GoogleLogo from "../logos/GoogleLogo";
import FacebookLogo from "../logos/FacebookLogo";

export default function ThirdPartyButton({ iconName, size, onPress }) {
  const buttonSize = size || 80;
  const iconSize = size ? size * 1 : 80;

  if (iconName === "logo-google") {
    return (
      <TouchableOpacity
        style={[styles.button, { width: buttonSize, height: buttonSize }]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <GoogleLogo size={iconSize} />
      </TouchableOpacity>
    );
  }

  if (iconName === "logo-facebook") {
    return (
      <TouchableOpacity
        style={[styles.button, { width: buttonSize, height: buttonSize }]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <FacebookLogo size={iconSize} />
      </TouchableOpacity>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 25,
    marginHorizontal: 15,
  },
});
