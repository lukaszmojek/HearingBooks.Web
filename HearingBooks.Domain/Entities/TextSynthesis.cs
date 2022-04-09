using System.ComponentModel.DataAnnotations.Schema;
using HearingBooks.Domain.ValueObjects.TextSynthesis;

namespace HearingBooks.Domain.Entities;

public class TextSynthesis
{
	public Guid Id { get; set; }
	public Guid RequestingUserId { get; set; }
	public TextSynthesisStatus Status { get; set; }
	public TextSynthesisData TextSynthesisData { get; set; }
}
