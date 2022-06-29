using LivestockTracker.Abstractions;
using LivestockTracker.Database;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;

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

        public Task<IMedicineType> AddAsync(IMedicineType item, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IMedicineType> UpdateAsync(IMedicineType item, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Flags the record in the persisted store as Deleted. It does not physically delete the record
        /// to ensure relationships for history items are kept intact.
        /// </summary>
        /// <param name="key">The ID for the medicine type.</param>
        /// <param name="cancellationToken">A token that can be used to signal operation cancellation.</param>
        /// <returns>The ID of the medicine type that was marked as Deleted.</returns>
        public virtual async Task<int> RemoveAsync(int key, CancellationToken cancellationToken)
        {
            _logger.LogInformation($"Marking the medicine type with ID {key} as deleted...");

            var entity = await _dbContext.MedicineTypes
                                               .FindAsync(new object[] { key }, cancellationToken)
                                               .ConfigureAwait(false);
            if (entity == null)
                throw new EntityNotFoundException<MedicineTypeModel>(key);

            entity.Deleted = true;
            var changes = _dbContext.Update(entity);
            await _dbContext.SaveChangesAsync(cancellationToken)
                                  .ConfigureAwait(false);

            _logger.LogDebug($"Medicine type with ID {key} marked as deleted...");
            return changes.Entity.Id;
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
                throw new EntityNotFoundException<MedicineTypeModel>(item.Id);
            }

            entity.Update(item);
            await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

            return entity.MapToMedicineType();
        }
    }
}
