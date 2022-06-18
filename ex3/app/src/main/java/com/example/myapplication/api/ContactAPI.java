package com.example.myapplication.api;

import androidx.lifecycle.MutableLiveData;

import com.example.myapplication.Contact;
import com.example.myapplication.ContactsDao;
import com.example.myapplication.R;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ContactAPI {
    private MutableLiveData<List<Contact>> contacts;
    private ContactsDao contactsDao;
    Retrofit retrofit;
    WebServiceAPI webServiceAPI;

    public ContactAPI(MutableLiveData<List<Contact>> contactsListData, ContactsDao contactsDao) {
        this.contacts = contactsListData;//
        this.contactsDao = contactsDao;//

        retrofit = new Retrofit.Builder()
                .baseUrl(String.valueOf(R.string.BASE_URL+"/api/"))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }

    public void get(){
        Call<List<Contact>> call = webServiceAPI.getContacts();
        call.enqueue(new Callback<List<Contact>>() {
            @Override
            public void onResponse(Call<List<Contact>> call, Response<List<Contact>> response) {
                List<Contact> contacts = response.body();
            }

            @Override
            public void onFailure(Call<List<Contact>> call, Throwable t) {

            }
        });

    }

}
