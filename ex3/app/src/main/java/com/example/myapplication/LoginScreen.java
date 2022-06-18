package com.example.myapplication;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

public class LoginScreen extends AppCompatActivity {
    private static final String CHANNEL_ID = "1";

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

        //notification manager
        createNotificationChannel();
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);

        Button btnPushNotification = findViewById(R.id.tempPushNotification);
        btnPushNotification.setOnClickListener(v->{
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


        });
    }

    private void createNotificationChannel(){
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
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