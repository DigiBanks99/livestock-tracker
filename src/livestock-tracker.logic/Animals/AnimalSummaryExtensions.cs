using System.ComponentModel;
using System.Linq.Expressions;
using LivestockTracker.Abstractions;

namespace LivestockTracker.Animals;

/// <summary>
///     Extension methods for <see cref="AnimalSummary" /> items.
/// </summary>
public static class AnimalSummaryExtensions
{
    /// <summary>
    ///     Map an <see cref="IQueryable" /> of <see cref="Animal" /> items to an
    ///     <see cref="IQueryable" /> of <see cref="AnimalSummary" /> items
    /// </summary>
    /// <param name="query">The <see cref="IQueryable" /> of <see cref="Animal" /> items.</param>
    /// <returns>The <see cref="IQueryable" /> of <see cref="AnimalSummary" /> items.</returns>
    public static IQueryable<AnimalSummary> SelectAnimalSummaries(this IQueryable<Animal> query)
    {
        return query.Select(animal => new AnimalSummary
        (
            animal.Id,
            animal.Archived,
            animal.Number,
            animal.Type,
            animal.Subspecies,
            animal.Sold,
            animal.Deceased,
            animal.BirthDate
        ));
    }

    /// <summary>
    ///     Order an <see cref="IQueryable" /> of <see cref="AnimalSummary" /> items according
    ///     to the <paramref name="orderingOptions" />.
    /// </summary>
    /// <param name="query">The <see cref="IQueryable" /> of <see cref="AnimalSummary" /> items.</param>
    /// <param name="orderingOptions">Options for ordering the result set.</param>
    /// <returns>The <see cref="IOrderedQueryable" /> of <see cref="AnimalSummary" /> items.</returns>
    public static IOrderedQueryable<Animal> Order(this IQueryable<Animal> query,
        OrderingOptions<AnimalOrderType>? orderingOptions)
    {
        if (orderingOptions == null)
        {
            return query.OrderBy(animal => animal.Number);
        }

        return orderingOptions.Direction == ListSortDirection.Ascending
            ? query.OrderBy(GetOrderKeyExpression(orderingOptions.Property))
            : query.OrderByDescending(GetOrderKeyExpression(orderingOptions.Property));
    }

    private static Expression<Func<Animal, object>> GetOrderKeyExpression(AnimalOrderType orderType)
    {
        return orderType switch
        {
            AnimalOrderType.AnimalType => animal => animal.Type,
            AnimalOrderType.BirthDate => animal => animal.BirthDate,
            _ => animal => animal.Number
        };
    }
}
