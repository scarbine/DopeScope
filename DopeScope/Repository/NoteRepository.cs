using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DopeScope.Models;
using DopeScope.Utils;
using System.Data.SqlClient;

namespace DopeScope.Repository
{

    public class NoteRepository : BaseRepository, INoteRepository
    {

        public NoteRepository(IConfiguration configuration) : base(configuration) { }

        public List<Note> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = NoteQuery;

                    var notes = new List<Note>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        notes.Add(NewNote(reader));
                    }

                    reader.Close();

                    return notes;

                }
            }
        }




        public List<Note> GetBySlideId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT s.Id AS SlideId, s.Magnification, s.MicroscopeId,s.Description, s.ImageUrl, s.Name, s.DateCreated, u.Id AS UserId, u.FirebaseId, u.FirstName, u.Lastname, u.Email, n.Id, n.UserId, n.SlideId, n.Note FROM Note n
                        JOIN[User] u ON u.Id = n.UserId
                        JOIN Slide s ON s.Id = n.SlideId
                        WHERE s.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    List<Note> notes = new List<Note>();

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        notes.Add(NewNote(reader));

                    }

                    reader.Close();

                    return notes;
                }
            }
        }

        public void Add(Note note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Note (slideId, userId, note)
                                        OUTPUT INSERTED.ID
                                        VALUES ( @SlideId, @userId @NoteText)";
                    DbUtils.AddParameter(cmd, "@SlideId", note.SlideId);
                    DbUtils.AddParameter(cmd, "@UserId", note.UserId);
                    DbUtils.AddParameter(cmd, "@NoteText", note.NoteText);



                    note.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Note note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Note
                           SET SlideId = @SlideId,
                               UserId = @UserId,
                               Note = @Note
                               
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@SlideId", note.SlideId);
                    DbUtils.AddParameter(cmd, "@UserId", note.UserId);
                    DbUtils.AddParameter(cmd, "@Note", note.NoteText);
                    DbUtils.AddParameter(cmd, "@Id", note.Id);



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
                    cmd.CommandText = "DELETE FROM Note WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


        private string NoteQuery
        {
            get
            {
                return @"SELECT s.Id AS SlideId, s.Magnification, s.MicroscopeId, s.Description, s.ImageUrl, s.Name, s.DateCreated, u.Id AS UserId, u.FirebaseId, u.FirstName, u.Lastname, u.Email, n.Id, n.UserId, n.SlideId, n.Note FROM Note n
                        JOIN[User] u ON u.Id = n.UserId
                        JOIN Slide s ON s.Id = n.SlideId
                        ";

            }
        }

        private Note NewNote(SqlDataReader reader)
        {
            return new Note()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                SlideId = DbUtils.GetInt(reader, "SlideId"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                NoteText = DbUtils.GetString(reader, "Note"),
                User = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "Lastname"),
                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseId"),
                    Email = DbUtils.GetString(reader, "Email")

                },
                Slide = new Slide()
                {
                    Id = DbUtils.GetInt(reader, "SlideId"),
                    Name = DbUtils.GetString(reader, "Name"),
                    Magnification = DbUtils.GetInt(reader, "Magnification"),
                    MicroscopeId = DbUtils.GetInt(reader, "MicroscopeId"),
                    Description = DbUtils.GetString(reader, "Description"),
                    ImageUrl = DbUtils.GetString(reader,"ImageUrl")
                }

            };
        }

    }
}

