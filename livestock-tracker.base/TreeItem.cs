namespace LivestockTracker.Base
{
  public class TreeItem<T>
  {
    public TreeItem()
    {

    }

    public TreeItem(T value, T parent)
    {
      Value = value;
      Parent = parent;
    }

    public T Value { get; set; }
    public T Parent { get; set; }
  }
}
