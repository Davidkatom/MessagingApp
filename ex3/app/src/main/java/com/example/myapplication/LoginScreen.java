package com.example.myapplication;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.room.Room;

import com.example.myapplication.api.AndroidServiceAPI;
import com.google.android.material.snackbar.Snackbar;

public class LoginScreen extends AppCompatActivity {
    private static final String CHANNEL_ID = "1";

    private AppUsersDB db;
    private UserDao userDao;
    public static Context context;

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        context = getApplicationContext();
        setContentView(R.layout.activity_login_screen);

        db = Room.databaseBuilder(context, AppUsersDB.class, "UsersDB").allowMainThreadQueries().fallbackToDestructiveMigration().build();
        userDao = db.userDao();

        final EditText etUserName = findViewById(R.id.etUserName);
        final EditText etPass = findViewById(R.id.etPassword);

        //get shared preferences to check if user is already logged in
        SharedPreferences prefs = this.getSharedPreferences(
                "com.example.myapplication", Context.MODE_PRIVATE);
        //Auto login if user is already logged in
        /*
        if(prefs.getString("username", "").length() > 0){
            System.out.println("Logged in as " + prefs.getString("username", ""));
            ChosenValues.getInstance().setUser(userDao.getUser(prefs.getString("username", "")));
            Intent i = new Intent(this, ContactScreen.class);
            startActivity(i);
        }         */

        
        Button btnSignUp = findViewById(R.id.btnSignUp);
        btnSignUp.setOnClickListener(v -> {
            Intent i = new Intent(this, RegisterScreen.class);
            startActivity(i);
        });

        Button btnSignIn = findViewById(R.id.btnSignIn); //SIGN IN BUTTON
        btnSignIn.setOnClickListener(v -> {
            //for pop up messages
            LinearLayout mRootView = (LinearLayout) findViewById(R.id.linearLayout_Login);
            //Login Logic:
            AndroidServiceAPI androidServiceAPI = new AndroidServiceAPI(mRootView);
            androidServiceAPI.LoginToServer(etUserName.getText().toString(), etPass.getText().toString(), userDao, context, prefs);
        });
        //here we have lambda function that listens only to positive login response from the server.
        prefs.registerOnSharedPreferenceChangeListener((sharedPreferences, key) -> {
            if (key.equals("token")) {// if token is changed, user is logged in and start Intent
                if (sharedPreferences.getString("token", "").length() > 0) {
                    //connect user
                    User user = userDao.getUser(etUserName.getText().toString());
                    if(user == null){
                        //TODO HTTP GET request to get user info (Nickname)
                        user = new User(etUserName.getText().toString(), etPass.getText().toString(), 0, etUserName.getText().toString());
                        userDao.insert(user);
                    }
                    prefs.edit().putString("username", user.getUsername()).apply();
                    ChosenValues.getInstance().setUser(user);
                    //Start Intent
                    Intent i = new Intent(this, ContactScreen.class);
                    startActivity(i);
                }
            }
        });
/*

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

 */


        Button btnContactScreen = findViewById(R.id.contactScreen);
        btnContactScreen.setOnClickListener(v -> {
            Intent i = new Intent(this, ContactScreen.class);
            startActivity(i);
        });

        //notification manager
        createNotificationChannel();
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);

        Button btnPushNotification = findViewById(R.id.tempPushNotification);
        btnPushNotification.setOnClickListener(v -> {
            NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setSmallIcon(R.drawable.ic_launcher_foreground)
                    .setContentTitle("My notification")
                    .setContentText("Hello World!")
                    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                    .setAutoCancel(true);//makes the notification disappear when clicked
            int notificationId = 1; // id of notification (unique) - can be used to cancel or update notification
            notificationManager.notify(notificationId, builder.build());
            //16:40 how to use notification manager to go to new intent
            //22:00 updating notification


            // retrofit
            LinearLayout mRootView = (LinearLayout) findViewById(R.id.linearLayout_Login);
            Snackbar.make(mRootView, "Username already exists", Snackbar.LENGTH_SHORT).show();

        });
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = getString(R.string.Channel_main_name);
            String description = getString(R.string.Channel_main_description);
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);

            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
            //here we can add more channels if needed like 07:20
        }
    }
}