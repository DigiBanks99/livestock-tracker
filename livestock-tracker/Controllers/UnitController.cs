using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Units;
using LivestockTracker.Abstractions.Services.Units;
using LivestockTracker.Models.Paging;
using LivestockTracker.Models.Units;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.ComponentModel;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers
{
    /// <summary>
    /// Provides a collection of endpoints for interacting with unit data.
    /// </summary>
    public class UnitController : LivestockApiController
    {
        private readonly IUnitCrudService _unitCrudService;

        /// <summary>
        /// The constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="unitService">The unit service.</param>
        public UnitController(ILogger<UnitController> logger, IUnitCrudService unitService)
            : base(logger)
        {
            _unitCrudService = unitService;
        }

        /// <summary>
        /// Requests a paged collection of units.
        /// </summary>
        /// <param name="pageNumber">The number of the page.</param>
        /// <param name="pageSize">The size of each page.</param>
        /// <param name="includeDeleted">Whether to include deleted items.</param>
        /// <returns>A paged collection of units, sorted by description.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IPagedData<Unit>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Get(int pageNumber = 0, int pageSize = 100, bool includeDeleted = false)
        {
            var includeDeletedMessage = includeDeleted ? " including deleted items" : string.Empty;
            Logger.LogInformation($"Requesting {pageSize} units from page {pageNumber}{includeDeletedMessage}...");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Expression<Func<IUnit, bool>> filter = feedType => !feedType.Deleted;
            var pagingOptions = new PagingOptions
            {
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            if (includeDeleted)
            {
                filter = feedType => true;
            }

            var units = await _unitCrudService.FindAsync(filter, sort: u => u.Description, ListSortDirection.Ascending, pagingOptions, RequestAbortToken)
                                              .ConfigureAwait(false);

            return Ok(units);
        }

        /// <summary>
        /// Requests the detail for a single unit with an ID that matches the value provided.
        /// </summary>
        /// <param name="id">The unique identifier of the unit.</param>
        /// <returns>The unit detail if it was found.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Unit), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(int id)
        {
            Logger.LogInformation($"Requesting the detail of the unit with ID {id}...");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var unit = await _unitCrudService.GetOneAsync(id, RequestAbortToken)
                                                 .ConfigureAwait(false);

                return Ok(unit);
            }
            catch (EntityNotFoundException<IUnit> ex)
            {
                return NotFound(ex.Message);
            }

        }

        /// <summary>
        /// Requests the creation of a new unit with the provided detail.
        /// </summary>
        /// <param name="unit">The detail of the unit that should be added.</param>
        /// <returns>The added unit if successful.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(Unit), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Add([FromBody] Unit unit)
        {
            Logger.LogInformation($"Requesting the creation of a unit with detail {unit}...");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var addedUnit = await _unitCrudService.AddAsync(unit, RequestAbortToken)
                                                  .ConfigureAwait(false);

            return CreatedAtAction(nameof(Get), new { id = addedUnit.Id }, addedUnit);
        }

        /// <summary>
        /// Requests the updating of an existing unit with the provided detail.
        /// </summary>
        /// <param name="id">The unique identifier of the unit.</param>
        /// <param name="unit">The values with which the unit should be updated.</param>
        /// <returns>The updated unit if successful.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Unit), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(int id, [FromBody] Unit? unit)
        {
            Logger.LogInformation($"Requests the updating of a unit with {id} with values {unit}...");

            if (unit == null)
            {
                ModelState.AddModelError(nameof(unit), $"{nameof(unit)} is required.");
                return BadRequest(ModelState);
            }

            if (id != unit.Id)
            {
                ModelState.AddModelError(nameof(unit.Id), "The id in the body does match the id in the route.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var updatedUnit = await _unitCrudService.UpdateAsync(unit, RequestAbortToken)
                                                            .ConfigureAwait(false);
                return Ok(updatedUnit);
            }
            catch (EntityNotFoundException<IUnit> ex)
            {
                return NotFound(ex.Message);
            }
        }

        /// <summary>
        /// Requests the deletion of an existing unit.
        /// </summary>
        /// <param name="id">The unique identifier of the unit.</param>
        /// <returns>The id of the removed unit.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            Logger.LogInformation($"Requesting the removal of unit with ID {id}...");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var removedId = await _unitCrudService.RemoveAsync(id, RequestAbortToken).ConfigureAwait(false);

                return Ok(removedId);
            }
            catch (EntityNotFoundException<IUnit> ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
