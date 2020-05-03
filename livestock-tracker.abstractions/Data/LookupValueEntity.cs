using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;

namespace LivestockTracker.Abstractions.Data
{
    /// <summary>
    /// A base for entities that will serve as lookup values.
    /// </summary>
    /// <typeparam name="TKey">The type of the key for this database model.</typeparam>
    [DebuggerDisplay("{Id} - {Description} [Deleted: {Deleted}]")]
    public abstract class LookupValueEntity<TKey> : ILookupValueEntity<TKey>
        where TKey : struct
    {
        /// <inheritdoc/>
        [Column("ID")]
        [Key]
        public TKey Id { get; set; }

        /// <inheritdoc/>
        [Required]
        public string Description { get; set; } = string.Empty;

        /// <inheritdoc/>
        [Required]
        public bool Deleted { get; set; } = false;

        /// <summary>
        /// Returns the primary key for the lookup value. <seealso cref="Id"/>.
        /// </summary>
        /// <returns>
        /// <see cref="Id"/>.
        /// </returns>
        public TKey GetKey()
        {
            return Id;
        }
    }
}
