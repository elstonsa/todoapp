using TodoApi.Data;
using TodoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.GraphQL
{
    public class Query
    {
        public async Task<List<TaskItem>> GetAllTasks([Service] AppDbContext db)
        {
            return await db.Tasks.ToListAsync();
        }
    }
}
