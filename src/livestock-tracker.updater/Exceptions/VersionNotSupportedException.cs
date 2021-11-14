using System;

namespace LivestockTracker.Updater.Exceptions
{
  public class VersionNotSupportedException : Exception
  {
    public VersionNotSupportedException() : base()
    {
      UnparsableVersionString = string.Empty;
    }

    public VersionNotSupportedException(string unparsableVersionString) : base($"Unable to parse version: {unparsableVersionString}")
    {
      UnparsableVersionString = unparsableVersionString;
    }

    public string UnparsableVersionString { get; }

    public override string Message => GetDisplayableUnparsableVersionString(UnparsableVersionString);

    private static string GetDisplayableUnparsableVersionString(string unparsableVersionString)
    {
      string display = !string.IsNullOrEmpty(unparsableVersionString) ? ": " + unparsableVersionString : string.Empty;
      return $"Unable to parse version{display}";
    }
  }
}
