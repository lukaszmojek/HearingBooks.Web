using HearingBooks.Domain.ValueObjects.TextSynthesis;

namespace HearingBooks.Domain.Entities;

public class TextSynthesis
{
	public Guid Id { get; set; }
	public Guid RequestingUserId { get; set; }
	public TextSynthesisStatus Status { get; set; }
	public TextSynthesisData TextSynthesisData { get; private set; }

	public bool CanBeProcessed() =>
		Status switch
		{
			TextSynthesisStatus.Pending => true,
			_ => false
		};
	
	public bool CanBeCancelled() =>
		Status switch
		{
			TextSynthesisStatus.Submitted => true,
			TextSynthesisStatus.Pending => true,
			_ => false
		};
}
