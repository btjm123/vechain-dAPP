import React, { useState, useEffect, useCallback, useRef } from "react";
import Lottie from "lottie-react";
import successTick from "./success-tick.json";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router";
import {
  ACCOUNT_ID,
  BASE64_IMAGE,
  DEVICE_ID,
  GOOGLE_MAPS_API_KEY,
} from "../const";
import Webcam from "react-webcam";
import { useDisclosure, useSubmission, useSubmission3 } from "../hooks";
import { successContract } from "../networking";
import { SuccessModal } from "../components/SuccessModal";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

// Container style for the Google Map
const containerStyle = {
  width: "600px",
  height: "200px",
};

// Center of the map
const center = {
  lat: 1.303884751141622,
  lng: 103.78968391193682,
};

const SuccessToast = () => (
  <Box
    p={3}
    bg="white"
    color="black"
    borderRadius="md"
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
  >
    <Flex alignItems="center" justifyContent="center">
      <Box width="50px" height="50px" mr={3}>
        <Lottie animationData={successTick} loop={false} />
      </Box>
      <Text fontWeight="bold">Registration successful!</Text>
    </Flex>
  </Box>
);

const RegisterDroppoint: React.FC = () => {
  const navigate = useNavigate();
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const toast = useToast();
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [wheezingai, setWheezingai] = useState(false);

  const { setIsLoading, setResponse } = useSubmission3();
  const { onOpen } = useDisclosure();

  const [mapLocation, setMapLocation] = useState<{
    lat: number;
    lng: number;
  }>(center);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY, // Replace with your actual API key
  });

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "webcam-image.jpg", {
              type: "image/jpeg",
            });
            setImage(file);
          });
      }
    }
  }, [webcamRef]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // Match this with the exit duration in the variants
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  //buggy
  // const onLoad = React.useCallback(function callback(map: google.maps.Map) {
  //   setMap(map);
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   console.log("map loading");
  // }, []);

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
      } catch (error) {
        alert("Error submitting receipt");
      } finally {
        setIsLoading(false);
      }
    }

    if (wheezingai) jmy();
  }, [wheezingai]);

  //experimental . why does this work?
  const onLoad = React.useCallback(
    function callback(map: google.maps.Map) {
      setMap(map);
      map.setCenter(mapLocation);
      console.log("Map loaded");

      // Add click event listener
      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const newLocation = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          };
          setMapLocation(newLocation);
          // Optionally, update the location input field
          setLocation(`${newLocation.lat}, ${newLocation.lng}`);
        }
      });
    },
    [mapLocation],
  );

  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    if (map) {
      if (marker) {
        marker.setMap(null);
      }
      const newMarker = new google.maps.Marker({
        position: mapLocation,
        map: map,
      });
      setMarker(newMarker);
    }
  }, [map, mapLocation]);

  useEffect(() => {
    if (map) {
      map.setCenter(mapLocation);
      console.log("Map location updated", mapLocation);
    }
  }, [map, mapLocation]);

  const onUnmount = React.useCallback(function callback(
    map: google.maps.Map | null,
  ) {
    console.log("Unmounting map");
    setMap(null);
  }, []);

  const handleStepChange = (newStep: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(newStep);
    }, 300); // Match this with the exit duration in the variants
  };

  const handleGetStarted = () => {
    handleStepChange(1);
    getLocation();
  };

  useEffect(() => {
    if (map) {
      map.setCenter(mapLocation);
      console.log("map location", mapLocation);
    }
  }, [mapLocation]);

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      handleStepChange(2);
    } else {
      toast({
        title: "Error",
        description: "Please enter a location",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      toast({
        title: "Error",
        description: "Please enter a location",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setWheezingai(true);
    console.log({ location, image });

    // Show custom toast with Lottie animation
    toast({
      duration: 3000,
      render: () => <SuccessToast />,
    });

    // Redirect after a delay
    setTimeout(() => {
      navigate("/select-role");
    }, 8000);
  };

  const variants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const headingVariants = {
    0: { y: 45 },
    1: { y: -50 },
    2: { y: -110 },
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      console.log("getting location!");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
          console.log("got location!");
        },
        (err) => {
          setError("Unable to retrieve location.");
          setLoading(false);
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minHeight="100vh"
      width="100%"
      align="center"
      justify="center"
      direction="column"
      padding={4}
    >
      <Box width="100%" maxWidth="500px">
        <MotionHeading
          mb={6}
          textAlign="center"
          position="absolute" // wtf
          top="30%"
          left="10%"
          transform="translate(-50%, 0)"
          animate={step.toString()}
          variants={headingVariants}
          transition={{ duration: 0.5 }}
        >
          Register Drop-Off Point
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Earn B3TR tokens passively from the comfort of your own home!
                Let others drop off their used packaging outside your home for
                collection and earn B3TR tokens.
              </MotionText>
              <MotionButton
                onClick={handleGetStarted}
                colorScheme="blue"
                width="100%"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
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
              <form onSubmit={handleLocationSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Location</FormLabel>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter location manually or select on map"
                      readOnly // Make it read-only if you want users to only select from the map
                    />
                    <Box
                      mt={4}
                      height="200px"
                      bg="gray.200"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {isLoaded ? (
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={mapLocation}
                          zoom={12}
                          onLoad={onLoad}
                          onUnmount={onUnmount}
                        >
                          {marker && <></>}
                        </GoogleMap>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </Box>
                  </FormControl>
                  <Button type="submit" colorScheme="blue" width="100%">
                    Next
                  </Button>
                </VStack>
              </form>
            </MotionBox>
          )}

          {step === 2 && (
            <MotionBox
              key="step2"
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleFormSubmit}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel textAlign="center">
                      Snap a picture of where your drop-off point is for
                      verification!
                    </FormLabel>
                    <Box>
                      {!capturedImage ? (
                        <>
                          <Box width="100%" height="300px">
                            <Webcam
                              audio={false}
                              ref={webcamRef}
                              screenshotFormat="image/jpeg"
                              videoConstraints={{ facingMode: "user" }}
                              width="100%"
                              height="300%"
                            />
                          </Box>
                          <Flex justifyContent="center" width="100%">
                            <Button
                              onClick={captureImage}
                              mt={2}
                              colorScheme="blue"
                            >
                              Capture Image
                            </Button>
                          </Flex>
                        </>
                      ) : (
                        <Box>
                          <Image
                            src={capturedImage}
                            alt="Captured Droppoint"
                            maxHeight="300px"
                          />
                          <Flex justifyContent="center" width="100%">
                            <Button
                              onClick={() => setCapturedImage(null)}
                              mt={2}
                              colorScheme="red"
                            >
                              Retake Picture
                            </Button>
                          </Flex>
                        </Box>
                      )}
                    </Box>
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="green"
                    width="50%"
                    isDisabled={!capturedImage}
                  >
                    Submit
                  </Button>
                </VStack>
              </form>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
      <SuccessModal />
    </Flex>
  );
};

export default RegisterDroppoint;
