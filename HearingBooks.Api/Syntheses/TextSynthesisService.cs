using HearingBooks.Api.Speech;
using HearingBooks.Api.Storage;
using HearingBooks.Domain.Entities;
using Marten;

namespace HearingBooks.Api.Syntheses;

public class TextSynthesisService
{
    private readonly IStorageService _storageService;
    private readonly IFileService _fileService;
    private readonly ISpeechService _speechService;

    public TextSynthesisService(IStorageService storageService, IFileService fileService, ISpeechService speechService)
    {
        _storageService = storageService;
        _fileService = fileService;
        _speechService = speechService;
    }

    public async Task<Guid> CreateRequest(TextSyntehsisRequest request)
    {
        var containerName = request.RequestingUserId.ToString();

        var blobContainerClient = await _storageService.ContainerExistsAsync(containerName)
            ? _storageService.GetBlobContainerClient(containerName)
            : await _storageService.CreateContainerAsync(containerName);

        var requestId = Guid.NewGuid();
        var fileName = $"{requestId}.txt";
        // var filePath = $"./{requestId}.txt";
        
        (var file, var textFilePath) = _fileService.CreateTextFile(fileName);
        await _fileService.WriteToTextFileAsync(file, request.TextToSynthesize);

        string synthesisFilePath = "";
        
        try
        {
            (var succeded, synthesisFilePath) = await _speechService.SynthesizeAudioAsync(
                requestId.ToString(),
                request.TextToSynthesize
            );

            if (succeded)
            {
                _ = await _storageService.UploadBlobAsync(blobContainerClient, requestId.ToString(), synthesisFilePath);
            }
        }
        catch (Exception e)
        {
            //TODO: Delete file
            //TODO: Log exception
            throw;
        }
        finally
        {
            File.Delete(textFilePath);
            if (string.IsNullOrEmpty(synthesisFilePath))
            {
                File.Delete(synthesisFilePath);
            }
        }

        return requestId;
    }
}