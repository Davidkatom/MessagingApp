
import './App.css';
import Login from './components/LogIn';
import { useState } from 'react';
import ChatScreen from './components/ChatScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  const [current_user, set_current_user] = useState('No UserName');
  //user list
  const [user_list, setUser] = useState(
    {  "omer" : {
        user_name: 'omer',
        password: '123',
        display_name: 'hamdiTools',
        picture: "Images/blank-profile-picture.png",
      }
    }

  );

  //add a new user to the user list
  const addUser = (args) => {
    if(args.picture == ""){
      args.picture = "../../src/Images/blank-profile-picture.png";
    }

    user_list[args.user_name] = {user_name: args.user_name,
      password: args.password,
      display_name: args.display_name,
      picture: args.picture};    
    setUser(user_list);
    return 'success'
  }

  //check if user already in userlist
  const checkUser = (user_name) => {
    return user_name in user_list;
  }

  function getCurrentUserName() {
    console.log(current_user)
    return current_user;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {console.log(current_user)}
          <Route path="/" element={<Login user_list={user_list} checkUser={checkUser} addUser={addUser} set_current_user={set_current_user} />} />
          <Route path="/chat" element={<ChatScreen current_user={current_user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
