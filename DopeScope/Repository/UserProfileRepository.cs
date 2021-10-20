using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DopeScope.Models;
using DopeScope.Utils;
using Microsoft.Extensions.Configuration;

namespace DopeScope.Repository
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FirebaseId, u.FirstName AS UserProfileFirstName, u.LastName AS UserProfileLastName, u.Email
                           
                          FROM [User] u
                          
                         WHERE FirebaseId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseuserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseId"),
                            FirstName = DbUtils.GetString(reader, "UserProfileFirstName"),
                            LastName = DbUtils.GetString(reader, "UserProfileLastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                           
                           
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO User (FirebaseId, FirstName, LastName, Email)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName @Email)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
            

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
