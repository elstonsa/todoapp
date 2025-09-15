using Xunit;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;
using TodoApi.GraphQL;
using System.Threading.Tasks;

namespace TodoApi.Tests
{
    public class MutationTests
    {
        [Fact]
        public async Task CreateTask_AddsTaskToDatabase()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb_Create")
                .Options;
            using var db = new AppDbContext(options);
            var mutation = new Mutation();
            var task = await mutation.CreateTask("New Task", "Test Desc", "Pending", db);
            Assert.NotNull(task);
            Assert.Equal("New Task", task.Title);
            Assert.Single(db.Tasks);
        }

        [Fact]
        public async Task UpdateTaskStatus_UpdatesStatus()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb_Update")
                .Options;
            using var db = new AppDbContext(options);
            var task = new TaskItem { Title = "Task", Description = "Desc", Status = "Pending" };
            db.Tasks.Add(task);
            await db.SaveChangesAsync();
            var mutation = new Mutation();
            var updated = await mutation.UpdateTaskStatus(task.NodeId, "Completed", db);
            Assert.NotNull(updated);
            Assert.Equal("Completed", updated.Status);
        }
    }
}
