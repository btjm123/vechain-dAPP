"use client";
import {
  VStack,
  Text,
  Container,
  HStack,
  Box,
  Show,
  Link,
  Flex,
} from "@chakra-ui/react";

import { DiscordButton } from "./components/DiscordButton";
import { TelegramButton } from "./components/TelegramButton";
import { Socials } from "./components/Socials";
import { PRIVACY_POLICY_LINK, TERMS_AND_CONDITIONS_LINK } from "../../const";
import { BeBetterVeBetterIcon } from "../Icon";

export const Footer: React.FC = () => {
  const desktopContent = (
    <VStack>
      <HStack justifyContent={"space-between"} w="full" spacing={4} my={4}>
        <Box my={14}>
          <BeBetterVeBetterIcon
            beBetterProps={{
              width: "80%",
            }}
            veBetterProps={{
              width: "100%",
            }}
          />
        </Box>
        <VStack spacing={4} alignItems={"flex-end"}>
          <DiscordButton />
          <TelegramButton />
        </VStack>
      </HStack>
    </VStack>
  );

  const mobileContent = (
    <VStack spacing={4} my={4}>
      <Box my={8}>
        <BeBetterVeBetterIcon
          beBetterProps={{
            width: "80%",
          }}
          veBetterProps={{
            width: "100%",
          }}
        />
      </Box>
    </VStack>
  );

  return (
    <Flex bgColor={"#191714"}>
      <Container
        maxW={"container.xl"}
        display={"flex"}
        alignItems={"stretch"}
        justifyContent={"flex-start"}
        flexDirection={"column"}
      >
        <Show above="md">{desktopContent}</Show>
        <Show below="md">{mobileContent}</Show>
      </Container>
    </Flex>
  );
};
