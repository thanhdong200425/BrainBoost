import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SkipButton from "./components/buttons/SkipButton"; 
import SwiperComponent from "./components/others/SwiperComponent"; 
import ActionButtons from "./components/buttons/ActionButtons"; 
import PaginationDots from "./components/others/PaginationDots"; 
import { useRouter } from "expo-router"; 

const OnboardingScreen = () => {
  const router = useRouter(); 

  const slides = [
    {
      title: "Quick and easy learning",
      subtitle: "Easy and fast learning at any time to help you improve various skills",
      image: require("../assets/images/onboarding01.png"),
    },
    {
      title: "Flexible learning",
      subtitle: "Learn at your own pace with flexible schedules and expert guidance",
      image: require("../assets/images/onboarding02.png"),
    },
    {
      title: "Create your own study plan",
      subtitle: "Study according to the study plan, make study more motivated",
      image: require("../assets/images/onboarding03.png"),
      buttons: true,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const handlePaginationChange = (index) => {
    setCurrentPage(index); 
  };

  const handleLogin = () => {
    router.push("/login"); 
  };

  const handleSignUp = () => {
    router.push("/signup"); 
  };

  return (
    <View style={styles.container}>
      <SkipButton hideSkip={currentPage === 2} />

      <SwiperComponent slides={slides} onPageChange={handlePaginationChange} />

      {slides[currentPage].buttons && (
        <ActionButtons handleSignUp={handleSignUp} handleLogin={handleLogin} />
      )}

      <PaginationDots
        currentPage={currentPage}
        totalPages={slides.length}
        onPageChange={handlePaginationChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});

export default OnboardingScreen;
