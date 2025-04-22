import React, { useState } from "react";
import { View, StyleSheet, Platform, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { SkipButton, SwiperComponent, ActionButtons, PaginationDots } from "../components";

const { width, height } = Dimensions.get("window");

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

            {slides[currentPage].buttons && <ActionButtons handleSignUp={handleSignUp} handleLogin={handleLogin} />}

            <View style={styles.paginationContainer}>
                <PaginationDots currentPage={currentPage} totalPages={slides.length} onPageChange={handlePaginationChange} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        position: "relative",
    },
    paginationContainer: {
        position: "absolute",
        bottom: Platform.OS === "ios" ? height * 0.08 : height * 0.05,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: width * 0.05,
    },
});

export default OnboardingScreen;
