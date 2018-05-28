using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LivestockTracker.Database
{
    public interface IEntity
    {
        int ID { get; set; }
    }
}
