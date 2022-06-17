package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

public class RegisterScreen extends AppCompatActivity {
    private AppUsersDB db;
    private UserDao userDao;
    private int imageId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register_screen);

        final EditText etUserName = findViewById(R.id.etUserName);
        final EditText etPass1 = findViewById(R.id.etSignUpPass);
        final EditText etPass2 = findViewById(R.id.etSignUpPassConfirm);
        final EditText etNickName = findViewById(R.id.etNickName);


        //room from here:
        db = Room.databaseBuilder(getApplicationContext(), AppUsersDB.class, "UsersDB").fallbackToDestructiveMigration().allowMainThreadQueries().build();
        userDao = db.userDao();
        Button btnRegister = findViewById(R.id.btnSignUp);

        btnRegister.setOnClickListener(v->{
            //Check if user already exists TODO check if works
            User exists = userDao.getUser(etUserName.getText().toString());
            if(exists != null){
                //TODO error
                System.out.println("Exists");
                return;
            }
            //Check if passwords match
            if(!etPass1.getText().toString().equals(etPass2.getText().toString())){
                //TODO error
                System.out.println("passwords dont match");
                return;
            }
            //register user
            User user = new User(etUserName.getText().toString(), etPass1.getText().toString(), imageId, etNickName.getText().toString());
            userDao.insert(user);
            //connect user

            ChosenValues.getInstance().setUser(user);

            Intent i = new Intent(this, ContactScreen.class);
            startActivity(i);
        });
    }
}