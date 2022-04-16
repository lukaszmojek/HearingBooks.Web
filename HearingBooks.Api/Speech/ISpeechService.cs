namespace HearingBooks.Api.Speech;

public interface ISpeechService
{
    public Task<(string, string)> SynthesizeAudioAsync(string containerName, string requestId, string textToSynthesize);
}