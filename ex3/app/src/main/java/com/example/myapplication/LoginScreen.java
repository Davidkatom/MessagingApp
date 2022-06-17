package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;


import androidx.appcompat.app.AppCompatActivity;

public class LoginScreen extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_screen);

        Button btnSignUp = findViewById(R.id.btnSignUp);
        btnSignUp.setOnClickListener(v->{
            Intent i = new Intent(this,RegisterScreen.class);
            startActivity(i);

        });

        Button btnSignIn = findViewById(R.id.btnSignIn);
        btnSignIn.setOnClickListener(v->{
            Intent i = new Intent(this, ChatActivity.class);
            startActivity(i);
        });

        Button btnContactScreen = findViewById(R.id.contactScreen);
        btnContactScreen.setOnClickListener(v->{
            Intent i = new Intent(this, ContactScreen.class);
            startActivity(i);
        });
    }
}