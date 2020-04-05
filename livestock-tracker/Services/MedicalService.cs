using LivestockTracker.Database;
using LivestockTracker.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Services
{
    public class MedicalService : Service<MedicalTransaction, int>, IMedicalService
    {
        public MedicalService(LivestockContext livestockContext) : base(livestockContext) { }

        public IEnumerable<MedicalTransaction> GetByAnimalId(int animalID)
        {
            return Context.MedicalTransactions
                          .Where(medical => medical.AnimalID == animalID)
                          .ToList();
        }

        public async ValueTask<IEnumerable<MedicalTransaction>> GetByAnimalIdAsync(int animalID, CancellationToken cancellationToken)
        {
            return await Context.MedicalTransactions
                                .Where(medical => medical.AnimalID == animalID)
                                .ToListAsync(cancellationToken)
                                .ConfigureAwait(false);

        }

        public void AddRange(IEnumerable<MedicalTransaction> medicalTransactions)
        {
            Context.MedicalTransactions
                   .AddRange(medicalTransactions);
            Context.SaveChanges();
        }

        public void RemoveRange(IEnumerable<MedicalTransaction> medicalTransactions)
        {
            Context.MedicalTransactions
                   .RemoveRange(medicalTransactions);
            Context.SaveChanges();
        }
    }
}
