using System;

namespace LivestockTracker.Abstractions.Models
{
    /// <summary>
    /// Defines all the properties of a medical transaction.
    /// </summary>
    public interface IMedicalTransaction
    {
        /// <summary>
        /// A key that uniquely identifies the medical transaction.
        /// </summary>
        int ID { get; }

        /// <summary>
        /// A linking key to the animal to whom the medication was administered.
        /// </summary>
        int AnimalID { get; }

        /// <summary>
        /// A linking key to the type of medicine that was administered.
        /// </summary>
        int MedicineTypeCode { get; }

        /// <summary>
        /// The date and time the medication was administered.
        /// </summary>
        DateTimeOffset TransactionDate { get; }

        /// <summary>
        /// The amount of medicine that was administered. <seealso cref="Unit"/>.
        /// </summary>
        decimal Dose { get; }

        /// <summary>
        /// A linking key to the unit of measurement for the <seealso cref="Dose"/>.
        /// </summary>
        int Unit { get; }
    }
}
