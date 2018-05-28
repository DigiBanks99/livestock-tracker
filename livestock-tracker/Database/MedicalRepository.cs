using LivestockTracker.Models;

namespace LivestockTracker.Database
{
    public class MedicalRepository : Repository<MedicalTransaction>, IMedicalRepository
    {
        public MedicalRepository(LivestockContext dbContext) : base(dbContext) { }
    }
}
