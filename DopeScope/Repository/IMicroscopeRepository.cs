using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DopeScope.Models;

namespace DopeScope.Repository
{
    public interface IMicroscopeRepository
    {

        List<Microscope> GetAll();
        Microscope GetById(int id);
        void Add(Microscope microscope);
        void Update(Microscope microscope);

        void Delete(int id);
    }
}
