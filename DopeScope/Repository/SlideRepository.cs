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
    public class SlideRepository : BaseRepository, ISlideRepository
    {

        public SlideRepository(IConfiguration configuration) : base(configuration) { }

        public List<Slide> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = SlideQuery ;

                    var slides = new List<Slide>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        slides.Add(NewSlide(reader));
                    }

                    reader.Close();

                    return slides;

                }
            }
        }

        public List<Slide> GetUserSlides(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT s.Id, s.Magnification, s.MicroscopeId,s.Description, s.ImageUrl, s.Name, s.DateCreated, m.Id AS MId, m.Make, m.Model, m.ImageUrl AS ScopeImageUrl, m.UserId AS MUID, u.Id AS UserId, u.FirebaseId, u.FirstName, u.Lastname, u.Email FROM Slide s
                        JOIN Microscope m ON s.MicroscopeId = m.Id
                        JOIN [USER] u ON u.Id = m.UserId
                        WHERE u.FirebaseId =@Id";
                    DbUtils.AddParameter(cmd, "@Id", firebaseId);

                    var slides = new List<Slide>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        slides.Add(NewSlide(reader));
                    }

                    reader.Close();

                    return slides;

                }
            }
        }

        public List<Slide> GetScopeSlides(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT s.Id, s.Magnification, s.MicroscopeId,s.Description, s.ImageUrl, s.Name, s.DateCreated, m.Id AS MId, m.ImageUrl AS ScopeImageUrl, m.Make, m.Model, m.UserId AS MUID, u.Id AS UserId, u.FirebaseId, u.FirstName, u.Lastname, u.Email FROM Slide s
                        JOIN Microscope m ON s.MicroscopeId = m.Id
                        JOIN [USER] u ON u.Id = m.UserId
                        WHERE m.Id =@Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var slides = new List<Slide>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        slides.Add(NewSlide(reader));
                    }

                    reader.Close();

                    return slides;

                }
            }
        }


        public Slide GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT s.Id, s.Magnification, s.MicroscopeId,s.Description, s.ImageUrl, s.Name, s.DateCreated, m.Id AS MId, m.Make, m.Model, m.ImageUrl AS ScopeImageUrl, m.UserId AS MUID, u.Id AS UserId, u.FirebaseId, u.FirstName, u.Lastname, u.Email FROM Slide s
                        JOIN Microscope m ON s.MicroscopeId = m.Id
                        JOIN [USER] u ON u.Id = m.UserId
                        WHERE s.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Slide slide = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        slide = NewSlide(reader);

                    }

                    reader.Close();

                    return slide;
                }
            }
        }

        public void Add(Slide slide)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Slide (Magnification, MicroscopeId, Description, ImageUrl, Name, DateCreated)
                                        OUTPUT INSERTED.ID
                                        VALUES ( @Magnification, @MicroscopeId, @Description, @ImageUrl, @Name, @DateCreated)";
                    DbUtils.AddParameter(cmd, "@Magnification", slide.Magnification);
                    DbUtils.AddParameter(cmd, "@MicroscopeId", slide.MicroscopeId);
                    DbUtils.AddParameter(cmd, "@Description", slide.Description);
                    DbUtils.AddParameter(cmd, "@ImageUrl", slide.ImageUrl);
                    DbUtils.AddParameter(cmd, "@Name", slide.Name);
                    DbUtils.AddParameter(cmd, "@DateCreated", slide.DateCreated);
                   

                    slide.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update( Slide slide)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Slide
                           SET Magnification = @Magnification,
                               MicroscopeId = @MicroscopeId,
                               Description = @Description,
                               ImageUrl = @ImageUrl,
                                Name = @Name
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Magnification", slide.Magnification);
                    DbUtils.AddParameter(cmd, "@MicroscopeId", slide.MicroscopeId);
                    DbUtils.AddParameter(cmd, "@Description", slide.Description);
                    DbUtils.AddParameter(cmd, "@ImageUrl", slide.ImageUrl);
                    DbUtils.AddParameter(cmd, "@Name", slide.Name);
                    DbUtils.AddParameter(cmd, "@Id", slide.Id);



                    cmd.ExecuteNonQuery();
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
                    cmd.CommandText = "DELETE FROM Slide WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        private string SlideQuery
        {
            get
            {
                return @"SELECT s.Id, s.Magnification, s.MicroscopeId,s.Description, s.ImageUrl, s.Name, s.DateCreated, m.Id AS MId, m.Make, m.Model, m.ImageUrl AS ScopeImageUrl, m.UserId AS MUID, u.Id AS UserId, u.FirebaseId, u.FirstName, u.Lastname, u.Email FROM Slide s
                        JOIN Microscope m ON s.MicroscopeId = m.Id
                        JOIN [USER] u ON u.Id = m.UserId";

            }
        }

        private Slide NewSlide(SqlDataReader reader)
        {
            return new Slide()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Magnification = DbUtils.GetInt(reader, "Magnification"),
                MicroscopeId = DbUtils.GetInt(reader, "MicroscopeId"),
                Name = DbUtils.GetString(reader, "Name"),
                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                Description = DbUtils.GetString(reader, "Description"),
                DateCreated = DbUtils.GetDateTime(reader,"DateCreated"),
                Microscope = new Microscope()
                {
                    Id = DbUtils.GetInt(reader, "MId"),
                    Make = DbUtils.GetString(reader, "Make"),
                    Model = DbUtils.GetString(reader, "Model"),
                    UserId = DbUtils.GetInt(reader, "MUID"),
                    ImageUrl = DbUtils.GetString(reader, "ScopeImageUrl"),
                    User = new UserProfile()
                    {
                        Id = DbUtils.GetInt(reader,"UserId"),
                        FirebaseUserId = DbUtils.GetString(reader, "FirebaseId"),
                        FirstName = DbUtils.GetString(reader, "FirstName"),
                        LastName = DbUtils.GetString(reader, "LastName"),
                        Email = DbUtils.GetString(reader, "Email")
                    }
                    
                }
            };
        }

    }
}
