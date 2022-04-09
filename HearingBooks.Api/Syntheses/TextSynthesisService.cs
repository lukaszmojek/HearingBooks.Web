using HearingBooks.Api.Speech;
using HearingBooks.Api.Storage;

namespace HearingBooks.Api.Syntheses;

public class TextSynthesisService
{
    private readonly IStorageService _storageService;
    private readonly ISpeechService _speechService;

    public TextSynthesisService(IStorageService storageService, ISpeechService speechService)
    {
        _storageService = storageService;
        _speechService = speechService;
    }

    public async Task<Guid> CreateRequest(TextSyntehsisRequest request)
    {
        var containerName = request.RequestingUserId.ToString();

        var blobContainerClient = await _storageService.GetBlobContainerClientAsync(containerName);

        var requestId = Guid.NewGuid();
        
        string synthesisFilePath = "";
        
        try
        {
            synthesisFilePath = await _speechService.SynthesizeAudioAsync(
                containerName,
                requestId.ToString(),
                request.TextToSynthesize
            );
        }
        catch (Exception e)
        {
            //TODO: Log exception
            throw;
        }
        finally
        {
            if (string.IsNullOrEmpty(synthesisFilePath))
            {
                File.Delete(synthesisFilePath);
            }
        }

        return requestId;
    }
}