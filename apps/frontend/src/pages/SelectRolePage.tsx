import React from "react";
import { Box, Button, Heading, Stack, useToast, Text } from "@chakra-ui/react";
import { GrAccessibility, GrCloudSoftware } from "react-icons/gr";
import { useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import Lottie from "react-lottie";
import animationData from "./bg-animation.json";

interface SelectRolePageProps {}

// Animation keyframes for bouncing text
const slideRightAnimation = `
@keyframes slideRight {
  0% {
      transform: translateX(100%);
      opacity: 0;
  }
  100% {
      transform: translateX(0%);
      opacity: 1;
  }
}
`;

// Lottie boilerplate
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const SelectRolePage: React.FC<SelectRolePageProps> = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleRoleSelect = (role: "buyer" | "seller") => {
    // Example logic for handling role selection
    if (role === "buyer") {
      console.log("buyer");
      navigate("/select-dropoff-location");
    } else if (role === "seller") {
      navigate("/seller-snap");
      console.log("seller");
    } else {
      toast({
        title: "Error",
        description: "Invalid role selected.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box position="relative" minHeight="100vh">
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="0"
        opacity="0.3" // Adjust this value to change the opacity of the background animation
      >
        <Lottie options={defaultOptions} height="100%" width="100%" />
      </Box>
      <Box position="sticky" top="0" zIndex="sticky">
        <Navbar />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="calc(100vh - 300px)" // Adjust this value based on your Navbar height
        bg="gray.50"
        pt="60px" // Add top padding to account for Navbar height
      >
        <style>{slideRightAnimation}</style>
        <Box
          p={8}
          maxWidth="400px"
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
          textAlign="center"
        >
          <Heading mb={6}>I want to</Heading>
          <Stack spacing={4}>
            <Button
              colorScheme="blue"
              onClick={() => handleRoleSelect("buyer")}
            >
              <GrAccessibility />
              Recycle
            </Button>
            <Button
              colorScheme="green"
              onClick={() => handleRoleSelect("seller")}
            >
              <GrCloudSoftware />
              Distribute eco-packages
            </Button>
          </Stack>
        </Box>

        <Box
          position="absolute"
          bottom="32px"
          right="32px"
          p={4}
          bg="yellow.200"
          borderRadius="md"
          boxShadow="md"
          animation="slideRight 1.5s ease-in-out"
          zIndex={1}
          cursor="pointer"
          onClick={() => {
            navigate("/registerdroppoint");
          }}
        >
          <Text fontWeight="bold" fontSize="lg" textAlign="center">
            🎉 Explore extra 2000 B3TR coins! 🎉
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
