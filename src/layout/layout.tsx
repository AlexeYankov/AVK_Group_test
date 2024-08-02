import { ReactNode } from "react";
import { Center } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

export const ContainerLayout = ({ children }: Props) => {
  return (
    <Center>
      <Center
        display={"flex"}
        flexDirection={"column"}
        px={"20px"}
        maxW={"1440px"}
        w={"100%"}
      >
        {children}
      </Center>
    </Center>
  );
};
