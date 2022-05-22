using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WhatsdownAPI.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<WhatsdownAPIContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("WhatsdownAPIContext") ?? throw new InvalidOperationException("Connection string 'WhatsdownAPIContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//Session 29:20
/*
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(10);
});

//Login  48:20
 builder.Services.AddAuthentication(options =>
 {
     options.DefaultScheme = CookieAuthenticationDefaults.auth
 })

*/

//Login  48:20

var app = builder.Build();
app.UseCors(x => x
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true) // allow any origin
                    .AllowCredentials()); // allow credentials
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//app.UseSession(); //29:30
app.UseAuthorization();

app.MapControllers();

app.Run();
