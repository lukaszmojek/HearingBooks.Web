using Microsoft.AspNetCore.Mvc;

namespace HearingBooks.Api.Syntheses;

public static class SynthesesEndpointExtensions
{
    private class TextSyntehsisRequest
    {
        public string Title { get; set; }
        public string Content { get; set; }
    }
    
    public static void MapSynthesesEndpoints(this WebApplication app)
    {
        app.MapGet(
            "/syntheses",
            async () =>
            {
                var syntheses = new List<SynthesisDto>();
                return Task.FromResult(syntheses);
            });
        
        app.MapPost(
            "/syntheses/text", 
            async ([FromServices] ISpeechService speech, [FromBody] TextSyntehsisRequest request) =>
            {
                var result = await speech.SynthesizeAudioAsync();
    
                return $"Succeded: {result}";
            });
    }
}