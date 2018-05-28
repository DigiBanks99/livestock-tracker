using LivestockTracker.Database;
using LivestockTracker.Models;

namespace LivestockTracker.Services
{
    public class MedecineService : Service<MedecineType>, IMedecineService
    {
        public MedecineService(IMedecineTypeRepository medecineTypeRepository) : base(medecineTypeRepository) { }
    }
}
