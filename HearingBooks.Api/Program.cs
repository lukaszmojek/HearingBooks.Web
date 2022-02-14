using HearingBooks.Api;
using HearingBooks.Api.Endpoints.Syntheses;
using HearingBooks.Domain.Events;
using Marten;
using Marten.Events;
using Microsoft.AspNetCore.Mvc;
using Weasel.Postgresql;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IStorageService, StorageService>();
builder.Services.AddScoped<ISpeechService, SpeechService>();

builder.Services.AddMarten(options =>
    {
        // Establish the connection string to your Marten database
        options.Connection(builder.Configuration[ConfigurationKeys.MartenConnectionString]);
        options.Events.StreamIdentity = StreamIdentity.AsGuid;
        // If we're running in development mode, let Marten just take care
        // of all necessary schema building and patching behind the scenes
#if DEBUG
        // if (Environment.IsDevelopment())
        {
            options.AutoCreateSchemaObjects = AutoCreate.All;
        }
#endif
    }
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

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