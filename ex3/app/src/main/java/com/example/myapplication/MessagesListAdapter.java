package com.example.myapplication;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.Nullable;

import java.util.ArrayList;

public class MessagesListAdapter extends ArrayAdapter<Message> {

    LayoutInflater inflater;

    public MessagesListAdapter(Context context, ArrayList<Message> messages) {
        super(context, R.layout.message_item, messages);
        this.inflater = LayoutInflater.from(context);
    }
    @Nullable
    @Override
    public View getView(int position, @Nullable View convertView, @Nullable ViewGroup parent){
        Message msg = getItem(position);
        if(convertView == null)
            convertView = inflater.inflate(R.layout.message_item, parent, false);

        TextView msg_text = convertView.findViewById(R.id.Message_text);
        TextView msg_time = convertView.findViewById(R.id.Message_time);

        msg_text.setText(msg.getText());
        msg_time.setText(msg.getTimeForChat());

        return convertView;
    }

}
