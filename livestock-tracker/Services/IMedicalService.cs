using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using LivestockTracker.Abstractions;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public interface IMedicalService : IService<MedicalTransaction, int>
    {
        void AddRange(IEnumerable<MedicalTransaction> medicalTransactions);
        IEnumerable<MedicalTransaction> GetByAnimalId(int animalID);
        ValueTask<IEnumerable<MedicalTransaction>> GetByAnimalIdAsync(int animalID, CancellationToken cancellationToken);
        void RemoveRange(IEnumerable<MedicalTransaction> medicalTransactions);
    }
}
