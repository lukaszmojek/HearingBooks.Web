using HearingBooks.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HearingBooks.Persistance;

public class HearingBooksDatabaseContext : DbContext
{
	public DbSet<User> Users { get; set; }
	public DbSet<TextSynthesis> TextSyntheses { get; set; }

	public HearingBooksDatabaseContext(DbContextOptions<HearingBooksDatabaseContext> options)
		: base(options)
	{
	}
}