package com.example.myapplication;

import android.os.Build;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import com.example.myapplication.api.AndroidServiceAPI;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class ChatActivity extends AppCompatActivity implements Listener {

    MessagesListAdapter MsgListAdapter;

    private MessageDao messageDao;
    private EditText etInputText;
    private ArrayList<Message> messages = new ArrayList<Message>();

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //HERE CONSTANTS DECLARATION
        etInputText = findViewById(R.id.et_InputText);
        AndroidServiceAPI serviceAPI = new AndroidServiceAPI(findViewById(R.id.linearLayout_Chat));
        setContentView(R.layout.activity_chat_screen);
        TextView vtContactName = findViewById(R.id.SelectedContactName);
        FloatingActionButton fabSend = findViewById(R.id.fab_SendMessage);
        String connectedUser = ChosenValues.getInstance().getUser().getUsername();
        String selectedContact = ChosenValues.getInstance().getSelectedContact().getId();
        String server = ChosenValues.getInstance().getSelectedContact().getServer().replaceAll("/", "");
        //adapter connection to the listview
        ListView msg_listview = findViewById(R.id.listView_messages);
        MsgListAdapter = new MessagesListAdapter(this, new ArrayList<Message>());
        msg_listview.setAdapter(MsgListAdapter);
        msg_listview.setClickable(false);
        //HERE ROOM DB SETTINGS:
        vtContactName.setText(selectedContact);
        AppMessagesDB db = Room.databaseBuilder(getApplicationContext(), AppMessagesDB.class, connectedUser + selectedContact + server).fallbackToDestructiveMigration().allowMainThreadQueries().build();
        AppContactsDB dbContacts = Room.databaseBuilder(getApplicationContext(), AppContactsDB.class, connectedUser).fallbackToDestructiveMigration().allowMainThreadQueries().build();
        messageDao = db.messageDao();

        //send message button
        fabSend.setOnClickListener(v -> {
            String inputText = etInputText.getText().toString();
            if (!inputText.equals("")) {
                etInputText.setText("");
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
                ChosenValues.getInstance().getSelectedContact().setLast(inputText);
                ChosenValues.getInstance().getSelectedContact().setLastdate(LocalDateTime.now().format(formatter));


//                Message message = new Message(0, inputText, true, LocalDateTime.now().format(formatter));
                serviceAPI.UpdateMessages(ChosenValues.getInstance().getSelectedContact(), messageDao);


//                messageDao.insert(message);
//                contactsDao.update(ChosenValues.getInstance().getSelectedContact());
//                MsgListAdapter.add(message);
//                MsgListAdapter.notifyDataSetChanged();
//                listview.smoothScrollToPosition(MsgListAdapter.getCount() - 1);
            }
        });
        //room ends here.

        FloatingActionButton fab_backFromChat = findViewById(R.id.btn_backFromChat);
        fab_backFromChat.setOnClickListener(v -> finish());

        //from here we can get the messages from the database


        serviceAPI.UpdateMessages(ChosenValues.getInstance().getSelectedContact(), messageDao);

        ChosenValues.getInstance().setWaiting(this);
    }

    @Override
    public void finished() {
        MsgListAdapter.clear();
        for (Message message : messageDao.index()) {
            MsgListAdapter.add(message);
            MsgListAdapter.notifyDataSetChanged();
        }
    }
}
