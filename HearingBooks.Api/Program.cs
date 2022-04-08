using System.Reflection;
using HearingBooks.Api;
using HearingBooks.Api.Auth;
using HearingBooks.Api.Configuration;
using HearingBooks.Api.Speech;
using HearingBooks.Api.Storage;
using HearingBooks.Api.Syntheses;
using Infrastructure.Repositories;
using Marten;
using Marten.Events;
using Microsoft.OpenApi.Models;
using Weasel.Postgresql;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSingleton<IApiConfiguration, ApiConfiguration>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(
    c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo {Title = "HearingBooks.Api", Version = "v1"});
                
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme {
            In = ParameterLocation.Header, 
            Description = "Please insert JWT token with Bearer into field",
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey 
        });
                
        c.AddSecurityRequirement(new OpenApiSecurityRequirement {
            { 
                new OpenApiSecurityScheme 
                { 
                    Reference = new OpenApiReference 
                    { 
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer" 
                    } 
                },
                new string[] { } 
            } 
        });

        // Set the comments path for the Swagger JSON and UI.
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        c.IncludeXmlComments(xmlPath);
    }
);

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IStorageService, StorageService>();
builder.Services.AddScoped<ISpeechService, SpeechService>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<TextSynthesisService, TextSynthesisService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();


builder.Services.AddMarten(options =>
    {
        options.Connection(builder.Configuration[ConfigurationKeys.MartenConnectionString]);
        options.Events.StreamIdentity = StreamIdentity.AsGuid;
        // If we're running in development mode, let Marten just take care
        // of all necessary schema building and patching behind the scenes
        if (builder.Environment.IsDevelopment())
        {
            options.AutoCreateSchemaObjects = AutoCreate.All;
        }
    }
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json",
        $"{builder.Environment.ApplicationName} v1"));
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(x => 
    x.AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials()
);

app.UseMiddleware<JwtMiddleware>();

app.MapAuthEndpoints();
app.MapSynthesesEndpoints();

// app.MapGet("/party/events", async (IDocumentStore store) =>
// {
//     using var session = store.OpenSession();
//         var started = new QuestStarted { Name = "Destroy the One Ring" };
//         var joined1 = new MembersJoined(1, "Hobbiton", "Frodo", "Sam");
//
//         // Start a brand new stream and commit the new events as
//         // part of a transaction
//         session.Events.StartStream(typeof(QuestParty), Guid.NewGuid(), started, joined1);
//         await session.SaveChangesAsync();
//     
//     return $"Succeded: kek";
// });

// app.MapGet("/party/{questId}/state", async (IDocumentStore store, [FromQuery] Guid questId) =>
// {
//     using var session = store.OpenSession();
//     // questId is the id of the stream
//     var party = session.Events.AggregateStream<QuestParty>(questId);
//     Console.WriteLine(party);
//
//     // var party_at_version_3 = await session.Events
//     //     .AggregateStreamAsync<QuestParty>(questId, 3);
//     //
//     // var party_yesterday = await session.Events
//     //     .AggregateStreamAsync<QuestParty>(questId, timestamp: DateTime.UtcNow.AddDays(-1));
//     
//     return $"Succeded: kek";
// });

app.Run();