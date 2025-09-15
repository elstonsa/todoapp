using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.GraphQL
{
    public class Mutation
    {
        public async Task<TaskItem> CreateTask(string title, string description, string status, [Service] AppDbContext db)
        {
            var task = new TaskItem { Title = title, Description = description, Status = status };
            db.Tasks.Add(task);
            await db.SaveChangesAsync();
            return task;
        }
        [NodeResolver]
        public async Task<TaskItem?> UpdateTaskStatus(string id, string status, [Service] AppDbContext db)
        {
            // Decode NodeId to int
            var decoded = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(id));
            var parts = decoded.Split(':');
            if (parts.Length != 2 || parts[0] != "TaskItem") return null;
            if (!int.TryParse(parts[1], out int intId)) return null;

            var task = await db.Tasks.FindAsync(intId);
            if (task == null) return null;
            task.Status = status;
            await db.SaveChangesAsync();
            return task;
        }
    }
}
