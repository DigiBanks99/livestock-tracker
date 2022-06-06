namespace Microsoft.Extensions.Hosting;

/// <summary>
/// Extension methods for Microsoft.Extensions.Hosting.IHostEnvironment.
/// </summary>
public static class HostEnvironmentExtensions
{
    /// <summary>
    /// Checks if the current host environment name is <see cref="Environments.Development"/>.
    /// </summary>
    /// <param name="hostEnvironment">
    /// An instance of <see cref="IHostEnvironment"/>.
    /// </param>
    /// <returns>
    /// True if the environment name is <see cref="Environments.Development"/>,
    /// otherwise false.
    /// </returns>
    public static bool IsDev(this IHostEnvironment hostEnvironment)
    {
        return hostEnvironment.IsDevelopment() ||
               hostEnvironment.IsE2E() ||
               hostEnvironment.IsTest();
    }

    /// <summary>
    /// Checks if the current host environment name is <see cref="CustomEnvironments.E2E"/>.
    /// </summary>
    /// <param name="hostEnvironment">
    /// An instance of <see cref="IHostEnvironment"/>.
    /// </param>
    /// <returns>
    /// True if the environment name is <see cref="CustomEnvironments.E2E"/>,
    /// otherwise false.
    /// </returns>
    public static bool IsE2E(this IHostEnvironment hostEnvironment)
    {
        return hostEnvironment.IsEnvironment(CustomEnvironments.E2E);
    }

    /// <summary>
    /// Checks if the current host environment name is <see cref="CustomEnvironments.Test"/>.
    /// </summary>
    /// <param name="hostEnvironment">
    /// An instance of <see cref="IHostEnvironment"/>.
    /// </param>
    /// <returns>
    /// True if the environment name is <see cref="CustomEnvironments.Test"/>,
    /// otherwise false.
    /// </returns>
    public static bool IsTest(this IHostEnvironment hostEnvironment)
    {
        return hostEnvironment.IsEnvironment(CustomEnvironments.Test);
    }
}

/// <summary>
/// Custom environment names.
/// </summary>
public static class CustomEnvironments
{
    /// <summary>
    /// E2E
    /// </summary>
    public const string E2E = "E2E";

    /// <summary>
    /// Test
    /// </summary>
    public const string Test = "Test";
}
