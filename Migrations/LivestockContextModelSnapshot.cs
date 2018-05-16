﻿// <auto-generated />
using LivestockTracker.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace LivestockTracker.Migrations
{
    [DbContext(typeof(LivestockContext))]
    partial class LivestockContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026");

            modelBuilder.Entity("LivestockTracker.Models.Animal", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("ArrivalWeight");

                    b.Property<int>("BatchNumber");

                    b.Property<DateTime>("BirthDate");

                    b.Property<DateTime?>("DateOfDeath");

                    b.Property<bool>("Deceased");

                    b.Property<int>("Number");

                    b.Property<DateTime>("PurchaseDate");

                    b.Property<decimal>("PurchasePrice");

                    b.Property<DateTime?>("SellDate");

                    b.Property<decimal?>("SellPrice");

                    b.Property<bool>("Sold");

                    b.Property<string>("Subspecies")
                        .HasMaxLength(50);

                    b.Property<int>("Type");

                    b.HasKey("ID");

                    b.ToTable("Animal");
                });
#pragma warning restore 612, 618
        }
    }
}
