﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WhatsdownAPI.Data;

#nullable disable

namespace WhatsdownAPI.Migrations
{
    [DbContext(typeof(WhatsdownAPIContext))]
    partial class WhatsdownAPIContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("WhatsdownAPI.Models.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RecieverId")
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("SenderId")
                        .HasColumnType("nvarchar(10)");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("RecieverId");

                    b.HasIndex("SenderId");

                    b.ToTable("Message");
                });

            modelBuilder.Entity("WhatsdownAPI.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("NickName")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfilePicture")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("WhatsdownAPI.Models.Message", b =>
                {
                    b.HasOne("WhatsdownAPI.Models.User", "Reciever")
                        .WithMany()
                        .HasForeignKey("RecieverId");

                    b.HasOne("WhatsdownAPI.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId");

                    b.Navigation("Reciever");

                    b.Navigation("Sender");
                });
#pragma warning restore 612, 618
        }
    }
}
