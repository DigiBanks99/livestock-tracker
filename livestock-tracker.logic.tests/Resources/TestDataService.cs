using LivestockTracker.Database.Test.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Collections.Generic;
using System.IO;

namespace LivestockTracker.Database.Test.Resources
{
  public static class TestDataService
  {
    private const string TestEntityData = @"Resources/TestEntityData.json";

    private static List<TestEntity>? _testEntities;
    public static List<TestEntity> TestEntities
    {
      get
      {
        if (_testEntities == null)
        {
          _testEntities = ReadDataFromFile<List<TestEntity>>(TestEntityData);
        }

        return _testEntities;
      }
    }

    private static T ReadDataFromFile<T>(string filePath)
    {
      var json = File.ReadAllText(filePath);
      return JsonConvert.DeserializeObject<T>(json, new StringEnumConverter());
    }
  }
}
