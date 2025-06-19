"use client"
import { Box, VStack, Heading, Avatar, Text, Button, Divider, useColorModeValue } from "@chakra-ui/react"
import { FiHome, FiSettings, FiLogOut } from "react-icons/fi"
import { demoAuth } from "@/lib/demo-auth"

const DashboardSidebar = () => {
  const bgColor = useColorModeValue("gray.100", "gray.700")
  const textColor = useColorModeValue("gray.700", "gray.300")
  const buttonBgColor = useColorModeValue("blue.500", "blue.300")
  const buttonTextColor = useColorModeValue("white", "gray.800")

  const user = demoAuth.getCurrentUser()
  const userName = user?.user_metadata?.full_name || "Demo User"
  const userEmail = user?.email || "demo@profitz.com"
  const userAvatar = user?.user_metadata?.avatar_url

  const handleSignOut = () => {
    demoAuth.signOut()
    window.location.href = "/auth/signin"
  }

  return (
    <Box
      bg={bgColor}
      w="250px"
      h="100vh"
      position="fixed"
      left={0}
      top={0}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.600")}
    >
      <VStack p={4} align="start" spacing={6}>
        <Heading size="lg" color={textColor}>
          Dashboard
        </Heading>
        <Divider />
        <Avatar size="md" name={userName} src={userAvatar} />
        <Text fontWeight="bold" color={textColor}>
          {userName}
        </Text>
        <Text fontSize="sm" color={textColor}>
          {userEmail}
        </Text>
        <Divider />
        <Button leftIcon={<FiHome />} colorScheme="blue" variant="ghost" alignSelf="stretch" color={textColor}>
          Home
        </Button>
        <Button leftIcon={<FiSettings />} colorScheme="blue" variant="ghost" alignSelf="stretch" color={textColor}>
          Settings
        </Button>
        <Button
          leftIcon={<FiLogOut />}
          colorScheme="red"
          variant="ghost"
          alignSelf="stretch"
          onClick={handleSignOut}
          color={textColor}
        >
          Sign Out
        </Button>
      </VStack>
    </Box>
  )
}

export default DashboardSidebar
