using Microsoft.AspNetCore.Mvc;

namespace HearingBooks.Api.Syntheses;

public static class TextSynthesesEndpointExtensions
{
    private static readonly string _baseEndpointGroupRoute = "text-syntheses";

    public static void MapSynthesesEndpoints(this WebApplication app)
    {
        app.MapGet(
            $"/{_baseEndpointGroupRoute}",
            async () =>
            {
                var syntheses = new List<TextSynthesisDto>();
                
                return Task.FromResult(syntheses);
            });
        
        app.MapPost(
            $"/{_baseEndpointGroupRoute}", 
            async ([FromServices] TextSynthesisService textSynthesisService, [FromBody] TextSyntehsisRequest request) =>
            {
                // var result = await speech.SynthesizeAudioAsync();
                await textSynthesisService.CreateRequest(request);
                
                return $"Succeded: ";
            });
    }
}