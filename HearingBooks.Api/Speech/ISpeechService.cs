namespace HearingBooks.Api.Speech;

public interface ISpeechService
{
    public Task<bool> SynthesizeAudioAsync();
}