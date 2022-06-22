package com.example.myapplication;

import android.app.NotificationChannel;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.room.Room;

import com.example.myapplication.api.AndroidServiceAPI;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Date;
import java.util.Objects;

public class FireBaseService extends FirebaseMessagingService {
    public FireBaseService() {
    }

    @Override
    public void onNewToken(@NonNull String s) {
        super.onNewToken(s);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        if (remoteMessage.getNotification() != null) {
            createNotificationChannel();
            String from = remoteMessage.getNotification().getTitle();
            String content = remoteMessage.getNotification().getBody();
            String notificationBody = content;
            int allowedLength = 20;
            assert content != null;
            if (content.length() > allowedLength) {
                notificationBody = content.substring(0, allowedLength) + "...";
            }

            NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "1")
                    .setSmallIcon(R.drawable.ic_launcher_background)
                    .setContentTitle(from)
                    .setContentText(notificationBody)
                    .setPriority(NotificationCompat.PRIORITY_DEFAULT);

            NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);
            notificationManager.notify(1, builder.build());//TODO ADD OPTION FOR MANY NOTIFICATIONS

            //add the new notification to the database
            int newID;
            try {
                newID = Integer.parseInt(Objects.requireNonNull(remoteMessage.getData().get("id")));
            }catch (Exception e){
                newID= (int)(new Date()).getTime();
                return;
            }
            String fromServer = remoteMessage.getData().get("fromServer");
            Message newMsg = new Message(newID, content, false, remoteMessage.getData().get("created"));


            //TODO MAKE THIS CLEANER:
            String connectedUser = ChosenValues.getInstance().getUser().getUsername();
//            String selectedContact = from;
//            String server = ChosenValues.getInstance().getSelectedContact().getServer().replaceAll("/", "");
            AppMessagesDB db = Room.databaseBuilder(getApplicationContext(), AppMessagesDB.class, connectedUser + from + fromServer.replaceAll("/", "")).fallbackToDestructiveMigration().allowMainThreadQueries().build();
            MessageDao messageDao = db.messageDao();
            messageDao.insert(newMsg);// adds new messages to local database

            AndroidServiceAPI serviceAPI = new AndroidServiceAPI(null);
            serviceAPI.addMessageToListAdapter(newMsg,ChosenValues.getInstance().getMsgAdapter());



        }
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "FCM";
            String description = "Firebase Cloud Messaging";
            int importance = android.app.NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel("FCM", name, importance);
            channel.setDescription(description);
            android.app.NotificationManager notificationManager = getSystemService(android.app.NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }
}
