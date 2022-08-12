using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using LivestockTracker.Exceptions;
using LivestockTracker.Feed;
using LivestockTracker.Medicine;
using LivestockTracker.Weight;

namespace LivestockTracker.Animals;

/// <summary>
///     Represents an animal which is the core entity of this system.
/// </summary>
[DebuggerDisplay(
    "[{Id} - {Number}]{Archived ? \" A\" : string.Empty}: {BirthDate.ToString(\"o\")} - Sold: {Sold}, Deceased: {Deceased}")]
public class Animal : IAnimal
{
    /// <summary>
    ///     Creates a new instance of an animal.
    /// </summary>
    /// <param name="type">The type of animal.</param>
    /// <param name="subspecies">The animal subspecies.</param>
    /// <param name="number">The unique number for the animal as provided by the tenant.</param>
    /// <param name="batchNumber">The batch the animal is allocated to.</param>
    /// <param name="birthDate">The date of birth of the animal.</param>
    /// <param name="purchaseDate">The date the animal was purchased.</param>
    /// <param name="purchasePrice">The price at which the animal was purchased.</param>
    /// <param name="arrivalWeight">The weight of the animal on arrival.</param>
    public Animal(AnimalType type,
        string? subspecies,
        int number,
        int batchNumber,
        DateTimeOffset birthDate,
        DateTimeOffset purchaseDate,
        decimal purchasePrice,
        decimal arrivalWeight)
    {
        Id = 0;
        Type = type;
        Subspecies = subspecies;
        Number = number;
        BatchNumber = batchNumber;
        BirthDate = birthDate;
        PurchaseDate = purchaseDate;
        PurchasePrice = purchasePrice;
        ArrivalWeight = arrivalWeight;

        Archived = false;

        Sold = false;
        SellDate = null;
        SellPrice = null;

        Deceased = false;
        DateOfDeath = null;
    }

    /// <summary>
    ///     Whether this animal has been archived or not.
    /// </summary>
    public bool Archived { get; private set; }

    /// <summary>
    ///     The feeding transactions for the animal.
    /// </summary>
    public IList<FeedingTransaction> FeedingTransactions { get; } = new List<FeedingTransaction>();

    /// <summary>
    ///     The medical transactions for the animal.
    /// </summary>
    public IList<MedicalTransaction> MedicalTransactions { get; } = new List<MedicalTransaction>();

    /// <summary>
    ///     The weight transactions for the animal.
    /// </summary>
    public IList<WeightTransaction> WeightTransactions { get; } = new List<WeightTransaction>();

    /// <summary>
    ///     The unique identifier of the animal.
    /// </summary>
    public long Id { get; private set; }

    /// <summary>
    ///     The type of animal.
    /// </summary>
    [Required]
    public AnimalType Type { get; private set; }

    /// <summary>
    ///     The subspecies of the animal.
    /// </summary>
    [MaxLength(50)]
    public string? Subspecies { get; private set; }

    /// <summary>
    ///     The unique number for the animal as defined by the tenant.
    /// </summary>
    [Required]
    public int Number { get; private set; }

    /// <summary>
    ///     The unique batch the animal is associated with.
    /// </summary>
    [Required]
    public int BatchNumber { get; private set; }

    /// <summary>
    ///     The date the animal was born.
    /// </summary>
    [Required]
    public DateTimeOffset BirthDate { get; private set; }

    /// <summary>
    ///     The date the animal was purchased.
    /// </summary>
    [Required]
    public DateTimeOffset PurchaseDate { get; private set; }

    /// <summary>
    ///     The price for which the animal was purchased.
    /// </summary>
    [Required]
    public decimal PurchasePrice { get; private set; }

    /// <summary>
    ///     The animal's weight on arrival.
    /// </summary>
    [Required]
    public decimal ArrivalWeight { get; private set; }

    /// <summary>
    ///     A flag to indicate if the animal was sold.
    /// </summary>
    [Required]
    public bool Sold { get; private set; }

