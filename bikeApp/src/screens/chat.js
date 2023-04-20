import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, child, onValue, off } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import config from '../config/firebase';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import i18n from '../config/i18n';
import GoBack from '../components/goBack';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigation = useNavigation();

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
      <GoBack onPress={() => navigation.goBack()}/>
      {user && (
        <ChatContainer>
          <MessageContainer>
            {selectedUser && (
              <>
                <ConversationHeader>{t('conversation')} {selectedUser.email}:</ConversationHeader>
                {messages.map((msg) => (
                  <Message key={msg.key}>Maktooo: {msg.text}</Message>
                ))}
              </>
            )}
          </MessageContainer>
          
          <UserListContainer>
            <UserListHeader>{t('selectUser')}:</UserListHeader>
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
      <InputContainer>
        <Input
          placeholder="Message"
          onChangeText={(text) => setMessage(text)}
          value={message}
        />
        <SendButton onPress={handleSend}>
          <SendButtonText>{t('send')}</SendButtonText>
        </SendButton>
      </InputContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Header = styled.View`
  height: 80px;
  background-color: ${props => props.theme.backgroundColor};
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.backgroundColor};
  width:400px;
  text-align:center;
`;

const ChatContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const MessageContainer = styled.View`
  flex: 2;
  padding: 16px;
  color: ${props => props.theme.backgroundColor};
`;

const ConversationHeader = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${props => props.theme.textColor};
`;

const Message = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  width:350px;
  color: ${props => props.theme.textColor};
`;

const InputContainer = styled.View`
  flex: 1;
  padding: 16px;
  top:109px;
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
  color: ${props => props.theme.textColor};
`;

const UserListItem = styled.TouchableOpacity`
  padding: 8px;
  margin-bottom: 8px;
  background-color: #f2f2f2;
  border-radius: 4px;
  width:100px;
`;

const UserListItemText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.textColor};
`;

export default Chat;
