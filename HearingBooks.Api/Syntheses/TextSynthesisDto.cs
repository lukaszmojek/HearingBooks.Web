namespace HearingBooks.Api.Syntheses;

public class TextSynthesisDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int CharactersCount { get; set; }
    public int SynthesisLengthInSeconds { get; set; }
}