using LivestockTracker.Abstractions.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LivestockTracker.Animals
{
    /// <summary>
    /// Provides filtering functionality for <see cref="AnimalSummary"/> items.
    /// </summary>
    public class AnimalSummaryFilter : IQueryableFilter<AnimalSummary>
    {
        /// <summary>
        /// Whether to include archived items.
        /// </summary>
        public bool? IncludeArchived { get; set; }

        /// <inheritdoc/>
        public IQueryable<AnimalSummary> Filter(IQueryable<AnimalSummary> query)
        {
            if (!IncludeArchived.HasValue || !IncludeArchived.Value)
            {
                return query.Where(animal => !animal.Archived);
            }

            return query;
        }
    }
}
