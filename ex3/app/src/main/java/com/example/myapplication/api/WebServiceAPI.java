package com.example.myapplication.api;


import com.example.myapplication.Contact;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface WebServiceAPI {
    @GET("Contacts")
    Call<List<Contact>> getContacts();
    //get messages from here:
    @POST("Contacts")
    Call<Void> createContact(@Body Contact contact);

    @POST("Login?username={username}&password={password}")
    Call<LoginResObject> login(@Path("username") String username, @Path("password") String password);


}
