namespace HearingBooks.Domain.Aggregates;

public interface IEventConsumer<T> where T : Event
{
    public void Apply(T @event);
}

public abstract class Event
{
    public Guid Id { get; set; }
    public abstract string ToString();
}

public class TextSyntesisRequested : Event
{
    public Guid RequestingUserId { get; set; }
    public string Title { get; set; }
    public string BlobStoragePath { get; set; }

    public override string ToString() =>
        @$"User with id: {RequestingUserId} requested a TextSynthesis with title: {Title} 
        and content on located on blob storage under this path {BlobStoragePath}";
}

public class TextSynthesis : IEventConsumer<TextSyntesisRequested>
{
    private readonly TextSynthesisData _textSynthesisData = new TextSynthesisData();
    public TextSynthesisStatus Status { get; set; }

    public Guid RequestingUserId { get; set; }

    public bool Can { get; set; }
    
    public void Apply(TextSyntesisRequested @event)
    {
        _textSynthesisData.Title = @event.Title;
        _textSynthesisData.BlobStoragePath = @event.BlobStoragePath;
        RequestingUserId = @event.RequestingUserId;
    }
}

public enum TextSynthesisStatus
{
    Submitted = 0,
    Payed = 1,
    Pending = 2,
    Processing = 3,
    Completed = 4,
    Cancelled = 5
}