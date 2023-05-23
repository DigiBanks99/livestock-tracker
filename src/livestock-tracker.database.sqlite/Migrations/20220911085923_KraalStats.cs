using Microsoft.EntityFrameworkCore.Migrations;

namespace LivestockTracker.Database.Migrations
{
    public partial class KraalStats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            const string createKraalStatsViewSql = @"create view KraalStats as
select
    (
        select count(*)
        from Animals
        where Archived = 0
        and Sold = 0
        and Deceased = 0
    ) as AnimalCount
    ,(
        select avg(Weight)
        from
        (
            select max(Weight) as Weight
            from WeightTransactions
            group by AnimalId
        )
    ) as AverageWeight
    ,(
        select avg(PurchasePrice)
        from Animals
    ) as AverageAnimalCost
    ,(
        select ifnull(avg(SellPrice), 0)
        from Animals
    ) as AverageSellPrice
    ,(
        select count(DateOfDeath) / count(*)
        from Animals
    ) as DeathRate";
            migrationBuilder.Sql(createKraalStatsViewSql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("drop view KraalStats");
        }
    }
}
