import { useEffect, useState } from "react";
import { Col, ListGroup, Button } from "react-bootstrap";
import { useChatContext } from "@/context/useChatContext";
import { getAllChats, getMessagesByUser } from "@/helpers/data";
import type { SocialUserType, MessageType } from "@/types/data";

const ChatSystem = () => {
  const [chatUsers, setChatUsers] = useState<SocialUserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<SocialUserType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { chatList } = useChatContext();

  // Load chat users
  useEffect(() => {
    const fetchChats = async () => {
      const users = await getAllChats(); // fetch users who sent messages
      setChatUsers(users);
    };
    fetchChats();
  }, []);

  // Load messages when user is selected
  useEffect(() => {
    if (!selectedUser) return;
    const fetchMessages = async () => {
      const msgs = await getMessagesByUser(selectedUser.id);
      setMessages(msgs);
    };
    fetchMessages();
  }, [selectedUser]);

  return (
    <>
      <Col xxl={3}>
        <ListGroup>
          {chatUsers.map((user) => (
            <ListGroup.Item
              key={user.id}
              action
              active={selectedUser?.id === user.id}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
              <div className="small text-muted">{user.lastMessage}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>

      <Col xxl={9}>
        {selectedUser ? (
          <div>
            <h5>Chat with {selectedUser.name}</h5>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {messages.map((msg, index) => (
                <div key={index} className={`p-2 my-1 ${msg.fromSelf ? "text-end" : ""}`}>
                  <div className="bg-light rounded p-2">{msg.content}</div>
                </div>
              ))}
            </div>
            <Button variant="primary" className="mt-2">
              Reply
            </Button>
          </div>
        ) : (
          <div>Select a user to start chatting</div>
        )}
      </Col>
    </>
  );
};

export default ChatSystem;
