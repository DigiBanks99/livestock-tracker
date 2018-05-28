using LivestockTracker.Database;
using LivestockTracker.Models;
using System.Collections.Generic;

namespace LivestockTracker.Services
{
    public class MedicalService : Service<MedicalTransaction>, IMedicalService
    {
        private readonly IMedicalRepository _medicalRepository;
        public MedicalService(IMedicalRepository medicalRepository) : base(medicalRepository)
        {
            _medicalRepository = medicalRepository;
        }

        public IEnumerable<MedicalTransaction> GetByAnimalID(int animalID)
        {
            return _medicalRepository.Find(medical => medical.AnimalID == animalID);
        }

        public IEnumerable<MedicalTransaction> GetMedicalTransactions()
        {
            return GetAll();
        }

        public void AddRange(IEnumerable<MedicalTransaction> medicalTransactions)
        {
            _medicalRepository.AddRange(medicalTransactions);
        }

        public void RemoveRange(IEnumerable<MedicalTransaction> medicalTransactions)
        {
            _medicalRepository.RemoveRange(medicalTransactions);
        }
    }
}
