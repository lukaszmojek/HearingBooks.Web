using HearingBooks.Domain.Entities;

namespace HearingBooks.Infrastructure.Repositories;

public interface ITextSynthesisRepository
{
	Task Insert(TextSynthesis synthesis);
}