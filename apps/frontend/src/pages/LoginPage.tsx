import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import loginAnimation from "./login-animation.json";

interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Username:", username);
    console.log("Password:", password);

    if (username === "john" && password !== "john") {
      setPassword("");
      toast({
        title: "Password is wrong!",
        description: "Please enter the correct password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    navigate("/select-role");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.50"
    >
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <Heading mb={6} textAlign="center">
          Welcome to ECOmmerce!
        </Heading>
        <Box width="200px" height="200px" margin="auto">
          <Lottie animationData={loginAnimation} loop={true} />
        </Box>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>
            <Button mt={4} colorScheme="blue" type="submit">
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};
