import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Image,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Webcam from "react-webcam";
import Lottie from "lottie-react";
import successTick from "./success-tick.json";

import { Navbar, SubmissionModal } from "../components";
import { DropzoneTest } from "../components/DropzoneTest";
import { ACCOUNT_ID, BASE64_IMAGE, DEVICE_ID } from "../const";
import { successContract } from "../networking";
import { useDisclosure, useSubmission, useSubmission2 } from "../hooks";
import { SuccessModal } from "../components/SuccessModal";
import { GenericModal } from "../components/FailureModal";
import { useNavigate } from "react-router";

// Correct way to create motion components with Chakra UI
const MotionBox = motion(Box as any);
const MotionHeading = motion(Heading as any);
const MotionText = motion(Text as any);
const MotionButton = motion(Button as any);

export const SellerSnap: React.FC = () => {
  const [step, setStep] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showDropzone, setShowDropzone] = useState(false);
  const webcamRef = React.useRef<Webcam>(null);
  const toast = useToast();

  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const { setIsLoading, setResponse } = useSubmission2();

  const { onOpen } = useDisclosure();

  const handleGetStarted = () => {
    setStep(1);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setCapturedImage(null);
  };

  useEffect(() => {
    async function jmy() {
      try {
        setIsLoading(true);
        const APIresponse = await successContract({
          address: ACCOUNT_ID,
          deviceID: DEVICE_ID,
          image: capturedImage ?? BASE64_IMAGE,
        });

        console.log("success!");
        // onOpen();
        console.log("api response" + APIresponse);
        if (APIresponse !== null) {
          setResponse(APIresponse);
        }
        // toast({
        //   title: "Success!",
        //   description: "Your request was completed successfully.",
        //   status: "success", // Type of toast
        //   duration: 5000, // Duration in milliseconds
        //   isClosable: true, // Allow the toast to be closed
        //   position: "top-right", // Position of the toast
        // });
      } catch (error) {
        alert("Error submitting receipt");
      } finally {
        setIsLoading(false);
      }
    }

    if (!showDropzone) jmy();
    setTimeout(() => navigate("/select-role"), 7000);
  }, [showDropzone]);

  const handleSubmit = async () => {
    if (!capturedImage) {
      toast({
        title: "Error",
        description: "Please capture an image before submitting",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Query server here
    console.log("Query server here");

    // Simulate server lag
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Show success animation
    toast({
      duration: 3000,
      isClosable: true,
      render: () => (
        <Box
          color="black"
          p={3}
          bg="white"
          borderRadius="md"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <VStack spacing={0}>
            <Box width="90px" height="90px">
              <Lottie animationData={successTick} loop={false} />
            </Box>
            <Text fontWeight="bold">Photo submitted successfully!</Text>
          </VStack>
        </Box>
      ),
    });

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Show DropzoneSuccess
    setShowDropzone(true);
  };

  const variants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <>
      <Navbar />
      <Flex
        minHeight="100vh"
        width="100%"
        align="center"
        justify="space-around"
        direction="column"
        padding={4}
      >
        <Box width="100%" maxWidth="500px">
          <MotionHeading
            mb={6}
            textAlign="center"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={titleVariants}
            transition={{ duration: 0.5 }}
          >
            Seller Snap
          </MotionHeading>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <MotionBox
                key="step0"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                <MotionText
                  textAlign="center"
                  mb={6}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={titleVariants}
                  transition={{ duration: 0.5 }}
                >
                  Take a photo of your item to start selling!
                </MotionText>
                <MotionButton
                  onClick={handleGetStarted}
                  colorScheme="blue"
                  width="100%"
                >
                  Get Started
                </MotionButton>
              </MotionBox>
            )}

            {step === 1 && (
              <MotionBox
                key="step1"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                <VStack spacing={4}>
                  {!capturedImage ? (
                    <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="100%"
                      />
                      <Button onClick={capture} colorScheme="blue" width="100%">
                        Capture photo
                      </Button>
                    </>
                  ) : (
                    <>
                      <Image src={capturedImage} alt="captured" />
                      <Button onClick={retake} colorScheme="red" width="100%">
                        Retake photo
                      </Button>
                    </>
                  )}
                  <Button
                    onClick={handleSubmit}
                    colorScheme="green"
                    width="100%"
                    isDisabled={!capturedImage}
                  >
                    Submit
                  </Button>
                </VStack>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
        <SuccessModal />
      </Flex>
    </>
  );
};
