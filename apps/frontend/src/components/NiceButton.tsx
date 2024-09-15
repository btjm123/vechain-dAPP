import { Button, keyframes } from "@chakra-ui/react";
import React from "react";

interface NiceButtonProps {
  mb?: number;
  mt?: number;
  text?: string;
  onClick: () => void;
}

// Keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const NiceButton: React.FC<NiceButtonProps> = ({
  mb = 0,
  mt = 0,
  text = "Click me",
  onClick,
}) => {
  return (
    <Button
      mb={mb}
      mt={mt}
      colorScheme="teal" // Color theme
      size="lg" // Large size
      variant="solid" // Solid button style
      borderRadius="md" // Medium rounded corners
      boxShadow="md" // Shadow for depth
      _hover={{ bg: "teal.600", boxShadow: "lg" }} // Hover effect
      _active={{ bg: "teal.700", transform: "scale(0.98)" }} // Active effect
      animation={`${fadeIn} 0.8s ease-in-out`} // Apply fade-in animation
      _focus={{ boxShadow: "outline" }} // Focus effect
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
