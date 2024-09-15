import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box as any);

export const DropzoneSuccess: React.FC = () => {
  const [isTransactionComplete, setIsTransactionComplete] = useState(false);

  useEffect(() => {
    // Simulate smart contract interaction
    const interactWithSmartContract = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsTransactionComplete(true);
    };

    interactWithSmartContract();
  }, []);

  return (
    <VStack w="full" mt={3} spacing={4}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {!isTransactionComplete ? (
          <Spinner size="xl" color="blue.500" />
        ) : (
          <Text fontSize="2xl" fontWeight="bold" color="green.500">
            ✓
          </Text>
        )}
      </MotionBox>
      <Text fontSize="xl" fontWeight="bold">
        {isTransactionComplete ? "Transaction Complete!" : "Processing..."}
      </Text>
    </VStack>
  );
};
