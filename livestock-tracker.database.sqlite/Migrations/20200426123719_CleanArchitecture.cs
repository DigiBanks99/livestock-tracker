using Microsoft.EntityFrameworkCore.Migrations;

namespace LivestockTracker.Database.Migrations
{
    public partial class CleanArchitecture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "animal");

            migrationBuilder.EnsureSchema(
                name: "feed");

            migrationBuilder.EnsureSchema(
                name: "medical");

            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.RenameTable(
                name: "Animal",
                newName: "Animals",
                newSchema: "animal");

            migrationBuilder.RenameTable(
                name: "MedicalTransactions",
                newName: "MedicalTransactions",
                newSchema: "medical");

            migrationBuilder.RenameTable(
                name: "FeedTypes",
                newName: "FeedTypes",
                newSchema: "feed");

            migrationBuilder.RenameTable(
                name: "FeedingTransactions",
                newName: "FeedingTransactions",
                newSchema: "feed");

            migrationBuilder.RenameTable(
                name: "Unit",
                newName: "Units",
                newSchema: "dbo");

            migrationBuilder.RenameTable(
                name: "Medicine",
                newName: "MedicineTypes",
                newSchema: "medical");

            migrationBuilder.RenameColumn(
                name: "Unit",
                schema: "medical",
                table: "MedicalTransactions",
                newName: "UnitID");

            migrationBuilder.RenameColumn(
                name: "MedicineTypeCode",
                schema: "medical",
                table: "MedicalTransactions",
                newName: "MedicineID");

            migrationBuilder.RenameColumn(
                name: "UnitTypeCode",
                schema: "feed",
                table: "FeedingTransactions",
                newName: "UnitID");

            migrationBuilder.RenameColumn(
                name: "FeedID",
                schema: "feed",
                table: "FeedingTransactions",
                newName: "FeedTypeID");

            migrationBuilder.RenameColumn(
                name: "TypeCode",
                schema: "dbo",
                table: "Units",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "TypeCode",
                schema: "medical",
                table: "MedicineTypes",
                newName: "ID");

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                schema: "feed",
                table: "FeedTypes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                schema: "feed",
                table: "Units",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                schema: "dbo",
                table: "Units",
                nullable: false,
                defaultValue: "New");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalTransactions_MedicineID",
                schema: "medical",
                table: "MedicalTransactions",
                column: "MedicineID");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalTransactions_UnitID",
                schema: "medical",
                table: "MedicalTransactions",
                column: "UnitID");

            migrationBuilder.CreateIndex(
                name: "IX_FeedingTransactions_AnimalID",
                schema: "feed",
                table: "FeedingTransactions",
                column: "AnimalID");

            migrationBuilder.CreateIndex(
                name: "IX_FeedingTransactions_FeedTypeID",
                schema: "feed",
                table: "FeedingTransactions",
                column: "FeedTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_FeedingTransactions_UnitID",
                schema: "feed",
                table: "FeedingTransactions",
                column: "UnitID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "Animals",
                schema: "animal",
                newName: "Animal",
                newSchema: null);

            migrationBuilder.RenameTable(
                name: "Units",
                schema: "dbo",
                newName: "Unit",
                newSchema: null);

            migrationBuilder.RenameTable(
                name: "MedicineTypes",
                schema: "medical",
                newName: "Medicine",
                newSchema: null);

            migrationBuilder.DropIndex(
                name: "IX_MedicalTransactions_MedicineID",
                schema: "medical",
                table: "MedicalTransactions");

            migrationBuilder.DropIndex(
                name: "IX_MedicalTransactions_UnitID",
                schema: "medical",
                table: "MedicalTransactions");

            migrationBuilder.DropIndex(
                name: "IX_FeedingTransactions_AnimalID",
                schema: "feed",
                table: "FeedingTransactions");

            migrationBuilder.DropIndex(
                name: "IX_FeedingTransactions_FeedTypeID",
                schema: "feed",
                table: "FeedingTransactions");

            migrationBuilder.DropIndex(
                name: "IX_FeedingTransactions_UnitID",
                schema: "feed",
                table: "FeedingTransactions");

            migrationBuilder.DropColumn(
                name: "Deleted",
                schema: "feed",
                table: "FeedTypes");

            migrationBuilder.DropColumn(
                name: "Deleted",
                schema: "feed",
                table: "Units");

            migrationBuilder.RenameTable(
                name: "MedicalTransactions",
                schema: "medical",
                newName: "MedicalTransactions");

            migrationBuilder.RenameTable(
                name: "FeedTypes",
                schema: "feed",
                newName: "FeedTypes");

            migrationBuilder.RenameTable(
                name: "FeedingTransactions",
                schema: "feed",
                newName: "FeedingTransactions");

            migrationBuilder.RenameColumn(
                name: "UnitID",
                table: "MedicalTransactions",
                newName: "Unit");

            migrationBuilder.RenameColumn(
                name: "MedicineID",
                table: "MedicalTransactions",
                newName: "MedicineTypeCode");

            migrationBuilder.RenameColumn(
                name: "UnitID",
                table: "FeedingTransactions",
                newName: "UnitTypeCode");

            migrationBuilder.RenameColumn(
                name: "FeedTypeID",
                table: "FeedingTransactions",
                newName: "FeedID");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Units",
                newName: "TypeCode");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "MedicineTypes",
                newName: "TypeCode");
        }
    }
}
