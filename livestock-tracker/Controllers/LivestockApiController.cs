using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading;

namespace LivestockTracker.Controllers
{
    [Produces("application/json")]
    [ApiController]
    public class LivestockApiController : Controller
    {
        public LivestockApiController(ILogger logger)
        {
            Logger = logger;
        }

        protected ILogger Logger { get; }
        protected CancellationToken RequestAbortToken => HttpContext.RequestAborted;
    }
}
