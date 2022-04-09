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

    public async Task<string> SynthesizeAudioAsync(string containerName, string requestId, string textToSynthesize)
    {
        try
        {
            var fileName = $"{requestId}.wav";
            var localPath = await CreateSynthesis(fileName, textToSynthesize);

            await UploadSynthesis(containerName, fileName, localPath);
            
            return localPath;
        }
        catch (Exception e)
        {
            return "";
        }
    }
    
    private async Task<string> CreateSynthesis(string fileName, string textToSynthesize)
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

        await synthesizer.SpeakTextAsync(textToSynthesize);

        return localPath;
    }

    private async Task UploadSynthesis(string containerName, string fileName, string localPath)
    {
        var blobContainerClient = await _storage.GetBlobContainerClientAsync(containerName);
        
        await _storage.UploadBlobAsync(blobContainerClient, fileName, localPath);
    }
}