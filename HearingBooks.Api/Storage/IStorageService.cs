using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace HearingBooks.Api.Storage;

public interface IStorageService
{
    Task<bool> ContainerExists(string containerName);
    
    Task<BlobContainerClient> GetBlobContainerClient(string containerName);

    Task<BlobContainerClient> CreateContainer(string containerName);

    Task<Response<BlobContentInfo>> UploadBlob(
        BlobContainerClient blobContainerClient, string blobFileName, string localPath
    );
}