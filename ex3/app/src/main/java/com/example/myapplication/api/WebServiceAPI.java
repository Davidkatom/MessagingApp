package com.example.myapplication.api;


import com.example.myapplication.Contact;
import com.example.myapplication.Message;
import com.google.gson.JsonElement;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.HeaderMap;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface WebServiceAPI {

    @POST("Login")
    Call<JsonElement> login(@Query("username") String username, @Query("password") String password, @Query("androidToken") String androidToken);

    @POST("Users")
    Call<JsonElement> CreateUser(
            @Body UserPostObject user,
            @HeaderMap Map<String, String> headers
    );

    @POST("Contacts")
    Call<JsonElement> CreateContact(
            @Body Contact contact,
            @HeaderMap Map<String, String> headers
    );

    @POST("Contacts/{user_id}/messages")
    Call<JsonElement> CreateMessage(
            @Body Map<String, String> message,
            @HeaderMap Map<String, String> headers,
            @Path("user_id") String user_id

    );

    @POST("Transfer")
    Call<Void> TransferMessage(
            @Body Map<String, String> message,
            @HeaderMap Map<String, String> headers
    );

    @GET("Contacts")
    Call<List<Contact>> getContacts(
            @HeaderMap Map<String, String> jasonHeader
    );

    @POST("invitations")
    Call<Void> InviteContact(
            @Body Map<String, String> invitation,
            @HeaderMap Map<String, String> headers
    );

    @GET("Contacts/{user_id}/messages")
    Call<List<Message>> getMessages(
            @HeaderMap Map<String, String> jasonHeader,
            @Path("user_id") String user_id
    );


//    Call<JsonElement> login(@Body LoginPostObject loginPostObject);
//    @POST("Login")
//    Call<JsonElement> login(@Query("username") String username, @Query("password") String password);

//    @Headers({"Authorization: application/json"})
//    @POST("Contacts")
//    Call<Void> createContact(@Body Contact contact);

}
