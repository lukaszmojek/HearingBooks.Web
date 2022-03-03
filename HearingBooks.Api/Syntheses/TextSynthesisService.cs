using HearingBooks.Api.Storage;
using HearingBooks.Domain.Aggregates;
using Marten;

namespace HearingBooks.Api.Syntheses;

public class TextSynthesisService
{
    private readonly IDocumentStore _store;
    private readonly IStorageService _storageService;
    private readonly IFileService _fileService;

    public TextSynthesisService(IDocumentStore store, IStorageService storageService, IFileService fileService)
    {
        _store = store;
        _storageService = storageService;
        _fileService = fileService;
    }

    public async Task CreateRequest(TextSyntehsisRequest request)
    {
        var containerName = request.RequestingUserId.ToString();

        var blobContainerClient = await _storageService.ContainerExistsAsync(containerName)
            ? await _storageService.CreateContainerAsync(containerName)
            : _storageService.GetBlobContainerClient(containerName);

        var requestId = Guid.NewGuid();
        var fileName = $"{requestId}.txt";
        var filePath = $"./{requestId}.txt";
        
        await using var file = _fileService.CreateTextFile(fileName);
        await _fileService.WriteToTextFileAsync(file, request.Content);

        try
        {
            _ = await _storageService.UploadBlobAsync(blobContainerClient, containerName, filePath);
        }
        catch (Exception e)
        {
            //TODO: Delete file
            //TODO: Log exception
            throw;
        }

        using var session = _store.OpenSession();
        var textSynthesisRequested = new TextSyntesisSubmitted
        {
            Id = Guid.NewGuid(),
            RequestId = requestId,
            Title = request.Title,
            BlobStoragePath = "",
            RequestingUserId = request.RequestingUserId,
        };
        
        session.Events.StartStream(typeof(TextSynthesis), requestId, textSynthesisRequested);
        await session.SaveChangesAsync();
        
        

        //TODO: Delete file
    }
}