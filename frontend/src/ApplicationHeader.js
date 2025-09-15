import { View, Heading, Flex} from "@adobe/react-spectrum";

function ApplicationHeader({ actionButton, title, children }) {
  return (
    <Flex direction="column" minHeight="100vh">
      <View colorVersion="6" borderBottomWidth="thick" paddingLeft="size-100" paddingRight="size-100" flexGrow={0}>
        <Flex direction="row" alignItems="center" gap="size-100">
          {actionButton}
          <View width="100%" >
              <Heading level={1} >Todo App</Heading>
          </View>
        </Flex>
      </View>
      <View 
      colorVersion="6"

        borderBottomWidth="thick"
        padding="size-100"
        flexGrow={0}
      >
        <Heading
          level={2}
          marginY="size-0"
          flex
        >
          {title}
        </Heading>
      </View>
      <Flex id="HeaderChildren" direction="column" flexGrow={1}>
        {children}
      </Flex>
    </Flex>
  );
}

export default ApplicationHeader;