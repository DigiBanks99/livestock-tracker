using LivestockTracker.Abstractions;
using LivestockTracker.Abstractions.Models;
using LivestockTracker.Models.Paging;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace LivestockTracker.Logic.Utilities
{
    internal static class PaginationUtility
    {
        internal static async Task<IPagedData<TInterface>> FindAsync<TInterface, TData, TDto, TSortProperty>(IQueryable<TData> queryable,
                                                                                                             IMapper<TInterface, TDto> mapper,
                                                                                                             Expression<Func<TInterface, bool>> filter,
                                                                                                             Expression<Func<TInterface, TSortProperty>> sort,
                                                                                                             ListSortDirection sortDirection,
                                                                                                             IPagingOptions pagingOptions,
                                                                                                             CancellationToken cancellationToken)
            where TInterface : class
            where TData : class, TInterface
            where TDto : class, TInterface, new()
            where TSortProperty : IComparable
        {
            var data = queryable.ConstrainedFind(filter, sort, sortDirection, pagingOptions)
                                .Select(medicineType => mapper.Map(medicineType))
                                .ToListAsync(cancellationToken)
                                .ConfigureAwait(false);

            var totalRecordCount = queryable.CountAsync(filter, cancellationToken)
                                            .ConfigureAwait(false);

            return new PagedData<TInterface>(await data, pagingOptions.PageSize, pagingOptions.PageNumber, await totalRecordCount);
        }
    }
}
