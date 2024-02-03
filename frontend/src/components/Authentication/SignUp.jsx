import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, Button, useToast } from "@chakra-ui/react";
import { warning } from "framer-motion";
import { set } from "mongoose";
import React, { useState } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();       // chakra-ui functionality
  const history = useHistory();


  const handleClick = () => setShow(!show);

  // const postDetails = (pics) => {
  //   setLoading(true);
  //   if (pics === undefined){
  //     toast({                                   // element copied from the chakra-ui component
  //       title: 'Please select an Image',
  //       description: "You need to select an image",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     return;
  //   }

  //   if (pics.type === "image/jpeg" || "image/png"){
  //     const data = new FormData();
  //     data.append("file", pics);
  //     data.append("upload_preset", "chat-app");         //modify according to your data
  //     data.append("cloud_name","dbfbqka8s" );                        //modify according to your data

  //     fetch("https://res.cloudinary.com/dbfbqka8s/image/upload/", {
  //       method: 'post', 
  //       body: data,
  //     }).then((res) => res.json())
  //       .then(data => {
  //         setPic(data.url.toString());
  //         setLoading(false);
  //       })
  //       .catch((err) =>{
  //         console.log(err);
  //         setLoading(false);
  //       });
  //   } else {
  //     toast({                                   // element copied from the chakra-ui component
  //       title: 'Please select an Image',
  //       description: "You need to select an image",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //     setLoading(false);
  //     return;
  //   }
  // };

  const submitHandler = async() => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword){
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword){
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const {data} = await axios.post(
        "/api/user",
        {name,email, password, pic},
        config
        );
      toast  ({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem('userInfo', JSON.stringify(data));

      setLoading(false);
      history.push('chats')
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  
  return (
    <VStack spacing="5px" color="black">
      <FormControl id='name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>New Password</FormLabel>
        <InputGroup>
        <Input
        type={show ? "text": "password"}
          placeholder="Enter New Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide":"Show"}
          </Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='confirmPassword' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
        <Input
        type={show ? "text": "password"}
          placeholder="Re-Type Password"
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide":"Show"}
          </Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* <FormControl id='pic' isRequired>
        <FormLabel>Upload Picture</FormLabel>
        <Input
        type="file"
        p={.5}
        accept="image/*"
          placeholder="Enter your Email"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl> */}

      <Button 
      colorScheme="blue" 
      width="100%" 
      style={{marginTop: 15}} 
      onClick={submitHandler}
      isLoading = {loading}
      >SignUp
      </Button>
    </VStack>
  );
};

export default SignUp;
