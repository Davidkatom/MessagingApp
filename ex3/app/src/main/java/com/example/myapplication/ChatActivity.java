package com.example.myapplication;

import android.os.Bundle;
import android.widget.ListView;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;

public class ChatActivity extends AppCompatActivity {

    final private String [] tempMessages = {"text 1","text 2","text 3","text 4 which is very long and with lots of words"};
    final private String [] tempMessagesTimes = {"10:23","10:24","10:25","10:28"};


    ListView listview;
    MessagesListAdapter adapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_screen);

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