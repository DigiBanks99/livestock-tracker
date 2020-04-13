using System;

namespace LivestockTracker.Abstractions.Data
{
    /// <summary>
    /// An interface for providing seeding functionality for master data.
    /// </summary>
    public interface ISeedData
    {
        /// <summary>
        /// Seed the database with master data.
        /// </summary>
        /// <param name="serviceProvider">The container resolver.</param>
        void Seed(IServiceProvider serviceProvider);
    }
}
