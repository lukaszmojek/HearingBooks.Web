using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace HearingBooks.Api;

public interface IStorageService
{
    Task<bool> ContainerExists(string containerName);
    
    Task<BlobContainerClient> GetBlobContainerClient(string containerName);

    Task<BlobContainerClient> CreateContainer(string containerName);

    Task<Response<BlobContentInfo>> UploadBlob(
        BlobContainerClient blobContainerClient, string blobFileName, string localPath
    );
}

public class StorageService : IStorageService
{
    private readonly IConfiguration _configuration;
    private readonly BlobServiceClient _blobServiceClient;

    public StorageService(IConfiguration configuration)
    {
        _configuration = configuration;
        _blobServiceClient =
            new BlobServiceClient(_configuration[ConfigurationKeys.AzureStorageConnectionString]);
    }

    public async Task<bool> ContainerExists(string containerName)
    {
        var bloblContainersEnumerator = _blobServiceClient
            .GetBlobContainersAsync()
            .AsPages()
            .GetAsyncEnumerator();

        while (await bloblContainersEnumerator.MoveNextAsync())
        {
            var containerExists = bloblContainersEnumerator
                .Current
                .Values
                .Any(x => x.Name.Equals(containerName));

            if (containerExists)
            {
                return true;
            }

        } 

        return false;
    }

    public async Task<BlobContainerClient> GetBlobContainerClient(string containerName)
    {
        return _blobServiceClient.GetBlobContainerClient(containerName);
    }

    public async Task<BlobContainerClient> CreateContainer(string containerName)
    {
        // Create a BlobServiceClient object which will be used to create a container client
        // BlobServiceClient blobServiceClient =
        //     new BlobServiceClient(_configuration[ConfigurationKeys.AzureStorageConnectionString]);

        //Create a unique name for the container
        // containerName = "quickstartblobs" + Guid.NewGuid().ToString();

        // Create the container and return a container client object
        BlobContainerClient containerClient = await _blobServiceClient.CreateBlobContainerAsync(containerName);

        return containerClient;
    }

    public async Task<Response<BlobContentInfo>> UploadBlob(
        BlobContainerClient blobContainerClient, string blobFileName, string localPath
    ) {
        var blobClient = blobContainerClient.GetBlobClient(blobFileName);
        return await blobClient.UploadAsync($"./{blobFileName}");
    }
}