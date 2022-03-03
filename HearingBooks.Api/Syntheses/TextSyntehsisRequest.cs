namespace HearingBooks.Api.Syntheses;

public class TextSyntehsisRequest
{
    public string Title { get; set; }
    public string Content { get; set; }
    public Guid RequestingUserId { get; set; }
}