using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using HearingBooks.Api.Configuration;

namespace HearingBooks.Api.Storage;

public class StorageService : IStorageService
{
    private readonly BlobServiceClient _blobServiceClient;

    public StorageService(IApiConfiguration configuration)
    {
        var azureStorageConnectionString = configuration[ConfigurationKeys.AzureStorageConnectionString];
        _blobServiceClient = new BlobServiceClient(azureStorageConnectionString);
    }

    public async Task<bool> ContainerExistsAsync(string containerName)
    {
        var blobContainersEnumerator = _blobServiceClient
            .GetBlobContainersAsync()
            .AsPages()
            .GetAsyncEnumerator();
        
        while (await blobContainersEnumerator.MoveNextAsync())
        {
            var containerExists = blobContainersEnumerator
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

    public BlobContainerClient GetBlobContainerClient(string containerName)
    {
        return _blobServiceClient.GetBlobContainerClient(containerName);
    }

    public async Task<BlobContainerClient> CreateContainerAsync(string containerName)
    {
        // Create a BlobServiceClient object which will be used to create a container client
        // BlobServiceClient blobServiceClient =
        //     new BlobServiceClient(_configuration[ConfigurationKeys.AzureStorageConnectionString]);

        //Create a unique name for the container
        // containerName = "quickstartblobs" + Guid.NewGuid().ToString();

        // Create the container and return a container client object
        var containerClient = await _blobServiceClient.CreateBlobContainerAsync(containerName);

        return containerClient;
    }

    public async Task DeleteContainerAsync(string containerName)
    {
        await _blobServiceClient.DeleteBlobContainerAsync(containerName);
    }

    public async Task<Response<BlobContentInfo>> UploadBlobAsync(
        BlobContainerClient blobContainerClient, string blobFileName, string blobLocalPath
    ) {
        var blobClient = blobContainerClient.GetBlobClient(blobFileName);
        return await blobClient.UploadAsync(blobLocalPath);
    }
    
    public async Task<Response<bool>> BlobExistsAsync(
        BlobContainerClient blobContainerClient, string blobFileName, CancellationToken cancellationToken
    ) {
        var blobClient = blobContainerClient.GetBlobClient(blobFileName);
        
        return await blobClient.ExistsAsync(cancellationToken);
    }
}