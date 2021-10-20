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

        public Microscope GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = MicroscopeQuery;

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

        private string MicroscopeQuery
        {
            get
            {
                return @"SELECT m.Id, m.Make, m.Model, m.UserId, u.Id AS UserId, u.FirstName, u.LastName, u.Email, u.FirebaseId FROM Microscope m 
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
