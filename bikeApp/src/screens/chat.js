import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, child, onValue, off } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import config from '../config/firebase';

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
    <View>
      <Text>Chat Page</Text>
      {user && (
        <>
          <TextInput
            placeholder="Message"
            onChangeText={(text) => setMessage(text)}
            value={message}
          />
          <TouchableOpacity onPress={handleSend}>
            <Text>Send</Text>
          </TouchableOpacity>
          {selectedUser && (
            <>
              <Text>Conversation with {selectedUser.email}:</Text>
              {messages.map((msg) => (
                <Text key={msg.key}>{user.email}: {msg.text}</Text>
              ))}
            </>
          )}
          <Text>Select a user to chat:</Text>
          {user && (
            <>
              {user.uid !== selectedUser?.uid && (
                <TouchableOpacity onPress={() => setSelectedUser(user)}>
                  <Text>{user.email}</Text>
                </TouchableOpacity>
              )}
              {user.contacts && Object.values(user.contacts).map((contact) => {
                if (contact.uid !== selectedUser?.uid) {
                  return (
                    <TouchableOpacity key={contact.uid} onPress={() => setSelectedUser(contact)}>
                      <Text>{contact.email}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default Chat;
