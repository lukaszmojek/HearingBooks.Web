namespace HearingBooks.Api;

public interface ISpeechService
{
    public Task<bool> SynthesizeAudioAsync();
}