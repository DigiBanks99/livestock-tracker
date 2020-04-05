using LivestockTracker.Abstractions;
using LivestockTracker.Database;
using LivestockTracker.Database.Models;
using LivestockTracker.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Services
{
    public class MedicalService : Service<MedicalTransactionModel, MedicalTransaction, int>, IMedicalService
    {
        public MedicalService(LivestockContext livestockContext, IMapper<MedicalTransactionModel, MedicalTransaction> mapper)
            : base(livestockContext, mapper) { }

        public IEnumerable<MedicalTransaction> GetByAnimalId(int animalID)
        {
            return Context.MedicalTransactions
                          .Where(medical => medical.AnimalID == animalID)
                          .Select(medical => Mapper.Map(medical))
                          .ToList();
        }

        public async ValueTask<IEnumerable<MedicalTransaction>> GetByAnimalIdAsync(int animalID, CancellationToken cancellationToken)
        {
            return await Context.MedicalTransactions
                                .Where(medical => medical.AnimalID == animalID)
                                .Select(medical => Mapper.Map(medical))
                                .ToListAsync(cancellationToken)
                                .ConfigureAwait(false);

        }

        public void AddRange(IEnumerable<MedicalTransaction> medicalTransactions)
        {
            var entityMedicalTransactions = medicalTransactions.Select(medical => Mapper.Map(medical));
            Context.MedicalTransactions
                   .AddRange(entityMedicalTransactions);
            Context.SaveChanges();
        }

        public void RemoveRange(IEnumerable<MedicalTransaction> medicalTransactions)
        {
            var entityMedicalTransactions = medicalTransactions.Select(medical => Mapper.Map(medical));
            Context.MedicalTransactions
                   .RemoveRange(entityMedicalTransactions);
            Context.SaveChanges();
        }
    }
}
