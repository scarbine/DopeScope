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
        public List<Like> GetUserLikes(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT l.Id, l.SlideId, l.UserId, u.Id AS UserId, u.FirstName, u.LastName, u.Email, u.FirebaseId , s.Id AS SlideSlideId, s.Name, s.Description, s.Magnification, s.DateCreated, s.MicroscopeId, s.ImageUrl  FROM [Like] l 
                        JOIN [User] u ON u.id = l.UserId
                        JOIN Slide s ON s.Id = l.SlideId
                        WHERE u.FirebaseId = @Id";
                    DbUtils.AddParameter(cmd, "@Id", firebaseId);

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

        public Like GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT l.Id, l.SlideId, l.UserId, u.Id AS UserId, u.FirstName, u.LastName, u.Email, u.FirebaseId , s.Id AS SlideSlideId, s.Name, s.Magnification, s.Description, s.DateCreated, s.MicroscopeId, s.ImageUrl  FROM [Like] l 
                        JOIN [User] u ON u.id = l.UserId
                        JOIN Slide s ON s.Id = l.SlideId
                        WHERE s.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Like like  = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        like = NewLike(reader);

                    }

                    reader.Close();

                    return like;
                }
            }
        }
        public Like GetBySlideAndFirebaseId(int slideId, string firebaseId )
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT l.Id, l.SlideId, l.UserId, u.Id AS UserId, u.FirstName, u.LastName, u.Email, u.FirebaseId , s.Id AS SlideSlideId, s.Name, s.Magnification, s.Description, s.DateCreated, s.MicroscopeId, s.ImageUrl  FROM [Like] l 
                        JOIN [User] u ON u.id = l.UserId
                        JOIN Slide s ON s.Id = l.SlideId
                        WHERE s.Id = @Id AND u.FirebaseId = @FirebaseId";

                    DbUtils.AddParameter(cmd, "@Id", slideId);
                    DbUtils.AddParameter(cmd, "@FirebaseId", firebaseId);

                    Like like = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        like = NewLike(reader);

                    }

                    reader.Close();

                    return like;
                }
            }
        }

        public int GetSlideLikes(int slideId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT COUNT(id) FROM [Like] WHERE slideId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", slideId);

                    Int32 count = (Int32)cmd.ExecuteScalar();

                    return count;
                }

            }
        }
            public void Add(Like like)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"INSERT INTO [Like] (UserId, SlideId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserId, @SlideId)";
                        DbUtils.AddParameter(cmd, "@UserId", like.UserId);
                        DbUtils.AddParameter(cmd, "@SlideId", like.SlideId);
                        


                        like.Id = (int)cmd.ExecuteScalar();
                    }
                }
            }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM [Like] WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private string LikeQuery
        {
            get
            {
                return @"SELECT l.Id, l.SlideId, l.UserId, u.Id AS UserId, u.FirstName, u.LastName, u.Email, u.FirebaseId , s.Id AS SlideSlideId, s.Name, s.Magnification, s.Description, s.DateCreated, s.MicroscopeId, s.ImageUrl  FROM [Like] l 
                        JOIN [User] u ON u.id = l.UserId
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
                    Description = DbUtils.GetString(reader, "Description"),
                    Magnification = DbUtils.GetInt(reader, "Magnification"),
                    DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                    MicroscopeId = DbUtils.GetInt(reader, "MicroscopeId"),
                    ImageUrl = DbUtils.GetString(reader, "ImageUrl")
                }

            };
        }
    }
}

