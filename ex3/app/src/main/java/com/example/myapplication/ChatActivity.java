package com.example.myapplication;

import android.os.Bundle;
import android.widget.EditText;
import android.widget.ListView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;
import java.util.Date;

public class ChatActivity extends AppCompatActivity {

    final private String [] tempMessages = {"text 1","text 2","text 3","text 4 which is very long and with lots of words"};
    final private String [] tempMessagesTimes = {"10:23","10:24","10:25","10:28"};


    ListView listview;
    MessagesListAdapter adapter;

    private AppMessagesDB db;
    private MessageDao messageDao;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_screen);

        //room from here:
        db = Room.databaseBuilder(getApplicationContext(), AppMessagesDB.class, "MessagesDB").allowMainThreadQueries().build();
        messageDao = db.messageDao();
        FloatingActionButton fabSend = findViewById(R.id.fab_SendMessage);
        fabSend.setOnClickListener(v-> {
                    EditText etInputText = findViewById(R.id.et_InputText);
                    String inputText = etInputText.getText().toString();
                    etInputText.setText("");
                    Date date = new Date();
                    //33:26
                    Message message = new Message(inputText, true, "add DAte", "add Time");
                    messageDao.insert(message);
                    adapter.add(message);
                    adapter.notifyDataSetChanged();
                });
        //room ends here.

        FloatingActionButton fab_backFromChat = findViewById(R.id.btn_backFromChat);
        fab_backFromChat.setOnClickListener(v -> finish());

        //from here we can get the messages from the database

        ArrayList<Message> messages = new ArrayList<>();

        for (int i = 0; i < tempMessages.length; i++) {
            messages.add(new Message(tempMessages[i], i%2==0, "12/12/12", tempMessagesTimes[i]));
        }
        listview = findViewById(R.id.listView_messages);
        adapter = new MessagesListAdapter(this, messages);
        listview.setAdapter(adapter);
        listview.setClickable(false);
    }
}