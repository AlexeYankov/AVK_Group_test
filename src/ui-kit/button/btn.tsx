import { Button } from "@chakra-ui/react";

type PropType = {
  title?: string;
};

export const ButtonKit = (prop: PropType) => {
  const { title = "add Post" } = prop;
  return (
    <Button colorScheme="teal" type="submit">
      {title}
    </Button>
  );
};
