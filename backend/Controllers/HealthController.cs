using Kent.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kent.Api.Controllers;

[ApiController]
[Route("api/health")]
public class HealthController : ControllerBase
{
    private readonly KentDbContext _dbContext;

    public HealthController(KentDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "ok",
            service = "Kent API"
        });
    }

    [HttpGet("database")]
    public async Task<IActionResult> Database()
    {
        var canConnect = await _dbContext.Database.CanConnectAsync();

        if (!canConnect)
        {
            return StatusCode(500, new
            {
                status = "error",
                database = "disconnected"
            });
        }

        return Ok(new
        {
            status = "ok",
            database = "connected"
        });
    }
}