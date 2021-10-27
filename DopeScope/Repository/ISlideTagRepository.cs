using DopeScope.Models;
using System.Collections.Generic;

namespace DopeScope.Repository
{
    public interface ISlideTagRepository
    {
        void Add(SlideTag slideTag);
        void Delete(int id);
        List<SlideTag> GetAll();
        SlideTag GetById(int id);
        void Update(SlideTag slideTag);
        List<SlideTag> GetAllBySlideId(int id);
    }
}