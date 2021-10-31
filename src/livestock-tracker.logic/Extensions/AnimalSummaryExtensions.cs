using LivestockTracker.Abstractions;
using LivestockTracker.Database.Models.Animals;
using System;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;

namespace LivestockTracker.Animals
{
    /// <summary>
    /// Extension methods for <see cref="AnimalSummary"/> items.
    /// </summary>
    public static class AnimalSummaryExtensions
    {
        /// <summary>
        /// Map an <see cref="IQueryable"/> of <see cref="AnimalModel"/> items to an
        /// <see cref="IQueryable"/> of <see cref="AnimalSummary"/> items
        /// </summary>
        /// <param name="query">The <see cref="IQueryable"/> of <see cref="AnimalModel"/> items.</param>
        /// <returns>The <see cref="IQueryable"/> of <see cref="AnimalSummary"/> items.</returns>
        public static IQueryable<AnimalSummary> SelectAnimalSummaries(this IQueryable<AnimalModel> query)
        {
            return query.Select(animal => new AnimalSummary
            {
                Archived = animal.Archived,
                BirthDate = animal.BirthDate,
                Deceased = animal.Deceased,
                Id = animal.Id,
                Number = animal.Number,
                Sold = animal.Sold,
                Subspecies = animal.Subspecies,
                Type = animal.Type
            });
        }

        /// <summary>
        /// Order an <see cref="IQueryable"/> of <see cref="AnimalSummary"/> items according
        /// to the <paramref name="orderingOptions"/>.
        /// </summary>
        /// <param name="query">The <see cref="IQueryable"/> of <see cref="AnimalSummary"/> items.</param>
        /// <param name="orderingOptions">Options for ordering the result set.</param>
        /// <returns>The <see cref="IOrderedQueryable"/> of <see cref="AnimalSummary"/> items.</returns>
        public static IOrderedQueryable<AnimalSummary> Order(this IQueryable<AnimalSummary> query, OrderingOptions<AnimalOrderType>? orderingOptions)
        {
            if (orderingOptions == null)
            {
                return query.OrderBy(animal => animal.Number);
            }

            return orderingOptions.Direction == ListSortDirection.Ascending
                 ? query.OrderBy(GetOrderKeyExpression(orderingOptions.Property))
                 : query.OrderByDescending(GetOrderKeyExpression(orderingOptions.Property));
        }

        private static Expression<Func<AnimalSummary, object>> GetOrderKeyExpression(AnimalOrderType orderType)
        {
            return orderType switch
            {
                AnimalOrderType.AnimalType => animal => animal.Type,
                AnimalOrderType.BirthDate => animal => animal.BirthDate,
                _ => animal => animal.Number,
            };
        }
    }
}
