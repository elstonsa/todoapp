using HotChocolate.Types;
using TodoApi.Models;
using TodoApi.Data;

public class TaskItemType : ObjectType<TaskItem>
{
    protected override void Configure(IObjectTypeDescriptor<TaskItem> descriptor)
    {
            descriptor.ImplementsNode()
                .IdField(t => t.NodeId)
                .ResolveNode((ctx, id) =>
                {
                    var db = ctx.Service<AppDbContext>();
                    var intId = DecodeNodeId(id);
                    return db.Tasks.FindAsync(intId).AsTask();
                });

            // Expose 'id' field as required by HotChocolate, mapped to NodeId
            descriptor.Field("id")
                .Type<NonNullType<IdType>>()
                .Resolve(ctx => ctx.Parent<TaskItem>().NodeId);

            descriptor.Field(t => t.Title);
            descriptor.Field(t => t.Description);
            descriptor.Field(t => t.Status);
            // Do not ignore Id, allow internal use
    }

    private static int DecodeNodeId(string nodeId)
    {
        var decoded = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(nodeId));
        var parts = decoded.Split(':');
        return int.Parse(parts[1]);
    }
}
