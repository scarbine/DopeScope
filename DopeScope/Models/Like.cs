using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DopeScope.Models
{
    public class Like
    {
        public int Id { get; set; }

        public int SlideId { get; set; }

        public Slide slide { get; set;  }
        public int UserId { get; set; }

        public UserProfile User { get; set; }
    }
}
