using HearingBooks.Domain.DDD;

namespace HearingBooks.Domain.Entities;

public class Voice : Entity<Guid>
{
	public string Name { get; set; }
}