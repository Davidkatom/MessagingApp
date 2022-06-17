package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;

public class RegisterScreen extends AppCompatActivity {
    private ContactListAdapter adapter;
    private ListView listview;
    private AppContactsDB db;
    private User contactsDao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register_screen);

        final EditText etUserName = findViewById(R.id.etUserName);
        final EditText etPass1 = findViewById(R.id.etSignUpPass);
        final EditText etPass2 = findViewById(R.id.etSignUpPassConfirm);
        final EditText etNickName = findViewById(R.id.etNickName);

        adapter = new ContactListAdapter(this, contacts);
        listview = findViewById(R.id.contactList);
        listview.setAdapter(adapter);

        //room from here:
        db = Room.databaseBuilder(getApplicationContext(), AppContactsDB.class, "ContactsDB").allowMainThreadQueries().build();
        contactsDao = db.contactsDao();
        Button btnAddContact = findViewById(R.id.btnAddContact);

        Button btnRegister = findViewById(R.id.btnAddContact);
        btnRegister.setOnClickListener(v->{
            //TODO Check if user already exists
            //Check if passwords match
            if(!etPass1.getText().toString().equals(etPass2.getText().toString())){
                //TODO error
            }


            //register user

            //connect user


            Intent i = new Intent(this, ChatActivity.class);
            startActivity(i);
        });
    }
}