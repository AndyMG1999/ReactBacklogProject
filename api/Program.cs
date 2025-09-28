using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.OpenApi.Models;
using api.Contexts;
using api.Hubs;
using Microsoft.AspNetCore.Identity;
using api.Interfaces;
using api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR();
builder.Services.AddAuthorization();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:5173"));
});

// builder.Services.AddDbContext<DatabaseContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure your DbContext to use the in-memory database
builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseInMemoryDatabase("inMemoryDb"));
builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddEntityFrameworkStores<DatabaseContext>();

builder.Services.AddScoped<IEmailServices, EmailServices>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

    // Adding Tags
    db.Tags.Add(new Tag {TagName = "Music🎵" });
    db.Tags.Add(new Tag {TagName = "All Seven Seas🍾" });
    db.Tags.Add(new Tag {TagName = "Video Games🎮" });
    db.Tags.Add(new Tag {TagName = "Rock 🎸" });
    db.Tags.Add(new Tag {TagName = "Alternative 🎧" });

    // Adding Posts
    db.Posts.Add(new Post {PostTitle = "My first post in rainy day", PostBody = "I lowkey don't really know what to write, but glad to say hi to everyone!",});
    db.Posts.Add(new Post {PostTitle = "Song suggestions for shoegaze?", PostBody = "I've just got into some shoegaze artists and was wondering if anybody had any artists that sound like this." });
    db.Posts.Add(new Post {PostTitle = "NEW 2XKO TRAILER!!!", PostBody = "" });

    // Adding Attachments
    db.Attachments.Add(new Attachment { PostID = 2, AttachmentType = AttachmentTypes.Souncloudlink, AttachmentLink="<iframe width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1487715388&color=%23ffffff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe><div style=\"font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;\"><a href=\"https://soundcloud.com/aidenhe\" title=\"aidenh\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">aidenh</a> · <a href=\"https://soundcloud.com/aidenhe/my-bloody-valentine-when-you-sleep\" title=\"my bloody valentine - when you sleep\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">my bloody valentine - when you sleep</a></div>"});
    db.Attachments.Add(new Attachment { PostID = 3, AttachmentType = AttachmentTypes.YoutubeLink, AttachmentLink = "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/quGZjIkigu4?si=wN5HBxYmtnr2bnUz\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>" });

    db.SaveChanges();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("api/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.RequireAuthorization();

app.UseCors();
app.MapControllers();

// Map Hubs From SignalR Here
app.MapHub<TestHub>("/testhub");
// Map Identity Models Here
// Replace "IdentityUser" With Custom Identity Model When Ready
//app.MapIdentityApi<AppUser>();
app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
