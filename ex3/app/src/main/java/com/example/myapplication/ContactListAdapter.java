package com.example.myapplication;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;

public class ContactListAdapter extends ArrayAdapter<User> {
    LayoutInflater inflater;

    public ContactListAdapter(Context context, ArrayList<User> users) {
        super(context, R.layout.contact, users);
        this.inflater = LayoutInflater.from(context);
    }

    @Nullable
    @Override
    public View getView(int position, @Nullable View convertView,@Nullable ViewGroup parent){
        User user = getItem(position);
        if(convertView == null)
            convertView = inflater.inflate(R.layout.contact, parent, false);

        ImageView imageView = convertView.findViewById(R.id.profile_image);
        TextView contact = convertView.findViewById(R.id.ContactName);
        TextView lastMsg = convertView.findViewById(R.id.lastMessage_contact);
        TextView time = convertView.findViewById(R.id.LastMessage_time);

        imageView.setImageResource(user.getPictureId());
        contact.setText(user.getUserName());
        lastMsg.setText(user.getLastMessage());
        time.setText(user.getLastMessageSendingTime());
        return convertView;
    }
}
