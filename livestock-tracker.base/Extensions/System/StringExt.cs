using System.Text.RegularExpressions;

namespace LivestockTracker.Base.Extensions.System
{
  public static class StringExt
  {
    public static string SplitCamelCase(this string camelCase)
    {
      return Regex.Replace(camelCase, "([A-Z])", " $1", RegexOptions.Compiled).Trim();
    }
  }
}
