using Kent.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var connectionString =
    builder.Configuration.GetConnectionString("KentDb")
    ?? throw new InvalidOperationException(
        "Connection string 'KentDb' was not found."
    );

builder.Services.AddDbContext<KentDbContext>(options =>
{
    options.UseNpgsql(connectionString);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Kent API v1");
    });
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();