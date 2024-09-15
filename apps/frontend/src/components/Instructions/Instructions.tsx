import { Card, Flex } from "@chakra-ui/react";
import { LuPackageOpen } from "react-icons/lu";
import { PiPlantFill } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";
import { Step } from "./Step";

const Steps = [
  {
    icon: PiPlantFill,
    title: "Return your used packagings",
    description:
      "Bring your old packagings to the drop point and reduce waste.",
  },
  {
    icon: LuPackageOpen,
    title: "Upload the deposit",
    description:
      "Upload your pictures and AI will verify the quality of the packaging.",
  },
  {
    icon: GiReceiveMoney,
    title: "Earn rewards",
    description: "Earn B3TR for returning eco-friendly products.",
  },
];

export const Instructions = () => {
  return (
    <Card mt={2} w={"full"} p={2}>
      <Flex p={{ base: 4 }} w="100%" direction={{ base: "column", md: "row" }}>
        {Steps.map((step, index) => (
          <Step key={index} {...step} /> // Adds margin-bottom to each step/>
        ))}
      </Flex>
    </Card>
  );
};
