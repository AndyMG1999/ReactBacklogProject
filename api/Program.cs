using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.OpenApi.Models;
using api.Contexts;
using api.Hubs;
using api.Models.ModelEnums;
using api.Interfaces;
using api.Services;
using Microsoft.AspNetCore.Identity;

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
builder.Services.AddScoped<ILinkServices, LinkServices>();

var app = builder.Build();

using var scope = app.Services.CreateScope();
{
    var db = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
    // Clear and recreates db schema
    db.Database.EnsureDeleted();
    db.Database.EnsureCreated();
    
    // Creating Fake Users
    AppUser user1 = new AppUser { Id = "1", UserName = "HappyUser", ProfileImage = null };
    AppUser user2 = new AppUser { Id = "2", UserName = "MusicUser", ProfileImage = null };
    AppUser user3 = new AppUser { Id = "3", UserName = "roblox_enjoyer197", ProfileImage = null };
    AppUser user4 = new AppUser { Id = "4", UserName = "apiP0pperz", ProfileImage = null };
    AppUser user5 = new AppUser { Id = "5", UserName = "TiredSoftwareDev", ProfileImage = null };

    // Adding Tags
    Tag tag1 = new() { ID=1, TagName="🍾 All Seven Seas", PostsTaggedCount=456121 };
    Tag tag2 = new() { ID=2, TagName="🎵Music🎵" , PostsTaggedCount=62123};
    Tag tag3 = new() { ID=3, TagName="🎸 Shoegaze", PostsTaggedCount=3011 };
    Tag tag4 = new() { ID=4, TagName="🎮Video Games", PostsTaggedCount=2100093 };
    Tag tag5 = new() { ID=5, TagName="Fighting Games🥊🥋🦶", PostsTaggedCount=103072 };
    Tag tag6 = new() { ID = 6, TagName = "🗣️General🗣️" };

    // Adding Posts
    Post post1 = new () { PostTitle = "My first post here!", PostBody = "I lowkey don't really know what to write, but glad to say hi to everyone!", CreatedBy = user1, DateCreated = DateTime.UtcNow, LastEdit = DateTime.UtcNow, PostTags = [tag1], };
    Post post2 = new() { PostTitle = "Song suggestions for shoegaze?", PostBody = "I've just got into some shoegaze artists and was wondering if anybody had any artists that sound like this.", CreatedBy = user2, DateCreated = new DateTime(2001,01,01), LastEdit = DateTime.UtcNow, PostTags = [tag2, tag3], };
    Post post3 = new() { PostTitle = "NEW 2XKO TRAILER!!!", PostBody = "", CreatedBy = user3, DateCreated = new DateTime(2025,10,16), LastEdit = DateTime.UtcNow, PostTags = [tag4, tag5] };
    Post post4 = new() { PostTitle = "Anybody have any recommendations for games like Animal Crossing?", PostBody = "I'm not a big fan of the \"farm-type\" cozy games since I never really like the farming systems.\n Kinda looking for a game that has that has the focus on camping and building that ACNH has. I already know about cozy grove btw...", CreatedBy = user3, DateCreated = new DateTime(2025,10,06), LastEdit = DateTime.UtcNow, PostTags = [tag4], };
    Post post5 = new() { PostTitle = "2XKO Character Select Sound Crazy", PostBody = "I don't normally play games but this is pretty good, reminds me a lot of Polyphia and their blend of genres.", CreatedBy = user2, DateCreated = DateTime.UtcNow, LastEdit = DateTime.UtcNow, PostTags = [tag2, tag4, tag5], };
    Post post6 = new() { PostTitle = "rec. for music like \"No Vacation\"", PostBody = "herd it was called like bedroom rock, anything similar will be appreciated", CreatedBy = user4, DateCreated = DateTime.UtcNow, LastEdit = DateTime.UtcNow, PostTags = [tag2], };
    Post post7 = new() { PostTitle = "Goated Video", PostBody = "I'm sure everybody knows about this beef already, but still highly recommend if you want a deep dive about it.", CreatedBy = user5, DateCreated = DateTime.UtcNow, LastEdit = DateTime.UtcNow, PostTags = [tag1], };

    db.Posts.AddRange(post1, post2, post3, post4, post5, post6, post7);
    db.AddRange(tag1, tag2, tag3, tag4, tag5, tag6);

    // Adding Attachments
    db.Attachments.Add(new Attachment { PostID = 2, AttachmentType = AttachmentTypes.Souncloudlink, AttachmentLink = "<iframe width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1487715388&color=%23ffffff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true\"></iframe><div style=\"font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;\"><a href=\"https://soundcloud.com/aidenhe\" title=\"aidenh\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">aidenh</a> · <a href=\"https://soundcloud.com/aidenhe/my-bloody-valentine-when-you-sleep\" title=\"my bloody valentine - when you sleep\" target=\"_blank\" style=\"color: #cccccc; text-decoration: none;\">my bloody valentine - when you sleep</a></div>" });
    db.Attachments.Add(new Attachment { PostID = 3, AttachmentType = AttachmentTypes.YoutubeLink, AttachmentLink = """<iframe width="560" height="315" src="https://www.youtube.com/embed/A8-Uw_sypMs?si=zWDXkob2lYTlEtjW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>""" });
    db.Attachments.Add(new Attachment { PostID = 5, AttachmentType = AttachmentTypes.Souncloudlink, AttachmentLink = """ <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1914713420&color=%23ffffff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/scyth333" title="SCYTH3" target="_blank" style="color: #cccccc; text-decoration: none;">SCYTH3</a> · <a href="https://soundcloud.com/scyth333/2xko-alpha-lab-ost-champ" title="2XKO ALPHA LAB OST | CHAMP SELECT" target="_blank" style="color: #cccccc; text-decoration: none;">2XKO ALPHA LAB OST | CHAMP SELECT</a></div> """ });
    db.Attachments.Add(new Attachment { PostID = 6, AttachmentType = AttachmentTypes.Souncloudlink, AttachmentLink = """ <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A353198318&color=%23ffffff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/no-vacation" title="No Vacation" target="_blank" style="color: #cccccc; text-decoration: none;">No Vacation</a> · <a href="https://soundcloud.com/no-vacation/reaper" title="Reaper" target="_blank" style="color: #cccccc; text-decoration: none;">Reaper</a></div> """ });
    db.Attachments.Add(new Attachment { PostID = 7, AttachmentType = AttachmentTypes.YoutubeLink, AttachmentLink = """ <iframe width="560" height="315" src="https://www.youtube.com/embed/AEsf7QmIJTQ?si=K5oippjO-kDWBV3j" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> """ });
    
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
            DateOnly.FromDateTime(DateTime.UtcNow.AddDays(index)),
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
