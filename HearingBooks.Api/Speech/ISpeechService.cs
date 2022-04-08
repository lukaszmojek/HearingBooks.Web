namespace HearingBooks.Api.Speech;

public interface ISpeechService
{
    public Task<(bool, string)> SynthesizeAudioAsync(string requestId, string textToSynthesize);
}