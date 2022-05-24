
import './App.css';
import Login from './components/LogIn';
import { useState } from 'react';
import ChatScreen from './components/ChatScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MessageElm from './components/AttachmentElements/MessageElm';
function App() {

  const [current_user, set_current_user] = useState('No UserName');
  var date1 = new Date();
  var date2 = new Date();
  date2.setDate(date2.getDate() - 1);
  var date3 = new Date();
  date3.setMinutes(date3.getMinutes() - 12);
  var emptyMsg = <MessageElm direction="send" src={'empty chat'} timeStamp={null} messagetype='text' />;
 
  const [token, setToken] = useState("")


  //check if user already in userlist
  // const checkUser = (user_name) => {
  //   return user_name in user_list;
  // }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login  setToken={setToken} />} />
          <Route path="/chat" element={<ChatScreen token={token} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
