using HearingBooks.Domain.ValueObjects.TextSynthesis;

namespace HearingBooks.Domain.Aggregates;

public interface IEventConsumer<in T> where T : Event
{
    public void Apply(T @event);
}

public abstract class Event
{
    public Guid Id { get; set; }
    public Guid CorrelationId { get; set; }
    public abstract string ToString();
}

public class TextSynthesisSubmitted : Event
{
    public Guid RequestId { get; init; }
    public Guid RequestingUserId { get; init; }
    public string Title { get; init; }
    public string BlobContainerName { get; init; }
    public string BlobName { get; init; }
    
    public TextSynthesisSubmitted(Guid requestId, Guid requestingUserId, string title, string blobContainerName, string blobName)
    {
        RequestId = requestId;
        RequestingUserId = requestingUserId;
        Title = title;
        BlobContainerName = blobContainerName;
        BlobName = blobName;
    }

    public override string ToString()
    {
        return @$"User with id: {RequestingUserId} requested a TextSynthesis with title: {Title} 
        and content on located on blob storage under this path {BlobContainerName}/{BlobName}";
    }
}

public class TextSynthesis : IEventConsumer<TextSynthesisSubmitted>
{
    public Guid Id { get; set; }
    public TextSynthesisStatus Status { get; set; }
    public TextSynthesisData TextSynthesisData { get; private set; }
    public Guid RequestingUserId { get; set; }

    public bool Can { get; set; }

    public static TextSynthesisSubmitted SubmitRequest(Guid requestingUserId, string title, string blobContainerName, string blobName)
    {
        var requestId = Guid.NewGuid();

        return new TextSynthesisSubmitted(requestId, requestingUserId, title, blobContainerName, blobName);
    }
    
    public void Apply(TextSynthesisSubmitted @event)
    {
        Id = @event.Id;
        RequestingUserId = @event.RequestingUserId;
        Status = TextSynthesisStatus.Submitted;
        // TextSynthesisData = new TextSynthesisData
        // {
        //     Title = @event.Title,
        //     BlobContainerName = @event.BlobContainerName,
        //     BlobName = @event.BlobName,
        // };
    }
}