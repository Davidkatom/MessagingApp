package com.example.myapplication;

import android.content.Context;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import java.util.ArrayList;

public class ContactListAdapter extends ArrayAdapter<Contact> {
    LayoutInflater inflater;

    public ContactListAdapter(Context context, ArrayList<Contact> contacts) {
        super(context, R.layout.contact, contacts);
        this.inflater = LayoutInflater.from(context);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Nullable
    @Override
    public View getView(int position, @Nullable View convertView,@Nullable ViewGroup parent){
        Contact contact = getItem(position);
        if(convertView == null)
            convertView = inflater.inflate(R.layout.contact, parent, false);

        //ImageView imageView = convertView.findViewById(R.id.profile_image);
        TextView contactN = convertView.findViewById(R.id.ContactName);
        TextView lastMsg = convertView.findViewById(R.id.lastMessage_contact);
        TextView time = convertView.findViewById(R.id.LastMessage_time);

        //imageView.setImageResource(user.getPictureId());
        contactN.setText(contact.getName());
        String lastMsgText = ChosenValues.getInstance().getLastMsg(contact.getId());
        int allowedLength = 30;
        if (lastMsgText.length() > allowedLength) {
            lastMsgText = lastMsgText.substring(0, allowedLength) + "...";
        }
        lastMsg.setText(lastMsgText);
        time.setText(ChosenValues.getInstance().getLastTime(contact.getId()));
        return convertView;
    }
}

