using LivestockTracker.Database;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Medicine
{
    /// <summary>
    /// Provides create, read, update and delete operations for medicine types.
    /// </summary>
    internal class MedicineTypeCrudService : IMedicineTypeCrudService
    {
        private readonly ILogger _logger;
        private readonly LivestockContext _dbContext;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="dbContext">The database context that contains the medicine types.</param>
        public MedicineTypeCrudService(ILogger<MedicineTypeCrudService> logger, LivestockContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        /// <summary>
        /// Attempts to add a new medicine type to the persisted store.
        /// </summary>
        /// <param name="item">The medicine type that should be added.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The added medicine type.</returns>
        public async Task<MedicineType> AddAsync(MedicineType item, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Adding a medicine type...");

            MedicineTypeModel entity = new()
            {
                Description = item.Description
            };

            if (_dbContext.MedicineTypes.Any(medicine => medicine.Id == item.Id))
            {
                throw new ItemAlreadyExistsException<int>(item.Id, "A Medicine");
            }

            EntityEntry<MedicineTypeModel> changes = await _dbContext.AddAsync(entity, cancellationToken).ConfigureAwait(false);
            await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            _logger.LogDebug("Medicine type '{Description}' added with detail", changes.Entity.Description);
            return changes.Entity.MapToMedicineType();
        }

        /// <inheritdoc/>
        public async Task<int> RemoveAsync(int id, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Marking the medicine type with ID {Id} as deleted...", id);

            MedicineTypeModel entity = _dbContext.MedicineTypes.FirstOrDefault(medicine => medicine.Id == id) ??
                throw new EntityNotFoundException<MedicineType>(id);

            entity.Delete();
            await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            _logger.LogDebug("Medicine type with ID {Id} marked as deleted...", id);
            return id;
        }

        /// <inheritdoc/>
        /// <exception cref="EntityNotFoundException{IMedicineType}">When the medicine type with the given key is not found.</exception>
        public async Task<MedicineType> UpdateAsync(MedicineType item, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Updating the medicine type with ID {Id}...", item.Id);

            MedicineTypeModel? entity = _dbContext.MedicineTypes
                                                  .FirstOrDefault(medicine => medicine.Id == item.Id);
            if (entity == null)
            {
                _logger.LogWarning("An attempt was made to update a non-existing medicine {@Request}", item);
                throw new EntityNotFoundException<MedicineType>(item.Id);
            }

            entity.Update(item);
            await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            return entity.MapToMedicineType();
        }
    }
}
