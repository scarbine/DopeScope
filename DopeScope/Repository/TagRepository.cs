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
    public class TagRepository : BaseRepository, ITagRepository
    {

        public TagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = TagQuery;

                    var tags = new List<Tag>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        tags.Add(NewTag(reader));
                    }

                    reader.Close();

                    return tags;

                }
            }
        }

        public Tag GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Tag FROM Tag
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Tag tag = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        tag = NewTag(reader);

                    }

                    reader.Close();

                    return tag;
                }
            }
        }

        public void Add(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Tag (Tag)
                                        OUTPUT INSERTED.ID
                                        VALUES (  @TagName )";
                    DbUtils.AddParameter(cmd, "@TagName", tag.TagName);


                    tag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Tag
                           SET Tag = @Tag
                                                 
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Tag", tag.TagName);
                    DbUtils.AddParameter(cmd, "@Id", tag.Id);


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
                    cmd.CommandText = "DELETE FROM Tag WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }



        private string TagQuery
        {
            get
            {
                return @"SELECT  Id, Tag FROM Tag";

            }
        }

        private Tag NewTag(SqlDataReader reader)
        {
            return new Tag()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                TagName = DbUtils.GetString(reader, "Tag")
            };
        }
    }
}
