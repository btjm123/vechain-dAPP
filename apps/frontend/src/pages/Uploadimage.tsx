import { DAppKitProvider } from "@vechain/dapp-kit-react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../const";
import React, { useState, useCallback, useEffect } from "react";
import {
  ChakraProvider,
  Container,
  Flex,
  Text,
  HStack,
  Icon,
  Box,
} from "@chakra-ui/react";
import { FcApproval } from "react-icons/fc";
import {
  Dropzone,
  Footer,
  Instructions,
  Navbar,
  SubmissionModal,
} from "../components";
import { lightTheme } from "../theme";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

// Container style for the Google Map
const containerStyle = {
  width: "400px",
  height: "400px",
  margin: "20px",
};

// Center of the map
const dropoff = {
  lat: 1.303884751141622,
  lng: 103.78968391193682,
};

interface UploadimageProps {}

export const Uploadimage: React.FC<UploadimageProps> = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const navigate = useNavigate();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(dropoff);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        },
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
  }, []);

  return (
    <ChakraProvider theme={lightTheme}>
      <DAppKitProvider
        usePersistence
        requireCertificate={false}
        genesis="test"
        nodeUrl="https://testnet.vechain.org/"
        logLevel={"DEBUG"}
      >
        <Navbar />
        <Flex flex={1}>
          <Container
            mt={{ base: 4, md: 10 }}
            maxW={"container.xl"}
            mb={{ base: 4, md: 10 }}
            display={"flex"}
            flex={1}
            alignItems={"center"}
            justifyContent={"flex-start"}
            flexDirection={"column"}
          >
            <Box alignSelf="start" onClick={() => navigate("/select-role")}>
              <FaArrowLeft />
              <Text> Go back</Text>
            </Box>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{ ...containerStyle, height: "300px" }}
                center={dropoff}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                {userLocation && (
                  <Marker
                    position={userLocation}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    }}
                  />
                )}
                <Marker position={dropoff} />
              </GoogleMap>
            )}

            <div
              style={{
                padding: "20px",
                backgroundColor: "black",
                border: "1px solid #ddd",
                borderRadius: "50px",
                width: "400px",
                textAlign: "center",
                margin: "10px",
              }}
            >
              {" "}
              <p
                style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}
              >
                Dropoff: 11 Slim Barracks, NTU Alumni Club{" "}
              </p>{" "}
            </div>

            <HStack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              my={2}
            ></HStack>

            <Dropzone />
            <Instructions />
          </Container>
        </Flex>

        <Footer />

        {/* MODALS  */}
        <SubmissionModal />
      </DAppKitProvider>
    </ChakraProvider>
  );
};
