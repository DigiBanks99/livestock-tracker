using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading;

namespace LivestockTracker.Controllers
{
    /// <summary>
    /// A base controller for Livestock Tracker controllers. It defines a logger reference
    /// and an easily accessible Cancellation Token.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public abstract class LivestockApiController : Controller
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">The reference to the logger.</param>
        protected LivestockApiController(ILogger logger)
        {
            Logger = logger;
        }

        /// <summary>
        /// The reference to the logger.
        /// </summary>
        protected ILogger Logger { get; }

        /// <summary>
        /// A token for operation cancellation. Just a short-cut to <see cref="HttpContext.RequestAborted"/>.
        /// </summary>
        protected CancellationToken RequestAbortToken => HttpContext.RequestAborted;
    }
}
