using LivestockTracker.Abstractions.Data;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace LivestockTracker.Medicine;

[Table("MedicineTypes", Schema = "medical")]
public class MedicineTypeModel : LookupValueEntity<int>, IMedicineType
{
    public List<MedicalTransactionModel> MedicalTransactions { get; internal set; } = null!;

    public void Update(MedicineType item)
    {
        if (!Deleted)
        {
            Description = item.Description;
        }
        Deleted = item.Deleted;
    }
}

public static class MedicineTypeModelExtensions
{
    public static IQueryable<MedicineType> MapToMedicineTypes(this IQueryable<MedicineTypeModel> query)
    {
        return query.Select(medicine => new MedicineType()
        {
            Id = medicine.Id,
            Deleted = medicine.Deleted,
            Description = medicine.Description
        });
    }

    public static MedicineType MapToMedicineType(this MedicineTypeModel medicine)
    {
        return new()
        {
            Id = medicine.Id,
            Deleted = medicine.Deleted,
            Description = medicine.Description
        };
    }
}
