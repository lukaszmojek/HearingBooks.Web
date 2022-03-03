using HearingBooks.Api.Storage;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;

namespace HearingBooks.Api.Speech;

public class SpeechService : ISpeechService
{
    private readonly IConfiguration _configuration;
    private readonly IStorageService _storage;

    public SpeechService(IConfiguration configuration, IStorageService storage)
    {
        _configuration = configuration;
        _storage = storage;
    }

    public async Task<bool> SynthesizeAudioAsync()
    {
        try
        {
            var fileName = "file-001.wav";
            // var localPath = await CreateSynthesis(fileName);
            var localPath = $"./{fileName}";
            await UploadSynthesis(fileName, localPath);
            
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
    
    private async Task<string> CreateSynthesis(string fileName)
    {
        var config = SpeechConfig.FromSubscription(
            _configuration[ConfigurationKeys.TextToSpeechSubscriptionKey],
            _configuration[ConfigurationKeys.TextToSpeechRegion]
        );
        // Note: if only language is set, the default voice of that language is chosen.
        config.SpeechSynthesisLanguage = "pl-PL"; // For example, "de-DE"
        // The voice setting will overwrite the language setting.
        // The voice setting will not overwrite the voice element in input SSML.
        config.SpeechSynthesisVoiceName = "pl-PL-AgnieszkaNeural";

        // Create AudioConfig for to let the application know how to handle the synthesis
        var localPath = $"./{fileName}";
        using var audioConfig = AudioConfig.FromWavFileOutput(localPath);
        // Actual synthetizer instance for TTS
        using var synthesizer = new SpeechSynthesizer(config, audioConfig);

        await synthesizer.SpeakTextAsync(
            "No i tu mamy przykładowy zsyntetyzowany tekst w języku polskim. Jak się masz kochanie? Jak się masz?"
        );

        return localPath;
    }

    private async Task UploadSynthesis(string fileName, string localPath)
    {
        var containerName = "test-001";
        var containerExists = await _storage.ContainerExistsAsync(containerName);
        
        var blobContainerClient =  containerExists
            ? _storage.GetBlobContainerClient(containerName)
            : await _storage.CreateContainerAsync(containerName);
        
        await _storage.UploadBlobAsync(blobContainerClient, fileName, localPath);
    }
}