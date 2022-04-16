using HearingBooks.Domain.Entities;
using HearingBooks.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace HearingBooks.Api.Syntheses;

public static class TextSynthesesEndpointExtensions
{
    private static readonly string _baseEndpointGroupRoute = "text-syntheses";

    public static void MapSynthesesEndpoints(this WebApplication app)
    {
        app.MapGet(
            $"/{_baseEndpointGroupRoute}",
            async (HttpContext context, ITextSynthesisRepository textSynthesisRepository) =>
            {
                var requestingUser = (User) context.Items["User"];
                
                var syntheses = await textSynthesisRepository.GetAllForUser(requestingUser.Id);
                
                return Results.Ok(syntheses);
            });
        
        app.MapPost(
            $"/{_baseEndpointGroupRoute}", 
            async ([FromServices] TextSynthesisService textSynthesisService, [FromBody] TextSyntehsisRequest request, HttpContext context) =>
            {
                // var result = await speech.SynthesizeAudioAsync();
                var requestingUser = (User) context.Items["User"];
                request.RequestingUserId = requestingUser.Id;
                
                var requestId = await textSynthesisService.CreateRequest(request);

                return Results.Created($"{requestId.ToString()}", null);
            });
    }
}