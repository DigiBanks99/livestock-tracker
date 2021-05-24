using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LivestockTracker.Database.Migrations
{
    public partial class WeightTransactions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "TransactionDate",
                schema: "medical",
                table: "MedicalTransactions",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<long>(
                name: "TransactionDate",
                schema: "feed",
                table: "FeedingTransactions",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<long>(
                name: "SellDate",
                schema: "animal",
                table: "Animals",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(DateTimeOffset),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "PurchaseDate",
                schema: "animal",
                table: "Animals",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<long>(
                name: "DateOfDeath",
                schema: "animal",
                table: "Animals",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(DateTimeOffset),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "BirthDate",
                schema: "animal",
                table: "Animals",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldType: "TEXT");

            migrationBuilder.CreateTable(
                name: "WeightTransactions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AnimalId = table.Column<long>(type: "INTEGER", nullable: false),
                    Weight = table.Column<decimal>(type: "TEXT", nullable: false),
                    TransactionDate = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeightTransactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeightTransactions_Animals_AnimalId",
                        column: x => x.AnimalId,
                        principalSchema: "animal",
                        principalTable: "Animals",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WeightTransactions_AnimalId",
                table: "WeightTransactions",
                column: "AnimalId");

            migrationBuilder.AlterColumnDataTypeDateTimeOffsetToLong(
                propertyNames: new string[] { "BirthDate", "SellDate", "PurchaseDate", "DateOfDeath" },
                tableName: "Animals");

            migrationBuilder.AlterColumnDataTypeDateTimeOffsetToLong(
                propertyNames: new string[] { "TransactionDate" },
                tableName: "MedicalTransactions");

            migrationBuilder.AlterColumnDataTypeDateTimeOffsetToLong(
                propertyNames: new string[] { "TransactionDate" },
                tableName: "FeedingTransactions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WeightTransactions");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "TransactionDate",
                schema: "medical",
                table: "MedicalTransactions",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "TransactionDate",
                schema: "feed",
                table: "FeedingTransactions",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "SellDate",
                schema: "animal",
                table: "Animals",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "PurchaseDate",
                schema: "animal",
                table: "Animals",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "DateOfDeath",
                schema: "animal",
                table: "Animals",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "BirthDate",
                schema: "animal",
                table: "Animals",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "INTEGER");

            migrationBuilder.AlterColumnDataTypeLongToDateTimeOffset(
                propertyNames: new string[] { "BirthDate", "SellDate", "PurchaseDate", "DateOfDeath" },
                tableName: "Animals");

            migrationBuilder.AlterColumnDataTypeLongToDateTimeOffset(
                propertyNames: new string[] { "TransactionDate" }, 
                tableName: "MedicalTransactions");

            migrationBuilder.AlterColumnDataTypeLongToDateTimeOffset(
                propertyNames: new string[] { "TransactionDate" },
                tableName: "FeedingTransactions");
        }
    }
}
