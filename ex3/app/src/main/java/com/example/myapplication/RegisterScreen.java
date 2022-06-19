package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;

import com.example.myapplication.api.UserAPI;
import com.google.android.material.snackbar.Snackbar;

public class RegisterScreen extends AppCompatActivity {
    private AppUsersDB db;
    private UserDao userDao;
    private UserAPI userAPI;
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
            //Check if user already exists
            LinearLayout mRootView = (LinearLayout) findViewById(R.id.linearLayout_Register);
            User exists = userDao.getUser(etUserName.getText().toString());
            if(exists != null){
                Snackbar.make(mRootView, "Username already exists", Snackbar.LENGTH_SHORT).show();
                return;
            }
            //Check if passwords match
            if(!etPass1.getText().toString().equals(etPass2.getText().toString())){
                Snackbar.make(mRootView, "Passwords do not match", Snackbar.LENGTH_SHORT).show();
                return;
            }

            //Check if all fields are filled
            if(etUserName.getText().toString().length() == 0 || etNickName.getText().toString().length() == 0){
                Snackbar.make(mRootView, "Please fill in all fields", Snackbar.LENGTH_SHORT).show();
                return;
            }
            //register user
            User user = new User(etUserName.getText().toString(), etPass1.getText().toString(), imageId, etNickName.getText().toString());
            //userDao.insert(user);
            new UserAPI(userDao).PostUser(user);
            //connect user
            SharedPreferences prefs = this.getSharedPreferences(
                    "com.example.myapplication", Context.MODE_PRIVATE);
            prefs.edit().putString("username", user.getUsername()).apply();
            ChosenValues.getInstance().setUser(user);

            Intent i = new Intent(this, ContactScreen.class);
            startActivity(i);
        });
    }
}