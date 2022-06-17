package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import android.widget.ListView;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;

public class ContactScreen extends AppCompatActivity {
    private ArrayList<User> users = new ArrayList<>();
    private ContactListAdapter adapter;
    private ListView listview;

    private AppContactsDB db;
    private ContactsDao contactsDao;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact_screen);
        final EditText etInputText = findViewById(R.id.et_InputText);

        adapter = new ContactListAdapter(this, users);
        listview = findViewById(R.id.contactList);
        listview.setAdapter(adapter);

        //room from here:
        db = Room.databaseBuilder(getApplicationContext(), AppContactsDB.class, "ContactsDB").allowMainThreadQueries().build();
        contactsDao = db.contactsDao();
        Button btnAddContact = findViewById(R.id.btnAddContact);

        //send message button
        btnAddContact.setOnClickListener(v->{
            String inputText = etInputText.getText().toString();
            if (!inputText.equals("")) {
                etInputText.setText("");
                User user = new User(inputText, 1, "hello", "10:00");
                contactsDao.insert(user);
                adapter.add(user);
                adapter.notifyDataSetChanged();
                listview.smoothScrollToPosition(adapter.getCount() - 1);
            }
        });
        for(User user : contactsDao.index()){
            adapter.add(user);
            adapter.notifyDataSetChanged();
        }
        //room ends here.
    }
}