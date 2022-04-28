
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
 
  var omer_contact_list={
    "OtherOmer": {
      user_name: 'OtherOmer',
      display_name: 'HamdiTools',
      chat_history: [(<MessageElm direction="send" src={'hello'} timeStamp={date2} messagetype='text' />), (<MessageElm direction="receive" src={'שלום בחזרה'} timeStamp={date1} messagetype='text' />)],
      last_message: (<MessageElm direction="receive" src={'שלום בחזרה'} timeStamp={date1} messagetype='text' />),
      picture: "omer.png",
    },
    "davidShan": {
      user_name: 'davidShan',
      display_name: 'David Katom',
      chat_history: [(<MessageElm direction="send" src={'cake.jpg'} timeStamp={date2} messagetype='image' />), (<MessageElm direction="receive" src={'Still Alive.mp4'} timeStamp={date1} messagetype='video' />)],
      last_message: (<MessageElm direction="send" src={'sent video'} timeStamp={date2} messagetype='text' />),
      picture: "david.png",
    },
    "joe": {
      user_name: 'joe',
      display_name: 'joe shmoe',
      chat_history: [(<MessageElm direction="receive" src={'Turret Im Different.mp3'} timeStamp={date3} messagetype='audio' />), (<MessageElm direction="send" src={'לוזר'} timeStamp={date2} messagetype='text' />)],
      last_message: (<MessageElm direction="send" src={'לוזר'} timeStamp={date2} messagetype='text' />),
      picture: "blank-profile-picture.png",
    },
    "yossi": {
      user_name: 'yossi',
      display_name: 'yossi the bossi',
      chat_history: [],
      last_message: emptyMsg,
      picture: "blank-profile-picture.png",
    },
    "Hampti": {
      user_name: 'Hampti',
      display_name: 'Hampti Dampti',
      chat_history: [],
      last_message: emptyMsg,
      picture: "blank-profile-picture.png",
    },
  };

  //user list
  const [user_list, setUser] = useState(
    {
      "OmerHamdi": {
        user_name: 'OmerHamdi',
        password: 'qwe123',
        display_name: 'HamdiTools',
        picture: "blank-profile-picture.png",
        contact_list: omer_contact_list,
      },
      "OtherOmer": {
        user_name: 'OtherOmer',
        password: 'qwe123',
        display_name: 'another omer',
        picture: "blank-profile-picture.png",
        contact_list: [],
      },
      "davidShan": {
        user_name: 'davidShan',
        password: 'qwe123',
        display_name: 'David Katom',
        picture: "blank-profile-picture.png",
        contact_list: [],
      },
    }
  );

  //add a new user to the user list
  const addUser = (args) => {
    if (args.picture === "") {
      args.picture = "../../src/Images/blank-profile-picture.png";
    }

    user_list[args.user_name] = {
      user_name: args.user_name,
      password: args.password,
      display_name: args.display_name,
      picture: args.picture,
      contact_list: [],
    };
    setUser(user_list);
    return 'success'
  }

  //check if user already in userlist
  const checkUser = (user_name) => {
    return user_name in user_list;
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login user_list={user_list} checkUser={checkUser} addUser={addUser} set_current_user={set_current_user} />} />
          <Route path="/chat" element={<ChatScreen current_user={current_user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
