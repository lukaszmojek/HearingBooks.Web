namespace HearingBooks.Api;

public interface ISpeechService
{
    public bool CreateSynthesis();

    public Task<bool> SynthesizeAudioAsync();
}