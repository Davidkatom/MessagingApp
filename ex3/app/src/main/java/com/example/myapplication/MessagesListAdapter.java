package com.example.myapplication;

import android.content.Context;
import android.os.Build;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.content.ContextCompat;

import java.util.ArrayList;

public class MessagesListAdapter extends ArrayAdapter<Message> {

    LayoutInflater inflater;

    public MessagesListAdapter(Context context, ArrayList<Message> messages) {
        super(context, R.layout.message_item, messages);
        this.inflater = LayoutInflater.from(context);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Nullable
    @Override
    public View getView(int position, @Nullable View convertView, @Nullable ViewGroup parent) {
        Message msg = getItem(position);
        if (convertView == null)
            convertView = inflater.inflate(R.layout.message_item, parent, false);

        TextView msg_text = convertView.findViewById(R.id.Message_text);
        TextView msg_time = convertView.findViewById(R.id.Message_time);
        if (!msg.getSent()) {//to change direction of message
            LinearLayout msg_layout = convertView.findViewById(R.id.LL_messageItem);
            msg_layout.setGravity(Gravity.START);
            msg_text.setBackground(ContextCompat.getDrawable(getContext(), R.drawable.message_box_receive));
        }
        else{
            LinearLayout msg_layout = convertView.findViewById(R.id.LL_messageItem);
            msg_layout.setGravity(Gravity.END);
            msg_text.setBackground(ContextCompat.getDrawable(getContext(), R.drawable.message_box_sent));
        }
        msg_text.setText(msg.getContent());
        msg_time.setText(msg.getTimeForChat());

        return convertView;
    }

}

