using HearingBooks.Domain.Entities;
using HearingBooks.Persistance;
using Microsoft.AspNetCore.Mvc;

namespace HearingBooks.Api.Seed;

public static class SeedEndpointExtensions
{
    private static readonly string _baseEndpointGroupRoute = "seed";

    public static void MapSeedEndpoints(this WebApplication app)
    {
        app.MapGet(
            $"/{_baseEndpointGroupRoute}",
            async ([FromServices] HearingBooksDbContext context) =>
            {
                var languages = new List<Language>
                {
                    new() {
                        Id = Guid.NewGuid(),
                        Name = "Polish",
                        Symbol = "pl-PL",
                        Voices = new []
                        {
                            new Voice
                            {
                                Id = Guid.NewGuid(),
                                Name = "pl-PL-AgnieszkaNeural",
                                DisplayName = "Amber",
                                Type = VoiceType.Female,
                                IsMultilingual = false
                            },
                            new Voice
                            {
                                Id = Guid.NewGuid(),
                                Name = "pl-PL-ZofiaNeural",
                                DisplayName = "Zofia",
                                Type = VoiceType.Female,
                                IsMultilingual = false
                            },
                            new Voice
                            {
                                Id = Guid.NewGuid(),
                                Name = "pl-PL-MarekNeural",
                                DisplayName = "Marek",
                                Type = VoiceType.Male,
                                IsMultilingual = false
                            },
                        }
                    },
                    new() {
                        Id = Guid.NewGuid(),
                        Name = "English",
                        Symbol = "en-US",
                        Voices = new []
                        {
                            new Voice
                            {
                                Id = Guid.NewGuid(),
                                Name = "en-US-AmberNeural",
                                DisplayName = "Amber",
                                Type = VoiceType.Female,
                                IsMultilingual = false
                            },
                            new Voice
                            {
                                Id = Guid.NewGuid(),
                                Name = "en-US-AriaNeural",
                                DisplayName = "Aria",
                                Type = VoiceType.Female,
                                IsMultilingual = false
                            },
                            new Voice
                            {
                                Id = Guid.NewGuid(),
                                Name = "en-US-JennyMultilingualNeural",
                                DisplayName = "Jenny",
                                Type = VoiceType.Female,
                                IsMultilingual = true
                            },
                            new Voice
                            {
                                Id = Guid.NewGuid(),
                                Name = "en-US-AnaNeural",
                                DisplayName = "Ana",
                                Type = VoiceType.Kid,
                                IsMultilingual = false
                            },
                            new Voice
                            {
                                Id = Guid.NewGuid(),
                                Name = "en-US-BrandonNeural",
                                DisplayName = "Brandon",
                                Type = VoiceType.Male,
                                IsMultilingual = false
                            },
                            new Voice
                            {
                                Id = Guid.NewGuid(),
                                Name = "en-US-ChristopherNeural",
                                DisplayName = "Christopher",
                                Type = VoiceType.Male,
                                IsMultilingual = false
                            },
                            new Voice
                            {
                                Id = Guid.NewGuid(),
                                Name = "en-US-JacobNeural",
                                DisplayName = "Jacob",
                                Type = VoiceType.Male,
                                IsMultilingual = false
                            },
                        }
                    }
                };
                
                await context.Languages.AddRangeAsync(languages);
                await context.SaveChangesAsync();
                
                return Results.Ok();
            });
    }
}