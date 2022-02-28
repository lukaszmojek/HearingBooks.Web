using System;
using System.Reflection;
using System.Threading.Tasks;
using HearingBooks.Api.Storage;
using HearingBooks.Api.Tests.Helpers;
using Xunit;
using Xunit.Sdk;

namespace HearingBooks.Api.Tests;


public class StorageServiceTest
{
    //TODO: Try to refactor this code and apply template method patter
    // [Category("StorageService")]
    // public class StorageServiceTestBase
    // {
    //     protected readonly string _containerName = "test-container-name";
    //     protected IStorageService StorageService;
    //
    //     [Fact]
    //     public void Run()
    //     {
    //         PrepareDependencies();
    //         ExecuteTest();
    //         Cleanup();
    //     }
    //
    //     public virtual Task ExecuteTest()
    //     {
    //         return Task.CompletedTask;
    //     }
    //
    //     private void PrepareDependencies()
    //     {
    //         var configuration = new ConfigurationManager()
    //             .AddJsonFile("appsettings.Development.json")
    //             .Build();
    //
    //         var apiConfiguration = new ApiConfiguration(configuration);
    //
    //         StorageService = new StorageService(apiConfiguration);
    //     }
    //
    //     private void Cleanup()
    //     {
    //         
    //     }
    // }
    //
    // public class When_CreateContainer_Is_Called_Should_Create_Container_In_AzureBlobStorage : StorageServiceTestBase
    // {
    //     public override async Task ExecuteTest()
    //     {
    //         var containerExistsBeforeCallingCreateContainer = await StorageService.ContainerExists(_containerName);
    //         var _ = await StorageService.CreateContainer(_containerName);
    //         var containerExistsAfterCallingCreateContainer = await StorageService.ContainerExists(_containerName);
    //
    //         Assert.False(containerExistsBeforeCallingCreateContainer);
    //         Assert.True(containerExistsAfterCallingCreateContainer);
    //     }
    // }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class BeforeAfterAsyncTestAttribute : BeforeAfterTestAttribute
    {
        
    }
        
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class InitializeStorageServiceAndCleanupAfterTest : BeforeAfterTestAttribute
    {
        protected readonly string _containerName = "test-container-name";

        protected IStorageService StorageService { get; set; }
        
        public override void Before(MethodInfo methodUnderTest)
        {
            StorageService = StorageHelpers.CresteStorageService();
            DeleteContainerIfExists();
        }
        
        public override void After(MethodInfo methodUnderTest)
        {
            DeleteContainerIfExists();
        }

        private async Task DeleteContainerIfExists()
        {
            if (await StorageService.ContainerExists(_containerName))
            {
                StorageService.DeleteContainer(_containerName);
            }
        }
    }
    
    [InitializeStorageServiceAndCleanupAfterTest]
    public class When_CreateContainer_Is_Called_Should_Create_Container_In_AzureBlobStorage2
    {
        protected readonly string _containerName = "test-container-name";
        
        [Fact]
        public async Task ExecuteTest()
        {
            var StorageService = StorageHelpers.CresteStorageService();
            
            var containerExistsBeforeCallingCreateContainer = await StorageService.ContainerExists(_containerName);
            var _ = await StorageService.CreateContainer(_containerName);
            var containerExistsAfterCallingCreateContainer = await StorageService.ContainerExists(_containerName);

            Assert.False(containerExistsBeforeCallingCreateContainer);
            Assert.True(containerExistsAfterCallingCreateContainer);
        }
    }
}