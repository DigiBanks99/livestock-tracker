using LivestockTracker.Abstractions.Models;
using System.Collections.Generic;
using System.Linq;

namespace LivestockTracker.Models.Paging
{
    internal class NullPagedDataImpl<TData> : IPagedData<TData>
        where TData : class
    {
        public IEnumerable<TData> Data => Enumerable.Empty<TData>();

        public int PageSize => 0;

        public int CurrentPage => 0;

        public long TotalRecordCount => 0;
    }

    /// <summary>
    /// A Null Object Pattern implementation of <see cref="IPagedData{TData}" />.
    /// </summary>
    public static class NullPagedData
    {
        /// <summary>
        /// Creates a null instance of <see cref="IPagedData{TData}"/> for the specified type.
        /// </summary>
        /// <typeparam name="TData">The type for the data.</typeparam>
        /// <returns>A null version of <see cref="IPagedData{TData}"/>.</returns>
        public static IPagedData<TData> Create<TData>() where TData : class
        {
            return new NullPagedDataImpl<TData>();
        }
    }
}
