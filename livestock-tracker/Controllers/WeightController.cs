using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Weight;
using LivestockTracker.Abstractions.Services.Weight;
using LivestockTracker.Models.Paging;
using LivestockTracker.ViewModels.Weight;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.ComponentModel;
using System.Threading.Tasks;

namespace LivestockTracker.Controllers
{
    /// <summary>
    /// Provides a set of endpoints for interacting with weight transactions.
    /// </summary>
    public class WeightController : LivestockApiController
    {
        private readonly IWeightTransactionCrudService _weightTransactionCrudService;

        /// <summary>
        /// The constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="weightTransactionCrudService">
        /// A service for performing CRUD operations on weight transactions.
        /// </param>
        public WeightController(ILogger<WeightController> logger, IWeightTransactionCrudService weightTransactionCrudService)
            : base(logger)
        {
            _weightTransactionCrudService = weightTransactionCrudService;
        }

        /// <summary>
        /// Requests the retrieval of a paged set of weight transactions according
        /// to some filter.
        /// </summary>
        /// <param name="pageNumber">The number of the pagination page.</param>
        /// <param name="pageSize">The size of the the pagination page.</param>
        /// <param name="animalIds">The ids for the animals to be filtered.</param>
        /// <param name="weightUpper">The upper limit of the weight.</param>
        /// <param name="weightLower">The lower limir of the weight.</param>
        /// <param name="exclude">Whether to exclude the filter values.</param>
        /// <returns>
        /// A paged set of <see cref="WeightTransaction"/> items, filtered as requested.
        /// </returns>
        [HttpGet]
        [ProducesResponseType(typeof(IPagedData<WeightTransaction>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllAsync(int pageNumber,
                                                     int pageSize,
                                                     [FromQuery] long[]? animalIds,
                                                     decimal? weightUpper,
                                                     decimal? weightLower,
                                                     bool? exclude = false)
        {
            Logger.LogInformation("Requesting {@PageSize} feed types from page {@PageNumber}...", pageSize, pageNumber);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var pagingOptions = new PagingOptions
            {
                PageNumber = pageNumber,
                PageSize = pageSize == 0 ? 10 : pageSize
            };

            var filter = new WeightTransactionFilter();
            if (animalIds != null)
            {
                filter.AddAnimalIds(animalIds);
            }
            filter.SetWeightBounds(weightLower, weightUpper);
            if (exclude.HasValue && exclude.Value)
            {
                filter.SetIncludeState(false);
            }

            var transactions = await _weightTransactionCrudService.FetchPagedAsync(WeightTransactionFilter.Null,
                                                                                   pagingOptions,
                                                                                   ListSortDirection.Descending,
                                                                                   RequestAbortToken)
                                                                  .ConfigureAwait(false);

            return Ok(transactions);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(typeof(WeightTransaction), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddAsync(CreateWeightTransactionViewModel viewModel)
        {
            Logger.LogInformation("Requesting the creation of weight transaction: {@Transaction} for animal {@AnimalId}...", viewModel, viewModel.AnimalId);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var transaction = new WeightTransaction
            {
                AnimalId = viewModel.AnimalId,
                TransactionDate = viewModel.TransactionDate,
                Weight = viewModel.Weight
            };

            transaction = await _weightTransactionCrudService.AddAsync(transaction, RequestAbortToken).ConfigureAwait(false);

            return Ok(transaction);
        }
    }
}
