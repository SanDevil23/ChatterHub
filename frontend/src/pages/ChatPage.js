import { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  // api call
  const [chat, setChat] = useState([]);

  const fetchChat = async () => {
    const { data } = await axios.get("http://localhost:3000/api/chat");
    // const data1 = ['Malcolm', 'Alex', 'Fred'];
    setChat(data);
  };

  useEffect(() => {
    fetchChat();
  });

  return (
    <div>
      {chat?.map((chat) => (
        <div key={chat?._id}>{chat?.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
