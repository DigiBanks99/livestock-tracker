using System;

namespace LivestockTracker
{
  public class EntityNotFoundException<T> : Exception
  {
    public EntityNotFoundException(long id) : base($"{typeof(T).Name} with id {id} not found.")
    {
    }
  }
}
