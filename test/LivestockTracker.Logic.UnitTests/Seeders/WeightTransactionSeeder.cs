using LivestockTracker.Database;
using LivestockTracker.Database.Models.Weight;
using System;

namespace LivestockTracker.Logic.Tests.Seeders
{
    internal static class WeightTransactionSeeder
    {
        internal static LivestockContext SeedWeightTransaction(this LivestockContext context,
                                                               long animalId,
                                                               DateTimeOffset? transactionDate = null,
                                                               decimal weight = 88)
        {
            context.WeightTransactions.Add(new WeightTransactionModel
            {
                AnimalId = animalId,
                TransactionDate = transactionDate ?? TestConstants.DefaultDate,
                Weight = weight
            });

            return context;
        }
    }
}
