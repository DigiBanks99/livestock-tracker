using System;
using System.ComponentModel;

namespace LivestockTracker.Abstractions
{
    /// <summary>
    /// Options relating to ordering a collection. Provide it with an enum
    /// type for filtering properties that are supported.
    /// </summary>
    /// <typeparam name="TOptions">
    /// An enum with the properties that are supported for ordering.
    /// </typeparam>
    public class OrderingOptions<TOptions> where TOptions : struct, IComparable
    {
        /// <summary>
        /// Direction to sort in: ascending or descending
        /// </summary>
        public ListSortDirection Direction { get; set; }

        /// <summary>
        /// The member of <typeparamref name="TOptions"/> that will be sorted on.
        /// </summary>
        public TOptions Property { get; set; }
    }
}
