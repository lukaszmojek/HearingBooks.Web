namespace HearingBooks.Api.Speech;

public interface ISpeechService
{
    public Task<string> SynthesizeAudioAsync(string containerName, string requestId, string textToSynthesize);
}