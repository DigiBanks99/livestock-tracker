using System;

namespace LivestockTracker.Abstractions.Models.Medical
{
    /// <summary>
    /// Defines all the properties of a medical transaction.
    /// </summary>
    public interface IMedicalTransaction
    {
        /// <summary>
        /// A key that uniquely identifies the medical transaction.
        /// </summary>
        int Id { get; }

        /// <summary>
        /// A linking key to the animal to whom the medication was administered.
        /// </summary>
        int AnimalId { get; }

        /// <summary>
        /// A linking key to the type of medicine that was administered.
        /// </summary>
        int MedicineId { get; }

        /// <summary>
        /// The date and time the medication was administered.
        /// </summary>
        DateTimeOffset TransactionDate { get; }

        /// <summary>
        /// The amount of medicine that was administered. <seealso cref="UnitId"/>.
        /// </summary>
        decimal Dose { get; }

        /// <summary>
        /// A linking key to the unit of measurement for the <seealso cref="Dose"/>.
        /// </summary>
        int UnitId { get; }
    }
}
