using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace LivestockTracker.Database.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Animal",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ArrivalWeight = table.Column<decimal>(nullable: false),
                    BatchNumber = table.Column<int>(nullable: false),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    DateOfDeath = table.Column<DateTime>(nullable: true),
                    Deceased = table.Column<bool>(nullable: false),
                    Number = table.Column<int>(nullable: false),
                    PurchaseDate = table.Column<DateTime>(nullable: false),
                    PurchasePrice = table.Column<decimal>(nullable: false),
                    SellDate = table.Column<DateTime>(nullable: true),
                    SellPrice = table.Column<decimal>(nullable: true),
                    Sold = table.Column<bool>(nullable: false),
                    Subspecies = table.Column<string>(maxLength: 50, nullable: true),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Animal", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Medecine",
                columns: table => new
                {
                    TypeCode = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(nullable: true),
                    ID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medecine", x => x.TypeCode);
                });

            migrationBuilder.CreateTable(
                name: "Unit",
                columns: table => new
                {
                    TypeCode = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(nullable: true),
                    ID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Unit", x => x.TypeCode);
                });

            migrationBuilder.CreateTable(
                name: "MedicalTransactions",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AnimalID = table.Column<int>(nullable: false),
                    Dose = table.Column<decimal>(nullable: false),
                    MedecineTypeCode = table.Column<int>(nullable: false),
                    TransactionDate = table.Column<DateTime>(nullable: false),
                    Unit = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalTransactions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MedicalTransactions_Animal_AnimalID",
                        column: x => x.AnimalID,
                        principalTable: "Animal",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MedicalTransactions_AnimalID",
                table: "MedicalTransactions",
                column: "AnimalID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Medecine");

            migrationBuilder.DropTable(
                name: "MedicalTransactions");

            migrationBuilder.DropTable(
                name: "Unit");

            migrationBuilder.DropTable(
                name: "Animal");
        }
    }
}
