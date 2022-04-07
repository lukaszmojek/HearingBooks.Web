namespace HearingBooks.Domain.DDD;

public abstract class Entity<T>
{
	public T Id { get; set; }
}