﻿// <auto-generated />
using System;
using HearingBooks.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HearingBooks.Persistance.Migrations
{
    [DbContext(typeof(HearingBooksDbContext))]
    [Migration("20220410163242_Add EmailIsUsername to Users table")]
    partial class AddEmailIsUsernametoUserstable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("HearingBooks.Domain.Entities.Language", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Symbol")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Languages");
                });

            modelBuilder.Entity("HearingBooks.Domain.Entities.TextSynthesis", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("RequestingUserId")
                        .HasColumnType("uuid");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("TextSyntheses");
                });

            modelBuilder.Entity("HearingBooks.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("EmailIsUsername")
                        .HasColumnType("boolean");

                    b.Property<bool>("EmailNotificationsEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("HearingBooks.Domain.Entities.Voice", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsMultilingual")
                        .HasColumnType("boolean");

                    b.Property<Guid?>("LanguageId")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("LanguageId");

                    b.ToTable("Voices");
                });

            modelBuilder.Entity("HearingBooks.Domain.Entities.TextSynthesis", b =>
                {
                    b.OwnsOne("HearingBooks.Domain.ValueObjects.TextSynthesis.TextSynthesisData", "TextSynthesisData", b1 =>
                        {
                            b1.Property<Guid>("TextSynthesisId")
                                .HasColumnType("uuid");

                            b1.HasKey("TextSynthesisId");

                            b1.ToTable("TextSyntheses");

                            b1.WithOwner()
                                .HasForeignKey("TextSynthesisId");
                        });

                    b.Navigation("TextSynthesisData")
                        .IsRequired();
                });

            modelBuilder.Entity("HearingBooks.Domain.Entities.Voice", b =>
                {
                    b.HasOne("HearingBooks.Domain.Entities.Language", null)
                        .WithMany("Voices")
                        .HasForeignKey("LanguageId");
                });

            modelBuilder.Entity("HearingBooks.Domain.Entities.Language", b =>
                {
                    b.Navigation("Voices");
                });
#pragma warning restore 612, 618
        }
    }
}
