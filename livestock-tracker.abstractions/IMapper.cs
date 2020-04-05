namespace LivestockTracker.Abstractions
{
    /// <summary>
    /// An interface for providing mapping capabilities between two objects.
    /// </summary>
    /// <typeparam name="TLeft">One type of object.</typeparam>
    /// <typeparam name="TRight">Another type of object.</typeparam>
    public interface IMapper<TLeft, TRight>
        where TLeft : class
        where TRight : class
    {
        /// <summary>
        /// Transforms an instance <typeparamref name="TRight"/> into an instance <typeparamref name="TLeft"/>.
        /// </summary>
        /// <param name="right">The existing instance.</param>
        /// <returns>The instance of <typeparamref name="TLeft"/></returns>
        TLeft Map(TRight? right);

        /// <summary>
        /// Transforms an instance <typeparamref name="TLeft"/> into an instance <typeparamref name="TRight"/>.
        /// </summary>
        /// <param name="left">The existing instance.</param>
        /// <returns>The instance of <typeparamref name="TRight"/></returns>
        TRight Map(TLeft? left);
    }
}
