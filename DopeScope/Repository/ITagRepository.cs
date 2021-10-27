using DopeScope.Models;
using System.Collections.Generic;

namespace DopeScope.Repository
{
    public interface ITagRepository
    {
        void Add(Tag tag);
        void Delete(int id);
        List<Tag> GetAll();
        Tag GetById(int id);
        void Update(Tag tag);
    }
}