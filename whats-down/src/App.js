
import './App.css';
import Login from './components/LogIn';
import { useState } from 'react';
import ChatScreen from './components/ChatScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  const [current_user,set_current_user] = useState(null);
  //user list
  const [user_list, setUser] = useState([
    {
      user_name: 'omer',
      password: '123',
      display_name: 'hamdiTools',
      picture: 'funny',
    }
  ]);

  //add a new user to the user list
  const addUser = (args) => {
    setUser([...user_list, {
      user_name: args.user_name,
      password: args.password,
      display_name: args.display_name,
      picture: args.picture,
    }])
    return 'success'
  }

  //check if user already in userlist
  const checkUser = (user_name) => {
    let isExists = false;
    user_list.map((user) => (
      (user.user_name === user_name) ? isExists = true : 'good'
    ))
    return isExists
  }

  const getCurrentUserName = () => {
    console.log(current_user)
    return current_user;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login user_list={user_list} checkUser={checkUser} addUser={addUser} set_current_user={set_current_user} />} />
          <Route path="/chat" element={<ChatScreen getCurrentUserName={getCurrentUserName} />} />
        </Routes>
      </BrowserRouter>
      {/* <Login user_list={user_list} checkUser={checkUser} addUser={addUser}/> */}
      {/* <ChatScreen /> */}


    </div>
  );

}

export default App;
