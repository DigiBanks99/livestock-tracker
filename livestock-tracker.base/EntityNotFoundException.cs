using System;

namespace LivestockTracker
{
  public class EntityNotFoundException<T> : Exception
  {
    public EntityNotFoundException(int id) : base($"{typeof(T).Name} with id {id} not found.")
    {
    }
  }
}
