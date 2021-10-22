using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DopeScope.Models
{
    public class Microscope
    {
        public int Id { get; set; }

        public string Make { get; set; }

        public string Model { get; set; }

        public int UserId { get; set; }
        public string ImageUrl { get; set; }

        public UserProfile User { get; set; }
    }
}
