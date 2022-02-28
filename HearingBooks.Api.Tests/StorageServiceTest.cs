using System.ComponentModel;
using System.Threading.Tasks;
using HearingBooks.Api.Configuration;
using HearingBooks.Api.Storage;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace HearingBooks.Api.Tests;

public class StorageServiceTest {
     [Category("StorageService")]
     public class StorageServiceTestBase
     {
         protected readonly string _containerName = "test-container-name";
         protected IStorageService StorageService;
         
         public async Task RunAsync()
         {
             await PrepareDependencies();
             await ExecuteTest();
             await Cleanup();
         }
         
         public virtual Task ExecuteTestAsync()
         {
             return Task.CompletedTask;
         }
    
         public virtual Task ExecuteTest()
         {
             return Task.CompletedTask;
         }
    
         private async Task PrepareDependencies()
         {
             var configuration = new ConfigurationManager()
                 .AddJsonFile("appsettings.Development.json")
                 .Build();
    
             var apiConfiguration = new ApiConfiguration(configuration);
    
             StorageService = new StorageService(apiConfiguration);
         }
    
         private async Task Cleanup()
         {
             
         }
     }
    
    public class When_CreateContainer_Is_Called_Should_Create_Container_In_AzureBlobStorage : StorageServiceTestBase
    {
        [Fact]
        public async Task InvokeTest()
        {
            await RunAsync();
        }
        
        public override async Task ExecuteTest()
        {
            var containerExistsBeforeCallingCreateContainer = await StorageService.ContainerExistsAsync(_containerName);
            var _ = await StorageService.CreateContainerAsync(_containerName);
            var containerExistsAfterCallingCreateContainer = await StorageService.ContainerExistsAsync(_containerName);
    
            Assert.False(containerExistsBeforeCallingCreateContainer);
            Assert.True(containerExistsAfterCallingCreateContainer);
        }
    }

    // [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    // public class InitializeStorageServiceAndCleanupAfterTest : BeforeAfterTestAttribute
    // {
    //     protected readonly string _containerName;
    //
    //     public InitializeStorageServiceAndCleanupAfterTest(string containerName)
    //     {
    //         _containerName = containerName;
    //     }
    //
    //     protected IStorageService StorageService { get; set; }
    //     
    //     public override void Before(MethodInfo methodUnderTest)
    //     {
    //         StorageService = StorageHelpers.CresteStorageService();
    //         DeleteContainerIfExists();
    //     }
    //     
    //     public override void After(MethodInfo methodUnderTest)
    //     {
    //         DeleteContainerIfExists();
    //     }
    //
    //     private async Task DeleteContainerIfExists()
    //     {
    //         if (await StorageService.ContainerExistsAsync(_containerName))
    //         {
    //             await StorageService.DeleteContainerAsync(_containerName);
    //         }
    //     }
    // }
    //
    // [InitializeStorageServiceAndCleanupAfterTest]
    // public class When_ContainerExistsAsync_Is_Called_Should_Return_False_When_Container_Does_Not_Exists
    // {
    //     protected readonly string _containerName = Guid.NewGuid().ToString();
    //     
    //     [Fact]
    //     public async Task ExecuteTest()
    //     {
    //         var storageService = StorageHelpers.CresteStorageService();
    //         
    //         var containerExists = await storageService.ContainerExistsAsync(_containerName);
    //
    //         Assert.False(containerExists);
    //     }
    // }
    //
    // [InitializeStorageServiceAndCleanupAfterTest]
    // public class When_ContainerExistsAsync_Is_Called_Should_Return_True_When_Container_Exists
    // {
    //     protected readonly string _containerName = Guid.NewGuid().ToString();
    //     
    //     [Fact]
    //     public async Task ExecuteTest()
    //     {
    //         var storageService = StorageHelpers.CresteStorageService();
    //         
    //         await storageService.CreateContainerAsync(_containerName);
    //         var containerExists = await storageService.ContainerExistsAsync(_containerName);
    //
    //         Assert.True(containerExists);
    //     }
    // }
    //
    // [InitializeStorageServiceAndCleanupAfterTest]
    // public class When_CreateContainer_Is_Called_Should_Create_Container_In_AzureBlobStorage
    // {
    //     protected readonly string _containerName = Guid.NewGuid().ToString();
    //     
    //     [Fact]
    //     public async Task ExecuteTest()
    //     {
    //         var storageService = StorageHelpers.CresteStorageService();
    //         
    //         var containerExistsBeforeCallingCreateContainer = await storageService.ContainerExistsAsync(_containerName);
    //         var _ = await storageService.CreateContainerAsync(_containerName);
    //         var containerExistsAfterCallingCreateContainer = await storageService.ContainerExistsAsync(_containerName);
    //
    //         Assert.False(containerExistsBeforeCallingCreateContainer);
    //         Assert.True(containerExistsAfterCallingCreateContainer);
    //     }
    // }
    //
    // [InitializeStorageServiceAndCleanupAfterTest]
    // public class When_UploadBlob_Is_Called_Should_Upload_Blob_To_Container_In_AzureBlobStorage : TestBase
    // {
    //     private readonly string _containerName = Guid.NewGuid().ToString();
    //     private readonly string _fileName = "opowiesci-niesamowite.epub";
    //     
    //     [Fact]
    //     public async Task ExecuteTest()
    //     {
    //         var StorageService = StorageHelpers.CresteStorageService();
    //         
    //         var blobContainerClient = await StorageService.CreateContainerAsync(_containerName);
    //         var containerExistsAfterCallingCreateContainer = await StorageService.ContainerExistsAsync(_containerName);
    //         var _ = await StorageService.UploadBlobAsync(
    //             blobContainerClient,
    //             _fileName,
    //             GetPathForTestFile(_fileName)
    //         );
    //
    //         var blobExists = await StorageService.BlobExistsAsync(
    //             blobContainerClient,
    //             _fileName,
    //             CancellationToken.None
    //         );
    //         
    //         Assert.True(containerExistsAfterCallingCreateContainer);
    //         Assert.True(blobExists);
    //     }
    // }
}