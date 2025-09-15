using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.GraphQL;

var builder = WebApplication.CreateBuilder(args);

// Configure EF Core with SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=tasks.db"));

// Add CORS services to allow any origin
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add GraphQL services
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddType<TaskItemType>()
    .AddGlobalObjectIdentification(); // Use this for Relay Node support


var app = builder.Build();

// Ensure database is created
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.EnsureCreated();
}
app.UseCors("AllowAll");
app.MapGraphQL("/graphql");

app.Run();
