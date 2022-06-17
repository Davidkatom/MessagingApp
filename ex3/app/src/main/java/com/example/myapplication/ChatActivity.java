package com.example.myapplication;

import android.os.Build;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.ListView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;

public class ChatActivity extends AppCompatActivity {

    final private String[] tempMessages = {"text 1", "text 2", "text 3", "text 4 which is very long and with lots of words"};
    final private String[] tempMessagesTimes = {"10:23", "10:24", "10:25", "10:28"};


    ListView listview;
    MessagesListAdapter adapter;

    private AppMessagesDB db;
    private MessageDao messageDao;
    private EditText etInputText;

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_screen);

        //room from here:
        String connectedUser = ChosenValues.getInstance().getUser().getUsername();
        String sellectedContact = ChosenValues.getInstance().getSelectedContact().getUserName();
        db = Room.databaseBuilder(getApplicationContext(), AppMessagesDB.class, connectedUser+sellectedContact).allowMainThreadQueries().build();
        messageDao = db.messageDao();
        FloatingActionButton fabSend = findViewById(R.id.fab_SendMessage);
        etInputText = findViewById(R.id.et_InputText);
        //send message button
        fabSend.setOnClickListener(v -> {
            String inputText = etInputText.getText().toString();
            if (!inputText.equals("")) {
                etInputText.setText("");
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
                DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("H:mm");
                Date date = new Date();
                Message message = new Message(inputText, true, LocalDate.now().format(formatter), LocalDateTime.now().format(formatter2));
                messageDao.insert(message);
                adapter.add(message);
                adapter.notifyDataSetChanged();
                listview.smoothScrollToPosition(adapter.getCount() - 1);
            }
        });
        //room ends here.

        FloatingActionButton fab_backFromChat = findViewById(R.id.btn_backFromChat);
        fab_backFromChat.setOnClickListener(v -> finish());

        //from here we can get the messages from the database

        ArrayList<Message> messages = new ArrayList<>();

//        for (int i = 0; i < tempMessages.length; i++) {
//            messages.add(new Message(tempMessages[i], i % 2 == 0, "12/12/12", tempMessagesTimes[i]));
//        }

        messages.addAll(messageDao.index());
        listview = findViewById(R.id.listView_messages);
        adapter = new MessagesListAdapter(this, messages);
        listview.setAdapter(adapter);
        listview.setClickable(false);
    }
}