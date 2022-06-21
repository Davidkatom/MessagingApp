package com.example.myapplication;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.room.Room;

import com.example.myapplication.api.AndroidServiceAPI;
import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

public class LoginScreen extends AppCompatActivity implements Listener {
    private static final String CHANNEL_ID = "1";

    private AppUsersDB db;
    private UserDao userDao;
    public static Context context;
    EditText etUserName;
    EditText etPass;
    private SharedPreferences prefs;
    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        context = getApplicationContext();
        setContentView(R.layout.activity_login_screen);

        db = Room.databaseBuilder(context, AppUsersDB.class, "UsersDB").allowMainThreadQueries().fallbackToDestructiveMigration().build();
        userDao = db.userDao();

        etUserName = findViewById(R.id.etUserName);
        etPass = findViewById(R.id.etPassword);

        //get shared preferences to check if user is already logged in
        prefs = this.getSharedPreferences(
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
            androidServiceAPI.LoginToServer(etUserName.getText().toString(), etPass.getText().toString(), prefs);
            ChosenValues.getInstance().setWaiting(this);
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

        Button btnSettings = findViewById(R.id.btnSettings);
        btnSettings.setOnClickListener(v->{
            ShowDialogSettings();
        });

    }

    private void ShowDialogSettings() {
        LayoutInflater inflater = getLayoutInflater();
        View view = inflater.inflate(R.layout.settings_popup, null);
        final EditText save = view.findViewById(R.id.etServer);
        save.setText(prefs.getString("server", ""));

        MaterialAlertDialogBuilder builder = new MaterialAlertDialogBuilder(this);
        builder.setView(view);
        builder.setPositiveButton("Save", (dialog, which) -> {
            //save settings
            SharedPreferences.Editor editor = prefs.edit();
            editor.putString("server", save.getText().toString());
            editor.apply();
        });
        builder.setNegativeButton("Cancel", (dialog, which) -> {
            //do nothing
        });
        builder.show();
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

    @Override
    public void finished() {
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