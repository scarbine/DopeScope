using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DopeScope.Models;

namespace DopeScope.Repository
{
    public interface ISlideRepository
    {
        List<Slide> GetAll();
        Slide GetById(int id);
        void Add(Slide slide);
        void Update( Slide slide);
        void Delete(int id);
    }
}
