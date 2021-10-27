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
    public class SlideTagRepository : BaseRepository, ISlideTagRepository
    {
        public SlideTagRepository(IConfiguration configuration) : base(configuration) { }

        public List<SlideTag> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = SlideTagQuery;

                    var slideTags = new List<SlideTag>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        slideTags.Add(NewSlideTag(reader));
                    }

                    reader.Close();

                    return slideTags;

                }
            }
        }

        public List<SlideTag> GetAllBySlideId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT st.id, st.TagId, st.SlideId , s.Id, s.Magnification, s.Microscopeid, s.ImageUrl, s.Description, s.DateCreated, s.Name, t.Id, t.Tag FROM SlideTag st
                        LEFT JOIN[Tag] t ON t.id = st.TagId
                        LEFT JOIN Slide s ON s.id = st.SlideId
                        WHERE  st.SlideId = @Id ";

                    DbUtils.AddParameter(cmd, @"Id", id);

                    var slideTags = new List<SlideTag>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        slideTags.Add(NewSlideTag(reader));
                    }

                    reader.Close();

                    return slideTags;

                }
            }
        }





        public SlideTag GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT st.id, st.TagId, st.SlideId , s.Id, s.Magnification, s.Microscopeid, s.ImageUrl, s.Description, s.DateCreated, s.Name, t.Id, t.Tag FROM SlideTag st 
                        LEFT JOIN [Tag] t ON t.id = st.TagId
                        LEFT JOIN Slide s ON s.id = st.SlideId
                        WHERE st.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    SlideTag slideTag = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        slideTag = NewSlideTag(reader);

                    }

                    reader.Close();

                    return slideTag;
                }
            }
        }

        public void Add(SlideTag slideTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO SlideTag (SlideId, TagId)
                                        OUTPUT INSERTED.ID
                                        VALUES ( @SlideTag, @Tagid )";
                    DbUtils.AddParameter(cmd, "@SlideTag", slideTag.SlideId);
                    DbUtils.AddParameter(cmd, "@TagId", slideTag.TagId);

                    slideTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(SlideTag slideTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE SlideTag
                           SET SlideTag = @SlideTag,
                               TagId = @TagId                    
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@SlideTag", slideTag.SlideId);
                    DbUtils.AddParameter(cmd, "@TagId", slideTag.TagId);

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
                    cmd.CommandText = "DELETE FROM SlideTag WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }



        private string SlideTagQuery
        {
            get
            {
                return @"SELECT st.id, st.TagId, st.SlideId , s.Id, s.Magnification, s.Microscopeid, s.ImageUrl, s.Description, s.DateCreated, s.Name, t.Id, t.Tag FROM SlideTag st 
                        LEFT JOIN [Tag] t ON t.id = st.TagId
                        LEFT JOIN Slide s ON s.id = st.SlideId";

            }
        }

        private SlideTag NewSlideTag(SqlDataReader reader)
        {
            return new SlideTag()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                SlideId = DbUtils.GetInt(reader, "SlideId"),

                Slide = new Slide()
                {
                    Id = DbUtils.GetInt(reader, "Id"),
                    Magnification = DbUtils.GetInt(reader, "Magnification"),
                    MicroscopeId = DbUtils.GetInt(reader, "MicroscopeId"),
                    Name = DbUtils.GetString(reader, "Name"),
                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                    Description = DbUtils.GetString(reader, "Description"),
                    DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                    Microscope = new Microscope()
                },
                TagId = DbUtils.GetInt(reader, "TagId"),
                Tag = new Tag()
                {
                    Id = DbUtils.GetInt(reader, "Id"),
                    TagName = DbUtils.GetString(reader, "Tag")
                }

            };
        }
    }
}

