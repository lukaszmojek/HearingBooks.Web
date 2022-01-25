using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;

namespace HearingBooks.Api;

public class SpeechService : ISpeechService
{
    public bool CreateSynthesis()
    {
        return true;
    }

    public async Task<bool> SynthesizeAudioAsync()
    {
        try
        {
            var config = SpeechConfig.FromSubscription("1c23fad4a1d543658a20ba9f1c6629cc", "westeurope");
            // Note: if only language is set, the default voice of that language is chosen.
            config.SpeechSynthesisLanguage = "pl-PL"; // For example, "de-DE"
            // The voice setting will overwrite the language setting.
            // The voice setting will not overwrite the voice element in input SSML.
            config.SpeechSynthesisVoiceName = "pl-PL-AgnieszkaNeural";

            // Create AudioConfig for to let the application know how to handle the synthesis
            using var audioConfig = AudioConfig.FromWavFileOutput("./test.wav");
            // Actual synthetizer instance for TTS
            using var synthesizer = new SpeechSynthesizer(config, audioConfig);

            await synthesizer.SpeakTextAsync(
                "No i tu mamy przykładowy zsyntetyzowany tekst w języku polskim. Jak się masz kochanie? Jak się masz?"
            );
            
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}