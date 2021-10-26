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
    public class MicroscopeRepository : BaseRepository, IMicroscopeRepository
    {

        public MicroscopeRepository(IConfiguration configuration) : base(configuration) { }

        public List<Microscope> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = MicroscopeQuery;

                    var microscopes = new List<Microscope>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        microscopes.Add(NewMicroscope(reader));
                    }

                    reader.Close();

                    return microscopes;

                }
            }
        }

        public List<Microscope> GetUserScopes(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT m.Id, m.Make, m.Model, m.UserId, m.imageUrl, u.Id AS UserId, u.FirstName, u.LastName, u.Email, u.FirebaseId FROM Microscope m 
                        LEFT JOIN [User] u ON u.id = m.UserId
                        WHERE u.FirebaseId = @Id";
                    DbUtils.AddParameter(cmd, "@Id", firebaseId);

                    var microscopes = new List<Microscope>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        microscopes.Add(NewMicroscope(reader));
                    }

                    reader.Close();

                    return microscopes;

                }
            }
        }



        public Microscope GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT m.Id, m.Make, m.Model,m.imageUrl, m.UserId, u.Id AS UserId, u.FirstName, u.LastName, u.Email, u.FirebaseId FROM Microscope m
                        LEFT JOIN[User] u ON u.id = m.UserId
                        WHERE m.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Microscope microscope = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        microscope = NewMicroscope(reader);

                    }

                    reader.Close();

                    return microscope;
                }
            }
        }

        public void Add(Microscope microscope)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Microscope (Make, Model, UserId, ImageUrl)
                                        OUTPUT INSERTED.ID
                                        VALUES ( @Make, @Model,@UserId, @ImageUrl )";
                    DbUtils.AddParameter(cmd, "@Make", microscope.Make);
                    DbUtils.AddParameter(cmd, "@Model", microscope.Model);
                    DbUtils.AddParameter(cmd, "@UserId", microscope.UserId);
                    DbUtils.AddParameter(cmd, "@ImageUrl", microscope.ImageUrl);


                    microscope.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Microscope microscope)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Microscope
                           SET Make = @Make,
                               Model = @Model,
                               UserId = @UserId,
                               ImageUrl = @ImageUrl                       
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Make", microscope.Make);
                    DbUtils.AddParameter(cmd, "@Model", microscope.Model);
                    DbUtils.AddParameter(cmd, "@UserId", microscope.UserId);
                    DbUtils.AddParameter(cmd, "@Id", microscope.Id);
                    DbUtils.AddParameter(cmd, "@ImageUrl", microscope.ImageUrl);



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
                    cmd.CommandText = "DELETE FROM Microscope WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Microscope> Search(string criterion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                   

                    cmd.CommandText = @"SELECT m.Id, m.Make, m.Model, m.UserId, m.ImageUrl, u.Id AS UserId, u.FirstName, u.LastName, u.Email, u.FirebaseId FROM Microscope m
                        LEFT JOIN[User] u ON u.id = m.UserId
                        WHERE m.Model LIKE @Criterion or m.Make LIKE @Criterion";
                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    var reader = cmd.ExecuteReader();

                    var microscopes = new List<Microscope>();
                    while (reader.Read())
                    {
                        microscopes.Add(NewMicroscope(reader));
                    }

                    reader.Close();

                    return microscopes;
                }
            }
        }

        private string MicroscopeQuery
        {
            get
            {
                return @"SELECT m.Id, m.Make, m.Model, m.UserId, m.ImageUrl, u.Id AS UserId, u.FirstName, u.LastName, u.Email, u.FirebaseId FROM Microscope m 
                        LEFT JOIN [User] u ON u.id = m.UserId";
                        
            }
        }

        private Microscope NewMicroscope(SqlDataReader reader)
        {
            return new Microscope()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Make = DbUtils.GetString(reader, "Make"),
                Model = DbUtils.GetString(reader, "Model"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                User = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email")
                }
            };
        }
     }
}
