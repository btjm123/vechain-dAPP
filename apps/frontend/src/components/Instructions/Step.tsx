import { Box, HStack, Image, VStack, Text, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = {
  icon: string | IconType;
  title: string;
  description: string;
};

export const Step = ({ icon, title, description }: Props) => {
  return (
    <Box>
      <HStack spacing={2} align="flex-start">
        {typeof icon === "string" ? (
          <Image
            src={icon}
            w={{ base: 12, md: 16 }}
            h={{ base: 12, md: 16 }}
            objectFit="contain"
          />
        ) : (
          <Icon as={icon} w={{ base: 12, md: 16 }} h={{ base: 12, md: 16 }} />
        )}
        <VStack align="flex-start" spacing={0}>
          <Text fontSize={{ base: "sm", md: "md" }} fontWeight={600}>
            {title}
          </Text>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight={400}
            color="gray.500"
          >
            {description}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};
