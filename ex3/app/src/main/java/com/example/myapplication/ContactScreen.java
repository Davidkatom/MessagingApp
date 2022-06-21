package com.example.myapplication;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ListView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import com.example.myapplication.api.AndroidServiceAPI;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.firebase.iid.FirebaseInstanceId;

import java.util.ArrayList;

public class ContactScreen extends AppCompatActivity implements AdapterView.OnItemClickListener, Listener {
    private ArrayList<Contact> contacts = new ArrayList<>();
    private ContactListAdapter adapter;
    private ListView listview;

    private AppContactsDB db;
    private ContactsDao contactsDao;
    private Button btnAddContact;


    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact_screen);

        ChosenValues.getInstance().setWaiting(this);
        //room from here:
        db = Room.databaseBuilder(getApplicationContext(), AppContactsDB.class, ChosenValues.getInstance().getUser().getUsername()).allowMainThreadQueries().fallbackToDestructiveMigration().build();
        contactsDao = db.contactsDao();

        LinearLayout mRootView = (LinearLayout) findViewById(R.id.ContactsRoot);
        AndroidServiceAPI serviceAPI = new AndroidServiceAPI(mRootView);
        serviceAPI.updateContacts(contactsDao);

        adapter = new ContactListAdapter(this, contacts);
        listview = findViewById(R.id.contactList);
        listview.setAdapter(adapter);
        listview.setOnItemClickListener(this);



        FloatingActionButton btnPopup = findViewById(R.id.fab_addContact);
        btnPopup.setOnClickListener(v->{
            ShowDialogContact();
        });


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

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void ShowDialogContact(){
        MaterialAlertDialogBuilder builder = new MaterialAlertDialogBuilder(this);
        LayoutInflater inflater = getLayoutInflater();
        View view = inflater.inflate(R.layout.add_contact_popup, null);
        builder.setView(view);
        builder.setPositiveButton("Add", (dialog, which) -> {
            EditText etName = view.findViewById(R.id.etContactName);
            EditText etNickName = view.findViewById(R.id.etNickName);
            EditText etServer = view.findViewById(R.id.etServer);

            String username = etName.getText().toString();
            String nickname = etNickName.getText().toString();
            String server = etServer.getText().toString();

            if(!(username.isEmpty() || nickname.isEmpty() || server.isEmpty())){
                Contact contact = new Contact(username, nickname, "", "", server);
                LinearLayout mRootView = (LinearLayout) findViewById(R.id.ContactsRoot);
                AndroidServiceAPI serviceAPI = new AndroidServiceAPI(mRootView);
                serviceAPI.PostContact(contact, contactsDao);
                ChosenValues.getInstance().setWaiting(this);
            }
        });
        builder.setNegativeButton("Cancel", (dialog, which) -> {
        });

        builder.show();

    }

    @Override
    public void finished() {
        adapter.clear();
        for(Contact contact : contactsDao.index()){
            adapter.add(contact);
            adapter.notifyDataSetChanged();
        }
    }
}