    /// <summary>
    ///     The price the animal was sold for.
    /// </summary>
    public decimal? SellPrice { get; private set; }

    /// <summary>
    ///     The date the animal was sold.
    /// </summary>
    public DateTimeOffset? SellDate { get; private set; }

    /// <summary>
    ///     A flag that indicates if the animal is deceased.
    /// </summary>
    [Required]
    public bool Deceased { get; private set; }

    /// <summary>
    ///     The date the animal died.
    /// </summary>
    public DateTimeOffset? DateOfDeath { get; private set; }

    /// <summary>
    /// Updates the animal with the desired values.
    /// </summary>
    /// <param name="desiredValues">The desired values for the animal.</param>
    /// <exception cref="ArchivedAnimalException">Cannot edit an archived animal.</exception>
    /// <exception cref="DeceasedAnimalException">Cannot edit a deceased animal.</exception>
    /// <exception cref="SoldAnimalException">Cannot edit a sold animal.</exception>
    public void Update(Animal desiredValues)
    {
        ValidateCanUpdate();

        Type = desiredValues.Type;
        Subspecies = desiredValues.Subspecies;
        BirthDate = desiredValues.BirthDate;
        Number = desiredValues.Number;
        BatchNumber = desiredValues.BatchNumber;
        PurchaseDate = desiredValues.PurchaseDate;
        PurchasePrice = desiredValues.PurchasePrice;
        ArrivalWeight = desiredValues.ArrivalWeight;
    }

    /// <summary>
    ///     Mark the animal as sold and record sale information.
    /// </summary>
    /// <param name="price">The price for which the animal was sold.</param>
    /// <param name="sellDate">The date the animal was sold on. Defaults to UTC now.</param>
    /// <exception cref="ArchivedAnimalException">Archived animals cannot be sold.</exception>
    /// <exception cref="DeceasedAnimalException">A deceased animal cannot be sold.</exception>
    /// <exception cref="ArgumentException">The sell date cannot precede the animal's birth date.</exception>
    public void Sell(decimal price, DateTimeOffset? sellDate = default)
    {
        if (Archived)
        {
            throw new ArchivedAnimalException(
                "Cannot sell an archived animal. First remove the animal from the archive.");
        }

        if (Deceased)
        {
            throw new DeceasedAnimalException("Cannot sell a deceased animal.");
        }

        if (sellDate < BirthDate)
        {
            throw new ArgumentException("The date of death cannot be before the animal's birth date");
        }

        Sold = true;
        SellPrice = price;
        SellDate = sellDate ?? DateTimeOffset.UtcNow;
    }

    /// <summary>
    ///     Record the death of an animal.
    /// </summary>
    /// <param name="dateOfDeath">The date the animal died.</param>
    /// <exception cref="ArchivedAnimalException">Cannot record the death of an archived animal.</exception>
    /// <exception cref="ArgumentException">The date of death cannot precede the animal's birth date.</exception>
    public void RecordDeath(DateTimeOffset dateOfDeath)
    {
        if (Archived)
        {
            throw new ArchivedAnimalException(
                "Cannot record the death of an archived animal. First remove the animal from the archive.");
        }

        if (dateOfDeath < BirthDate)
        {
            throw new ArgumentException("The date of death cannot be before the animal's birth date");
        }

        Deceased = true;
        DateOfDeath = dateOfDeath;
    }

    /// <summary>
    ///     Marks an animal as archived.
    /// </summary>
    public void Archive()
    {
        Archived = true;
    }

    /// <summary>
    ///     Marks an animal as not archived.
    /// </summary>
    public void Unarchive()
    {
        Archived = false;
    }

    private void ValidateCanUpdate()
    {
        if (Archived)
        {
            throw new ArchivedAnimalException("The animal is archived and cannot be edited.");
        }

        if (Deceased)
        {
            throw new DeceasedAnimalException("The animal is deceased and cannot be updated.");
        }

        if (Sold)
        {
            throw new SoldAnimalException("The animal has been sold and cannot be edited.");
        }
    }
}
