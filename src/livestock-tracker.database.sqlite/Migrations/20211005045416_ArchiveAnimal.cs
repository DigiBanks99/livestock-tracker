using Microsoft.EntityFrameworkCore.Migrations;

namespace LivestockTracker.Database.Migrations
{
    public partial class ArchiveAnimal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Archived",
                schema: "animal",
                table: "Animals",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Archived",
                schema: "animal",
                table: "Animals");
        }
    }
}
