package com.example.myapplication;

import android.os.Build;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import com.example.myapplication.api.AndroidServiceAPI;

import java.util.ArrayList;

public class ChatActivity extends AppCompatActivity implements Listener {

    MessagesListAdapter MsgListAdapter;
    private ListView msg_listview;
    private MessageDao messageDao;

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ChosenValues.getInstance().setWaiting(this);
        //HERE CONSTANTS DECLARATION
        LinearLayout mRootView = (LinearLayout) findViewById(R.id.cl_login_screen);//TODO FIX THIS
        AndroidServiceAPI serviceAPI = new AndroidServiceAPI(mRootView);
        setContentView(R.layout.activity_chat_screen);
        TextView vtContactName = findViewById(R.id.SelectedContactName);
        String connectedUser = ChosenValues.getInstance().getUser().getUsername();
        String selectedContact = ChosenValues.getInstance().getSelectedContact().getId();
        String server = ChosenValues.getInstance().getSelectedContact().getServer().replaceAll("/", "");
        //adapter connection to the listview
        msg_listview = findViewById(R.id.listView_messages);
        MsgListAdapter = new MessagesListAdapter(this, new ArrayList<Message>());
        ChosenValues.getInstance().setMsgAdapter(MsgListAdapter);
        msg_listview.setAdapter(MsgListAdapter);
        msg_listview.setClickable(false);
        //HERE ROOM DB SETTINGS:
        vtContactName.setText(selectedContact);
        AppMessagesDB db = Room.databaseBuilder(getApplicationContext(), AppMessagesDB.class, connectedUser + selectedContact + server).fallbackToDestructiveMigration().allowMainThreadQueries().build();
        messageDao = db.messageDao();

        //send message button
        findViewById(R.id.fab_SendMessage).setOnClickListener(v -> {
            EditText etInputText = findViewById(R.id.et_InputText);
            String inputText = etInputText.getText().toString();
            if (!inputText.equals("")) {
                etInputText.setText("");
                serviceAPI.PostMessage(ChosenValues.getInstance().getSelectedContact(), inputText, messageDao, MsgListAdapter);
            }
        });

        //back button:
        findViewById(R.id.fab_backToContactList).setOnClickListener(v -> {
            finish();
        });

        serviceAPI.UpdateMessages(ChosenValues.getInstance().getSelectedContact(), messageDao, MsgListAdapter);

    }

    @Override
    public void finished() {
        msg_listview.smoothScrollToPosition(MsgListAdapter.getCount() - 1);

    }
}
