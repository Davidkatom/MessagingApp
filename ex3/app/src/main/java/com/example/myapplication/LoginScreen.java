package com.example.myapplication;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;


import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

public class LoginScreen extends AppCompatActivity {
    private AppUsersDB db;
    private UserDao userDao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_screen);

        db = Room.databaseBuilder(getApplicationContext(), AppUsersDB.class, "UsersDB").allowMainThreadQueries().build();
        userDao = db.userDao();

        final EditText etUserName = findViewById(R.id.etUserName);
        final EditText etPass = findViewById(R.id.etPassword);

        SharedPreferences prefs = this.getSharedPreferences(
                "com.example.myapplication", Context.MODE_PRIVATE);
        if(prefs.getString("username", "").length() > 0){
            System.out.println("Logged in as " + prefs.getString("username", ""));
            ChosenValues.getInstance().setUser(userDao.getUser(prefs.getString("username", "")));
            Intent i = new Intent(this, ContactScreen.class);
            startActivity(i);
        }



        Button btnSignUp = findViewById(R.id.btnSignUp);
        btnSignUp.setOnClickListener(v->{
            Intent i = new Intent(this,RegisterScreen.class);
            startActivity(i);

        });

        Button btnSignIn = findViewById(R.id.btnSignIn);
        btnSignIn.setOnClickListener(v->{
            //check if user exists
            User user = userDao.getUser(etUserName.getText().toString());
            if(user == null){
                //TODO error
                System.out.println("User does not exist");
                return;
            }
            //check if password is correct
            if(!user.getPassword().equals(etPass.getText().toString())){
                //TODO error
                System.out.println("Password is incorrect");
                return;
            }
            //connect user
            prefs.edit().putString("username", user.getUsername()).apply();
            ChosenValues.getInstance().setUser(user);

            Intent i = new Intent(this, ContactScreen.class);
            startActivity(i);
        });

        Button btnContactScreen = findViewById(R.id.contactScreen);
        btnContactScreen.setOnClickListener(v->{
            Intent i = new Intent(this, ContactScreen.class);
            startActivity(i);
        });
    }
}