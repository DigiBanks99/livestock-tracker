using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LivestockTracker
{
    public class AnimalNotFoundException : Exception
    {
        public AnimalNotFoundException(int id):base($"Animal with id {id} not found.")
        {
        }
    }
}
