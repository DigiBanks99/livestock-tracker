using LivestockTracker.Abstractions.Data;
using LivestockTracker.Database.Models;
using LivestockTracker.Database.Models.Animals;
using LivestockTracker.Database.Models.Medical;
using LivestockTracker.Database.Models.Units;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace LivestockTracker.Medicine;

[Table("MedicalTransactions", Schema = "medical")]
public class MedicalTransactionModel : IEntity<long>, IAnimalTransaction
{
    [Column("ID")]
    [Key]
    public long Id { get; set; }
    [Column("AnimalID")]
    [Required]
    public long AnimalId { get; set; }
    [Column("MedicineID")]
    [Required]
    public int MedicineId { get; set; }
    [Required]
    public DateTimeOffset TransactionDate { get; set; }
    [Required]
    public decimal Dose { get; set; }
    [Column("UnitID")]
    [Required]
    public int UnitId { get; set; }

    public AnimalModel Animal { get; internal set; } = null!;
    public UnitModel UnitOfMeasurement { get; internal set; } = null!;
    public MedicineTypeModel Medicine { get; internal set; } = null!;

    public long GetKey()
    {
        return Id;
    }

    public void UpdateTransaction(MedicalTransaction transaction)
    {
        if (AnimalId != transaction.AnimalId)
        {
            throw new ArgumentException("A transaction cannot be moved to a different animal. Capture a new transaction for that animal and delete this one.");
        }

        MedicineId = transaction.MedicineId;
        Dose = transaction.Dose;
        TransactionDate = transaction.TransactionDate;
        UnitId = transaction.UnitId;
    }
}

public static class MedicalTransactionExtensions
{
    public static IQueryable<MedicalTransaction> MapToMedicalTransactions(this IQueryable<MedicalTransactionModel> query)
    {
        return query.Select(transaction => new MedicalTransaction
        {
            AnimalId = transaction.AnimalId,
            Dose = transaction.Dose,
            Id = transaction.Id,
            MedicineId = transaction.MedicineId,
            TransactionDate = transaction.TransactionDate,
            UnitId = transaction.UnitId
        });
    }

    public static MedicalTransaction MapToMedicalTransaction(this MedicalTransactionModel transaction) => new()
    {
        AnimalId = transaction.AnimalId,
        Dose = transaction.Dose,
        Id = transaction.Id,
        MedicineId = transaction.MedicineId,
        TransactionDate = transaction.TransactionDate,
        UnitId = transaction.UnitId
    };
}
