using System.ComponentModel.DataAnnotations.Schema;
using HearingBooks.Domain.DDD;
using HearingBooks.Domain.ValueObjects.TextSynthesis;

namespace HearingBooks.Domain.Entities;

public class TextSynthesis : Entity<Guid>
{
	public Guid RequestingUserId { get; set; }
	public TextSynthesisStatus Status { get; set; }
	public TextSynthesisData TextSynthesisData { get; set; }
}
