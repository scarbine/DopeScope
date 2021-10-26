using Microsoft.Extensions.Configuration;
using DopeScope.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using DopeScope.Utils;

namespace DopeScope.Repository
{
    public class LikeRepository : BaseRepository, ILikeRepository
    {

        public LikeRepository(IConfiguration configuration) : base(configuration) { }

        public List<Like> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = LikeQuery;

                    var likes = new List<Like>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        likes.Add(NewLike(reader));
                    }

                    reader.Close();

                    return likes;

                }
            }
        }
        //public List<Like> GetUserLikes(string firebaseId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"SELECT m.Id, m.Make, m.Model, m.UserId, m.imageUrl, u.Id AS UserId, u.FirstName, u.LastName, u.Email, u.FirebaseId FROM Microscope m 
        //                LEFT JOIN [User] u ON u.id = m.UserId
        //                WHERE u.FirebaseId = @Id";
        //            DbUtils.AddParameter(cmd, "@Id", firebaseId);

        //            var likes = new List<Like>();

        //            var reader = cmd.ExecuteReader();
        //            while (reader.Read())
        //            {
        //                likes.Add(NewLike(reader));
        //            }

        //            reader.Close();

        //            return likes;

        //        }
        //    }
        //}
        private string LikeQuery
        {
            get
            {
                return @"SELECT l.Id, l.SlideId, l.UserProfileId, u.Id AS UserId, u.FirstName, u.LastName, u.Email, u.FirebaseId , s.Id AS SlideSlideId, s.Name, s.Magnification, s.DateCreated, s.MicroscopeId, s.ImageUrl  FROM Like l 
                        JOIN [User] u ON u.id = m.UserId
                        JOIN Slide s ON s.Id = l.SlideId";

            }
        }

        private Like NewLike(SqlDataReader reader)
        {
            return new Like()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                User = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email")
                },
                SlideId = DbUtils.GetInt(reader, "SlideId"),
                slide = new Slide()
                {
                    Id = DbUtils.GetInt(reader, "SlideSlideId"),
                    Name = DbUtils.GetString(reader, "Name"),
                    Magnification = DbUtils.GetInt(reader, "Magnification"),
                    DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                    MicroscopeId = DbUtils.GetInt(reader, "MicroscopeId"),
                    ImageUrl = DbUtils.GetString(reader, "ImageUrl")
                }

            };
        }
    }
}

