using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Medical;
using LivestockTracker.Abstractions.Services.Medicine;
using LivestockTracker.Models.Medical;
using LivestockTracker.Models.Paging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers
{
    /// <summary>
    /// Provides a set of endpoints for interacting with medicine types.
    /// </summary>
    public class MedicineTypeController : LivestockApiController
    {
        private readonly IMedicineTypeCrudService _medicineTypeCrudService;
        private readonly IMedicineTypeSearchService _medicineTypeSearchService;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="medicineTypeCrudService">A service for medicine type CRUD operations.</param>
        /// <param name="medicineTypeSearchService">A service for performing search operations on medicine types.</param>
        public MedicineTypeController(ILogger<MedicineTypeController> logger,
                                      IMedicineTypeCrudService medicineTypeCrudService,
                                      IMedicineTypeSearchService medicineTypeSearchService)
            : base(logger)
        {
            _medicineTypeCrudService = medicineTypeCrudService;
            _medicineTypeSearchService = medicineTypeSearchService;
        }

        /// <summary>
        /// Requests a paged list of medicine types that are viewable, sorted by description.
        /// </summary>
        /// <param name="pageNumber">The number of the page.</param>
        /// <param name="pageSize">The size of each page.</param>
        /// <param name="includeDeleted">Whether to include deleted items.</param>
        /// <returns>A sorted and paged list of medicine types.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IPagedData<MedicineType>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Get(int pageNumber = 0, int pageSize = 100, bool includeDeleted = false)
        {
            var includeDeletedMessage = includeDeleted ? " including deleted items" : string.Empty;
            Logger.LogInformation($"Requesting {pageSize} medicine types from page {pageNumber}{includeDeletedMessage}...");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Expression<Func<IMedicineType, bool>> filter = medicineType => !medicineType.Deleted;
            var pagingOptions = new PagingOptions
            {
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            if (includeDeleted)
            {
                filter = medicineType => true;
            }

            var data = await _medicineTypeSearchService.FindAsync(filter,
                                                                  sort: medicineType => medicineType.Description,
                                                                  ListSortDirection.Ascending,
                                                                  pagingOptions,
                                                                  RequestAbortToken)
                                                   .ConfigureAwait(false);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var medicineType = await _medicineTypeCrudService.GetOneAsync(id, RequestAbortToken)
                                                                 .ConfigureAwait(false);

                return Ok(medicineType);
            }
            catch (EntityNotFoundException<IMedicineType> ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add([Required][FromBody] MedicineType medicineType)
        {
            if (!ModelState.IsValid || medicineType == null)
            {
                return BadRequest(ModelState);
            }

            var addedItem = await _medicineTypeCrudService.AddAsync(medicineType, RequestAbortToken).ConfigureAwait(false);

            return CreatedAtAction(nameof(Get), new { id = addedItem.Id }, medicineType);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] MedicineType? medicineType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (medicineType == null || id != medicineType.Id)
            {
                return BadRequest();
            }

            try
            {
                var updated = await _medicineTypeCrudService.UpdateAsync(medicineType, RequestAbortToken).ConfigureAwait(false);

                return Ok(updated);
            }
            catch (EntityNotFoundException<IMedicineType> ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var removedMedicineTypeId = await _medicineTypeCrudService.RemoveAsync(id, RequestAbortToken).ConfigureAwait(false);

                return Ok(removedMedicineTypeId);
            }
            catch (EntityNotFoundException<IMedicineType> ex)
            {
                return NotFound(ex);
            }
        }
    }
}
