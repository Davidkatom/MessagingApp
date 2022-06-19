package com.example.myapplication.api;


import com.example.myapplication.Contact;
import com.google.gson.JsonElement;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.HeaderMap;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface WebServiceAPI {

    //get messages from here:

    @POST("Login")
    Call<JsonElement> login(@Query("username") String username, @Query("password") String password);

    @POST("Users")
    Call<JsonElement> CreateUser(
            @Body UserPostObject user,
            @HeaderMap  Map<String, String> headers
    );
//    Call<JsonElement> login(@Body LoginPostObject loginPostObject);
//    @POST("Login")
//    Call<JsonElement> login(@Query("username") String username, @Query("password") String password);

//    @Headers({"Authorization: application/json"})
    @GET("Contacts")
    Call<List<Contact>> getContacts(
//            Call<List<Contact>> getContacts(
            @HeaderMap  Map<String, String> jasonHeader
    );


//    @POST("Contacts")
//    Call<Void> createContact(@Body Contact contact);

}
