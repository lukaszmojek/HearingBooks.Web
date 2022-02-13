using Microsoft.AspNetCore.Mvc;

namespace HearingBooks.Api.Endpoints.Syntheses;

public static class SynthesesEndpointExtensions
{
    public static void MapSynthesesEndpoints(this WebApplication app)
    {
        app.MapGet(
            "/syntheses",
            async () =>
            {
                var syntheses = new List<SynthesisDto>();
                return Task.FromResult(syntheses);
            }
        );
        
        app.MapPost(
            "/syntheses", 
            async ([FromServices] ISpeechService speech) =>
            {
                var result = await speech.SynthesizeAudioAsync();
    
                return $"Succeded: {result}";
            });
    }
}