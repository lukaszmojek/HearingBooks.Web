using System.ComponentModel;
using System.Threading.Tasks;
using HearingBooks.Api.Configuration;
using HearingBooks.Api.Storage;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace HearingBooks.Api.Tests;

public class StorageServiceTest
{
    [Category("StorageService")]
    public class StorageServiceTestBase
    {
        protected readonly string _containerName = "test-container-name";
        protected IStorageService StorageService;

        [Fact]
        public void Run()
        {
            PrepareDependencies();
            ExecuteTest();
            Cleanup();
        }

        public virtual Task ExecuteTest()
        {
            return Task.CompletedTask;
        }

        private void PrepareDependencies()
        {
            var configuration = new ConfigurationManager()
                .AddJsonFile("appsettings.Development.json")
                .Build();

            var apiConfiguration = new ApiConfiguration(configuration);

            StorageService = new StorageService(apiConfiguration);
        }

        private void Cleanup()
        {
            
        }
    }
    
    public class When_CreateContainer_Is_Called_Should_Create_Container_In_AzureBlobStorage : StorageServiceTestBase
    {
        public override async Task ExecuteTest()
        {
            var containerExistsBeforeCallingCreateContainer = await StorageService.ContainerExists(_containerName);
            var _ = await StorageService.CreateContainer(_containerName);
            var containerExistsAfterCallingCreateContainer = await StorageService.ContainerExists(_containerName);

            Assert.False(containerExistsBeforeCallingCreateContainer);
            Assert.True(containerExistsAfterCallingCreateContainer);
        }
    }
    
    public class When_CreateContainer_Is_Called_Should_Create_Container_In_AzureBlobStorage2
    {
        protected readonly string _containerName = "test-container-name";

        
        [Fact]
        public async Task ExecuteTest()
        {
            var StorageService = CreateService();
            
            var containerExistsBeforeCallingCreateContainer = await StorageService.ContainerExists(_containerName);
            var _ = await StorageService.CreateContainer(_containerName);
            var containerExistsAfterCallingCreateContainer = await StorageService.ContainerExists(_containerName);

            Assert.False(containerExistsBeforeCallingCreateContainer);
            Assert.True(containerExistsAfterCallingCreateContainer);
        }

        private IStorageService CreateService()
        {
            var configuration = new ConfigurationManager()
                .AddJsonFile("appsettings.Development.json")
                .Build();

            var apiConfiguration = new ApiConfiguration(configuration);
            
            return new StorageService(apiConfiguration);
        }
    }
}