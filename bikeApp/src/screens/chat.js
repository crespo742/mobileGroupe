import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, child, onValue, off } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import config from '../config/firebase';
import styled from 'styled-components/native';

const Chat = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const app = initializeApp(config);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const db = getDatabase();
      const messagesRef = ref(db, `messages/${user.uid}/${selectedUser.uid}`);

      onValue(messagesRef, (snapshot) => {
        const messages = [];
        snapshot.forEach((childSnapshot) => {
          messages.push({
            key: childSnapshot.key,
            text: childSnapshot.val().text,
            user: childSnapshot.val().user,
          });
        });
        setMessages(messages);
      });

      return () => {
        off(messagesRef);
      };
    }
  }, [user, selectedUser]);

  const handleSend = () => {
    if (selectedUser) {
      const db = getDatabase();
      const messagesRef = ref(db, `messages/${user.uid}/${selectedUser.uid}`);
      const messageData = {
        text: message,
        user: user.uid,
      };
      push(messagesRef, messageData);
      setMessage('');
    }
  };

  return (
    <Container>
      <Header>
        <HeaderText>Chat Page</HeaderText>
      </Header>
      <InputContainer>
            <Input
              placeholder="Message"
              onChangeText={(text) => setMessage(text)}
              value={message}
            />
            <SendButton onPress={handleSend}>
              <SendButtonText>Send</SendButtonText>
            </SendButton>
          </InputContainer>
      {user && (
        <ChatContainer>
          <MessageContainer>
            {selectedUser && (
              <>
                <ConversationHeader>Conversation with {selectedUser.email}:</ConversationHeader>
                {messages.map((msg) => (
                  <Message key={msg.key}>Maktooo: {msg.text}</Message>
                ))}
              </>
            )}
          </MessageContainer>
          
          <UserListContainer>
            <UserListHeader>Select a user to chat:</UserListHeader>
            {user.uid !== selectedUser?.uid && (
              <UserListItem onPress={() => setSelectedUser(user)}>
                <UserListItemText>{user.email}</UserListItemText>
              </UserListItem>
            )}
            {user.contacts && Object.values(user.contacts).map((contact) => {
              if (contact.uid !== selectedUser?.uid) {
                return (
                  <UserListItem key={contact.uid} onPress={() => setSelectedUser(contact)}>
                    <UserListItemText>{contact.email}</UserListItemText>
                  </UserListItem>
                );
              }
            })}
          </UserListContainer>
        </ChatContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Header = styled.View`
  height: 80px;
  background-color: #f2f2f2;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.backgroundColor};
  
`;

const ChatContainer = styled.View`
  top:-125px;
  flex: 1;
  flex-direction: row;
`;

const MessageContainer = styled.View`
  flex: 2;
  padding: 16px;
`;

const ConversationHeader = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Message = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  width:350px;
`;

const InputContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const Input = styled.TextInput`
  height: 40px;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
`;

const SendButton = styled.TouchableOpacity`
  background-color: #2196f3;
  padding: 8px;
  border-radius: 4px;
  align-items: center;
`;

const SendButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const UserListContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const UserListHeader = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const UserListItem = styled.TouchableOpacity`
  padding: 8px;
  margin-bottom: 8px;
  background-color: #f2f2f2;
  border-radius: 4px;
`;

const UserListItemText = styled.Text`
  font-size: 16px;
`;

export default Chat;
