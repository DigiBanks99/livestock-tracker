using System.Collections.Generic;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public interface IMedicalService : IService<MedicalTransaction>
    {
        void AddRange(IEnumerable<MedicalTransaction> medicalTransactions);
        IEnumerable<MedicalTransaction> GetByAnimalID(int animalID);
        void RemoveRange(IEnumerable<MedicalTransaction> medicalTransactions);
    }
}
