using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DopeScope.Repository
{
    public class UserRepository
    {
        // GET slide  microscope and user data
        //  @"SELECT * FROM Slide s 
        //  LEFT JOIN Microscope m ON m.id = s.MicroscopeId 
        //  LEFT JOIN [User] u ON u.id = m.UserId
        //  LEFT JOIN Note n ON n.slideId = s.id"

        // GET slides List of Tags by slide Id
        //  @"SELECT * FROM SlideTag st
        //  LEFT JOIN Slide s ON s.id = st.SlideId
        //  LEFT JOIN Tag u ON u.id = st.TagId
        //  WHERE s.id = @id"


        // GET list of slides of a mircoscope
        //  @"SELECT* FROM Slide s
        //  JOIN Microscope m ON m.id = s.MicroscopeId
        //  WHERE s.MicroscopeId = @id"

        // GET list of slides of a user
        // @"SELECT * FROM Slide s
        //    JOIN Microscope m ON m.id = s.MicroscopeId
        //    JOIN[User] u ON m.UserId = u.id
        //    WHERE u.id = @id"

        // GET list of slides by tag
        //@"SELECT * From SlideTag st
        // JOIN Slide s on s.Id = st.SlideId
        // JOIN Tag t on t.id = st.TagId
        // JOIN Microscope m ON m.Id = s.MicroscopeId
        // JOIN[User] u ON u.Id = m.UserId
        // WHERE t.id = @id"

        // GET List of notes for a slide
        // @"SELECT* FROM Note n
        //  JOIN[User] u ON u.Id = n.UserId
        //  JOIN Slide s ON s.Id = n.SlideId
        //  WHERE s.Id = 1"
    }
}
