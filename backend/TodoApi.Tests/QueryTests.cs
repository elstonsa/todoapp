using Xunit;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;
using TodoApi.GraphQL;
using System.Threading.Tasks;
using System.Linq;

namespace TodoApi.Tests
{
    public class QueryTests
    {
        [Fact]
        public async Task GetAllTasks_ReturnsAllTasks()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;
            using var db = new AppDbContext(options);
            db.Tasks.Add(new TaskItem { Title = "Test1", Description = "Desc1", Status = "Pending" });
            db.Tasks.Add(new TaskItem { Title = "Test2", Description = "Desc2", Status = "Completed" });
            await db.SaveChangesAsync();

            var query = new Query();
            var result = await query.GetAllTasks(db);

            Assert.Equal(2, result.Count);
            Assert.Contains(result, t => t.Title == "Test1");
            Assert.Contains(result, t => t.Title == "Test2");
        }
    }
}
