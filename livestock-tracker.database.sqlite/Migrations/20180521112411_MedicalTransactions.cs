using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace LivestockTracker.Migrations
{
    public partial class MedicalTransactions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Medecine",
                columns: table => new
                {
                    TypeCode = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(nullable: true)
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
                    Description = table.Column<string>(nullable: true)
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
                    MedecineTypeTypeCode = table.Column<int>(nullable: true),
                    TransactionDate = table.Column<DateTime>(nullable: false),
                    Unit = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalTransactions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MedicalTransaction_Animal",
                        column: x => x.AnimalID,
                        principalTable: "Animal",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MedicalTransactions_Medecine_MedecineTypeTypeCode",
                        column: x => x.MedecineTypeTypeCode,
                        principalTable: "Medecine",
                        principalColumn: "TypeCode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MedicalTransactions_Unit_Unit",
                        column: x => x.Unit,
                        principalTable: "Unit",
                        principalColumn: "TypeCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MedicalTransactions_AnimalID",
                table: "MedicalTransactions",
                column: "AnimalID");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalTransactions_MedecineTypeTypeCode",
                table: "MedicalTransactions",
                column: "MedecineTypeTypeCode");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalTransactions_Unit",
                table: "MedicalTransactions",
                column: "Unit");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MedicalTransactions");

            migrationBuilder.DropTable(
                name: "Medecine");

            migrationBuilder.DropTable(
                name: "Unit");
        }
    }
}
