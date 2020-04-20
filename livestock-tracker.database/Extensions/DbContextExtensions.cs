using LivestockTracker.Abstractions.Models;
using System;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;

namespace Microsoft.EntityFrameworkCore
{
    /// <summary>
    /// Defines extensions for DbContext
    /// </summary>
    public static class DbContextExtensions
    {
        /// <summary>
        /// Finds entities that match the given filter, sorted by the criteria given and paginated
        /// by the given pagination options.
        /// </summary>
        /// <typeparam name="TEntity">The type that identifies the entity required.</typeparam>
        /// <typeparam name="TSortProperty">The type of the sorting property on the entity.</typeparam>
        /// <param name="dbContext">The <see cref="DbContext"/> that contains the desired entity set.</param>
        /// <param name="filter">The filter that will be applied.</param>
        /// <param name="sort">The sort condition.</param>
        /// <param name="sortDirection">Whether to sort Ascending or Descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <returns>The filtered, sorted and paged enumerable collection of entities.</returns>
        public static IQueryable<TEntity> ConstrainedFind<TEntity, TSortProperty>(this DbContext dbContext,
                                                                                  Expression<Func<TEntity, bool>> filter,
                                                                                  Expression<Func<TEntity, TSortProperty>> sort,
                                                                                  ListSortDirection sortDirection,
                                                                                  IPagingOptions pagingOptions)
            where TEntity : class
        {
            return dbContext.ConstrainedFind(filter, sort, sortDirection)
                            .Skip(pagingOptions.Offset)
                            .Take(pagingOptions.PageSize);
        }

        /// <summary>
        /// Finds entities that match the given filter, sorted by the criteria.
        /// </summary>
        /// <typeparam name="TEntity">The type that identifies the entity required.</typeparam>
        /// <typeparam name="TSortProperty">The type of the sorting property on the entity.</typeparam>
        /// <param name="dbContext">The <see cref="DbContext"/> that contains the desired entity set.</param>
        /// <param name="filter">The filter that will be applied.</param>
        /// <param name="sort">The sort condition.</param>
        /// <param name="sortDirection">Whether to sort Ascending or Descending.</param>
        /// <returns>The filtered, sorted and paged enumerable collection of entities.</returns>
        public static IQueryable<TEntity> ConstrainedFind<TEntity, TSortProperty>(this DbContext dbContext,
                                                                                  Expression<Func<TEntity, bool>> filter,
                                                                                  Expression<Func<TEntity, TSortProperty>> sort,
                                                                                  ListSortDirection sortDirection)
            where TEntity : class
        {
            var query = dbContext.Set<TEntity>().Where(filter);

            return sortDirection == ListSortDirection.Ascending ?
                query.OrderBy(sort) :
                query.OrderByDescending(sort);
        }

        /// <summary>
        /// Finds entities that match the given filter, sorted by the criteria and paginated
        /// by the given pagination options.
        /// </summary>
        /// <typeparam name="TEntity">The type that identifies the entity required.</typeparam>
        /// <typeparam name="TSortProperty">The type of the sorting property on the entity.</typeparam>
        /// <param name="dbSet">The <see cref="IQueryable{TEntity}"/> that will be further constrained.</param>
        /// <param name="filter">The filter that will be applied.</param>
        /// <param name="sort">The sort condition.</param>
        /// <param name="sortDirection">Whether to sort Ascending or Descending.</param>
        /// <param name="pagingOptions">The options for pagination.</param>
        /// <returns>The filtered, sorted and paged enumerable collection of entities.</returns>
        public static IQueryable<TEntity> ConstrainedFind<TEntity, TSortProperty>(this IQueryable<TEntity> query,
                                                                                  Expression<Func<TEntity, bool>> filter,
                                                                                  Expression<Func<TEntity, TSortProperty>> sort,
                                                                                  ListSortDirection sortDirection,
                                                                                  IPagingOptions pagingOptions)
            where TEntity : class
        {
            return query.ConstrainedFind(filter, sort, sortDirection)
                        .Skip(pagingOptions.Offset)
                        .Take(pagingOptions.PageSize);
        }

        /// <summary>
        /// Finds entities that match the given filter, sorted by the criteria.
        /// by the given pagination options.
        /// </summary>
        /// <typeparam name="TEntity">The type that identifies the entity required.</typeparam>
        /// <typeparam name="TSortProperty">The type of the sorting property on the entity.</typeparam>
        /// <param name="dbSet">The <see cref="IQueryable{TEntity}"/> that will be further constrained.</param>
        /// <param name="filter">The filter that will be applied.</param>
        /// <param name="sort">The sort condition.</param>
        /// <param name="sortDirection">Whether to sort Ascending or Descending.</param>
        /// <returns>The filtered and sorted enumerable collection of entities.</returns>
        public static IQueryable<TEntity> ConstrainedFind<TEntity, TSortProperty>(this IQueryable<TEntity> query,
                                                                                  Expression<Func<TEntity, bool>> filter,
                                                                                  Expression<Func<TEntity, TSortProperty>> sort,
                                                                                  ListSortDirection sortDirection)
            where TEntity : class
        {
            query = query.Where(filter);

            return sortDirection == ListSortDirection.Ascending ?
                query.OrderBy(sort) :
                query.OrderByDescending(sort);
        }
    }
}
