// import React from "react";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// import {
//   Text,
//   Box,
//   Heading,
//   Table,
//   TableContainer,
//   Tbody,
//   Td,
//   Th,
//   Thead,
//   Tr,
//   Collapse,
// } from "@chakra-ui/react";

// import {
//   Dropzone,
//   Footer,
//   Instructions,
//   Navbar,
//   SubmissionModal,
// } from "../components";
// import { GOOGLE_MAPS_API_KEY } from "../const";

// export const SelectDropoffLocationPage: React.FC = () => {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY, // Replace with your actual API key
//   });

//   const [map, setMap] = React.useState<google.maps.Map | null>(null);
//   const [selectedLocation, setSelectedLocation] = React.useState<number>(1);

//   const onLoad = React.useCallback(function callback(map: google.maps.Map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     locations.forEach((location) =>
//       bounds.extend(new window.google.maps.LatLng(location.lat, location.lng)),
//     );
//     map.fitBounds(bounds);

//     setMap(map);
//   }, []);

//   // const renderTable = () => {
//   //   return (
//   //     <Box mt={4}>
//   //       <Heading size="md">Select a Dropoff Location</Heading>
//   //       <TableContainer mt={4}>
//   //         <Table variant="simple">
//   //           <Thead>
//   //             <Tr>
//   //               <Th>Location</Th>
//   //               <Th isNumeric>Status</Th>
//   //             </Tr>
//   //           </Thead>
//   //           <Tbody>
//   //             {locations.map((location) => (
//   //               <React.Fragment key={location.id}>
//   //                 <Tr
//   //                   bg={location.id === selectedLocation ? "blue.100" : "white"}
//   //                   onClick={() => handleMarkerClick(location.id)}
//   //                   cursor="pointer"
//   //                 >
//   //                   <Td>{location.label}</Td>
//   //                   <Td isNumeric>
//   //                     {location.id === selectedLocation ? (
//   //                       <Text color="blue.600">Selected</Text>
//   //                     ) : (
//   //                       <Text color="gray.600">Not Selected</Text>
//   //                     )}
//   //                   </Td>
//   //                 </Tr>
//   //               </React.Fragment>
//   //             ))}
//   //           </Tbody>
//   //         </Table>
//   //       </TableContainer>
//   //     </Box>
//   //     // <div>
//   //     //   {selectedLocation && <div>Selected Location: {selectedLocation}</div>}
//   //     // </div>
//   //   );
//   // };

//   // <Td colSpan={2}>
//   //   <Collapse in={location.id === selectedLocation}>
//   //     <Box p={4} bg="blue.50" borderRadius="md">
//   //       <Text fontWeight="bold">Details:</Text>
//   //       <Text>{location.details}</Text>
//   //     </Box>
//   //   </Collapse>
//   // </Td>

//   const onUnmount = React.useCallback(function callback(
//     map: google.maps.Map | null,
//   ) {
//     setMap(null);
//   }, []);

//   const handleMarkerClick = (locationId: number) => {
//     setSelectedLocation(locationId);
//   };

//   return isLoaded ? (
//     <div>
//       // <Navbar />
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={12}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         {locations.map((location) => (
//           <Marker
//             key={location.id}
//             position={{ lat: location.lat, lng: location.lng }}
//             label={location.label}
//             onClick={() => handleMarkerClick(location.id)}
//           />
//         ))}
//         {/* Child components, such as info windows, can be added here */}
//       </GoogleMap>
//       // <br />
//       // <br />
//       // <br />
//       // <Footer />;
//     </div>
//   ) : (
//     <div>Loading...</div>
//   );
// };

import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { FOOTER_IMAGE, GOOGLE_MAPS_API_KEY, NAVBAR_IMAGE } from "../const";

import {
  Text,
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Collapse,
  Container,
  HStack,
  Image,
} from "@chakra-ui/react";
import { ConnectWalletButton, Footer, Navbar, Navbar2 } from "../components";
import { NiceButton } from "../components/NiceButton";
import { useNavigate } from "react-router";
// Container style for the Google Map
const containerStyle = {
  width: "414px",
  height: "400px",
};

// Center of the map
const center = {
  lat: 1.303884751141622,
  lng: 103.78968391193682,
};

// Example locations with coordinates and labels
const locations = [
  {
    id: 1,
    lat: 1.303884751141622,
    lng: 103.78968391193682,
    label: "11 Slim Barrcks, NTU Alumni Club",
    details: "test tst",
  },
  {
    id: 2,
    lat: 1.3024444880861306,
    lng: 103.78970567016756,
    label: "One North Residences",
    details: "test test",
  },
  {
    id: 3,
    lat: 1.3053446555733805,
    lng: 103.78840982226612,
    label: "Rochestor Mall Condo",
    details: "test",
  },
];

export const SelectDropoffLocationPage: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY, // Replace with your actual API key
  });

  const navigate = useNavigate();
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [showButton, setShowButton] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<number>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((location) =>
      bounds.extend(new window.google.maps.LatLng(location.lat, location.lng)),
    );
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(
    map: google.maps.Map | null,
  ) {
    setMap(null);
  }, []);

  const handleMarkerClick = (locationId: number) => {
    setSelectedLocation(locationId);
    setShowButton(true);
  };

  const renderTable = () => {
    return (
      <Box mt={6}>
        <TableContainer mt={4}>
          <Table variant="simple" width={"100%"}>
            <Thead>
              <Tr>
                <Th>Location</Th>
                <Th isNumeric>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {locations.map((location) => (
                <React.Fragment key={location.id}>
                  <Tr
                    bg={location.id === selectedLocation ? "blue.100" : "white"}
                    onClick={() => handleMarkerClick(location.id)}
                    cursor="pointer"
                  >
                    <Td>{location.label}</Td>
                    <Td isNumeric>
                      {location.id === selectedLocation ? (
                        <Text color="blue.600">Selected</Text>
                      ) : (
                        <Text color="gray.600">Not Selected</Text>
                      )}
                    </Td>
                  </Tr>
                </React.Fragment>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return isLoaded ? (
    <div>
      <img src={NAVBAR_IMAGE} />
      <Heading size="lg" mb={6} ml={1}>
        Select a Dropoff Location
      </Heading>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            label={location.label}
            onClick={() => handleMarkerClick(location.id)}
          />
        ))}
        {/* Child components, such as info windows, can be added here */}
      </GoogleMap>
      {renderTable()}
      <Box
        display="flex" // Enables flexbox layout
        justifyContent="center" // Centers content horizontally
        alignItems="center" // Centers content vertically
        width="100vw"
        height="100px"
      >
        {showButton && (
          <NiceButton
            onClick={() => {
              navigate("/upload");
            }}
            mb={10}
            mt={10}
            text="Confirm Selection"
          />
        )}
      </Box>

      <img src={FOOTER_IMAGE} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};
