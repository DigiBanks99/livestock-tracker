using LivestockTracker.Abstractions.Models;
using LivestockTracker.Abstractions.Models.Feed;
using LivestockTracker.Abstractions.Services.Feed;
using LivestockTracker.Models;
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
    /// Provides a set of endpoints for interacting with feed types.
    /// </summary>
    public class FeedTypeController : LivestockApiController
    {
        private readonly IFeedTypeCrudService _feedTypeCrudService;
        private readonly IFeedTypeSearchService _feedTypeSearchService;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The logger.</param>
        /// <param name="feedTypeService">A service for performing CRUD operations on feed types.</param>
        /// <param name="feedTypeSearchService">A service for performing search operations on feed types.</param>
        public FeedTypeController(ILogger<FeedTypeController> logger, IFeedTypeCrudService feedTypeService, IFeedTypeSearchService feedTypeSearchService)
            : base(logger)
        {
            _feedTypeCrudService = feedTypeService;
            _feedTypeSearchService = feedTypeSearchService;
        }

        /// <summary>
        /// Requests a paged list of feed types that are viewable, sorted by description.
        /// </summary>
        /// <returns>A sorted and paged list of feed types.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IPagedData<FeedType>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAll(int pageNumber = 0, int pageSize = 100, bool includeDeleted = false)
        {
            Logger.LogInformation($"Requesting {pageSize} feed types from page {pageNumber}...");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Expression<Func<IFeedType, bool>> filter = feedType => !feedType.Deleted;
            var pagingOptions = new PagingOptions
            {
                PageNumber = pageNumber,
                PageSize = pageSize
            };

            if (includeDeleted)
            {
                filter = feedType => true;
            }

            var data = await _feedTypeSearchService.FindAsync(filter,
                                                              sort: feedType => feedType.Description,
                                                              ListSortDirection.Ascending,
                                                              pagingOptions,
                                                              RequestAbortToken)
                                                   .ConfigureAwait(false);

            return Ok(data);
        }

        /// <summary>
        /// Request the detail of a specific feed type.
        /// </summary>
        /// <param name="id">The unique identifier for the feed type.</param>
        /// <returns>The feed type if found.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(FeedType), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Get(int id)
        {
            Logger.LogInformation($"Requesting the detail of the feed type with ID {id}...");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = await _feedTypeSearchService.GetOneAsync(id, RequestAbortToken)
                                                   .ConfigureAwait(false);
            return Ok(item);
        }

        /// <summary>
        /// Requests the creation of a new feed type with the supplied details.
        /// </summary>
        /// <param name="feedType">The details of the feed type to be created.</param>
        /// <returns>The created feed type with it's unique identifier.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(FeedType), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Add([FromBody] FeedType feedType)
        {
            Logger.LogInformation($"Requesting the creation of a new feed type with details {feedType}...");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var addedItem = await _feedTypeCrudService.AddAsync(feedType, RequestAbortToken)
                                                      .ConfigureAwait(false);

            return CreatedAtAction(nameof(Get), new { id = addedItem.Id }, addedItem);
        }

        /// <summary>
        /// Request updates to a feed type that already exists.
        /// </summary>
        /// <param name="id">The id of the feed type that should be updated.</param>
        /// <param name="feedType">The updates for the feed type.</param>
        /// <returns>The updated feed type.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(FeedType), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, [Required][FromBody] FeedType feedType)
        {
            Logger.LogInformation($"Requesting updates to the feed type with ID {id}...");

            if (feedType == null)
            {
                return BadRequest(ModelState);
            }

            if (id != feedType.Id)
            {
                ModelState.AddModelError(nameof(feedType.Id), "The id in the body and in the URL do not match.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var updatedFeedType = await _feedTypeCrudService.UpdateAsync(feedType, RequestAbortToken)
                                                                .ConfigureAwait(false);

                return Ok(updatedFeedType);
            }
            catch (EntityNotFoundException<FeedType> ex)
            {
                return NotFound(ex.Message);
            }
        }

        /// <summary>
        /// Request the deletion of feed type with the provided id.
        /// </summary>
        /// <param name="id">The id of the feed type that should be deleted.</param>
        /// <returns>The id of the feed type that was deleted.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(FeedType), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(SerializableError), StatusCodes.Status400BadRequest)]
        public async ValueTask<IActionResult> Delete([Required] int id)
        {
            Logger.LogInformation($"Requesting the deletion a feed type with ID {id}...");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var removedId = await _feedTypeCrudService.RemoveAsync(id, RequestAbortToken)
                                                          .ConfigureAwait(false);

                return Ok(removedId);
            }
            catch (EntityNotFoundException<FeedType> ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
