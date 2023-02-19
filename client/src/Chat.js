import React from "react";
import { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  let sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).toLocaleTimeString(),
      };
      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
      <ScrollToBottom className="message-container">
        {messageList.map((data, index) => {
          return (
            <div
            key={index}
              className="message"
              id={username === data.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{data.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{data.time}</p>
                  <p id="author"> {data.author}</p>
                </div>
              </div>
            </div>
          );
        })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="hey"
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e)=>{
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
