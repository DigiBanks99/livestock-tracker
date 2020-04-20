using System;

namespace LivestockTracker.Abstractions.Models.Feed
{
    /// <summary>
    /// Defines all the properties of a feeding transaction.
    /// </summary>
    public interface IFeedingTransaction
    {
        /// <summary>
        /// The number that uniquely identifies the feeding transaction.
        /// </summary>
        int Id { get; }

        /// <summary>
        /// A linking ID to the animal that was fed.
        /// </summary>
        int AnimalId { get; }

        /// <summary>
        /// A linking ID to the type of feed.
        /// </summary>
        int FeedTypeId { get; }

        /// <summary>
        /// The date and time the feeding happened.
        /// </summary>
        DateTimeOffset TransactionDate { get; }

        /// <summary>
        /// The amount of feed given. <seealso cref="UnitId"/>.
        /// </summary>
        decimal Quantity { get; }

        /// <summary>
        /// The unit of measurement for the <seealso cref="Quantity"/>.
        /// </summary>
        int UnitId { get; }
    }
}
