using DopeScope.Models;
using System.Collections.Generic;

namespace DopeScope.Repository
{
    public interface ILikeRepository
    {
        List<Like> GetAll();

        List<Like> GetUserLikes(string firebaseId);

        List<Like> GetSlideLikes(int slideId);
        Like GetBySlideAndFirebaseId(int slideId, string firebaseId);

        Like GetById(int id);
        void Add(Like like);

       

        void Delete(int Id);

    }
}
