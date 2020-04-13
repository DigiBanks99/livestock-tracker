using System;

namespace LivestockTracker.Abstractions.Models
{
    /// <summary>
    /// Defines all the properties of a feeding transaction.
    /// </summary>
    public interface IFeedingTransaction
    {
        /// <summary>
        /// The number that uniquely identifies the feeding transaction.
        /// </summary>
        int ID { get; }

        /// <summary>
        /// A linking ID to the animal that was fed.
        /// </summary>
        int AnimalID { get; }

        /// <summary>
        /// A linking ID to the type of feed.
        /// </summary>
        int FeedID { get; }

        /// <summary>
        /// The date and time the feeding happened.
        /// </summary>
        DateTimeOffset TransactionDate { get; }

        /// <summary>
        /// The amount of feed given. <seealso cref="UnitTypeCode"/>.
        /// </summary>
        decimal Quantity { get; }

        /// <summary>
        /// The unit of measurement for the <seealso cref="Quantity"/>.
        /// </summary>
        int UnitTypeCode { get; }
    }
}
