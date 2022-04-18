import ReactDOM from 'react-dom';

import './App.css';
import Login from './components/LogIn';
import { useState } from 'react';
import ChatScreen from './components/ChatScreen';

function App() {
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


  ReactDOM.render(
    <ChatScreen />,
    document.getElementById('root')
  );
  
}

export default App;
