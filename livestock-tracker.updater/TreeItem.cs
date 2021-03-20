namespace LivestockTracker.Updater
{
    public record TreeItem<TEntity>
    {
        public string Value { get; set; }
        public string Parent { get; set; }

        public TreeItem(string value, string parent)
        {
            Value = value;
            Parent = parent;
        }
    }
}
