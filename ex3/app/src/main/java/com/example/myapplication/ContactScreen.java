package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;

import android.widget.ListView;

import java.util.ArrayList;

public class ContactScreen extends AppCompatActivity implements AdapterView.OnItemClickListener {
    private ArrayList<Contact> contacts = new ArrayList<>();
    private ContactListAdapter adapter;
    private ListView listview;

    private AppContactsDB db;
    private ContactsDao contactsDao;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact_screen);
        final EditText etInputText = findViewById(R.id.et_InputText);

        adapter = new ContactListAdapter(this, contacts);
        listview = findViewById(R.id.contactList);
        listview.setAdapter(adapter);
        listview.setOnItemClickListener(this);

        //room from here:
        db = Room.databaseBuilder(getApplicationContext(), AppContactsDB.class, ChosenValues.getInstance().getUser().getUsername()).allowMainThreadQueries().fallbackToDestructiveMigration().build();
        contactsDao = db.contactsDao();
        Button btnAddContact = findViewById(R.id.btnAddContact);

        btnAddContact.setOnClickListener(v->{
            String inputText = etInputText.getText().toString();
            if (!inputText.equals("")) {
                etInputText.setText("");
                Contact contact = new Contact(inputText, 1, "", "");
                contactsDao.insert(contact);
                adapter.add(contact);
                adapter.notifyDataSetChanged();
                listview.smoothScrollToPosition(adapter.getCount() - 1);
            }
        });
        for(Contact contact : contactsDao.index()){
            adapter.add(contact);
            adapter.notifyDataSetChanged();
        }
        //room ends here.
    }
    @Override
    public void onResume() {
        super.onResume();
        adapter.clear();
        for(Contact contact : contactsDao.index()){
            adapter.add(contact);
            adapter.notifyDataSetChanged();
        }
    }


    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        Contact contact = contacts.get(i);
        ChosenValues.getInstance().setSelectedContact(contact);
        Intent intent = new Intent(this, ChatActivity.class);
        startActivity(intent);
    }
}