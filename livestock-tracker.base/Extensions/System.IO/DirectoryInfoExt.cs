namespace System.IO
{
  public static class DirectoryInfoExt
  {
    private const string EMPTY = @"E:\mpty";

    public static DirectoryInfo Null(this DirectoryInfo directoryInfo)
    {
      return new DirectoryInfo(EMPTY);
    }

    public static bool IsNull(this DirectoryInfo directoryInfo)
    {
      return directoryInfo.FullName == EMPTY;
    }
  }
}
