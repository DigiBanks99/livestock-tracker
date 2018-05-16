using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace LivestockTracker.Migrations
{
    public partial class Death : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfDeath",
                table: "Animal",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Deceased",
                table: "Animal",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "SellDate",
                table: "Animal",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateOfDeath",
                table: "Animal");

            migrationBuilder.DropColumn(
                name: "Deceased",
                table: "Animal");

            migrationBuilder.DropColumn(
                name: "SellDate",
                table: "Animal");
        }
    }
}
