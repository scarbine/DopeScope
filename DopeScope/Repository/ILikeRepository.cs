using DopeScope.Models;
using System.Collections.Generic;

namespace DopeScope.Repository
{
    public interface ILikeRepository
    {
        List<Like> GetAll();
    }
}