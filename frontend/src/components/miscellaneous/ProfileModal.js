import { ViewIcon  } from '@chakra-ui/icons'
import { IconButton, ModalFooter, ModalBody, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay, Modal, useDisclosure, Button, Image, Text } from '@chakra-ui/react'
import React from 'react'

const ProfileModal = ({user, children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return <>
  {children?(
    <span onClick={onOpen}>{children}</span>
    ):(
    <IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}/>
  )}
  <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="40px" fontFamily="Work sans" display="flex" justifyContent="center">
            {user.name}
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            ModalBody
          </ModalBody>
            <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
            />
            <Text fontSize={{base:"29px", md:"30px"}} fontFamily={"Work sans"}>
                Email:{user.email}
            </Text>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
  </>

}

export default ProfileModal
