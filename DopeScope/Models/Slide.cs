using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DopeScope.Models
{
    public class Slide
    {

        public int Id { get; set; }

        public int Magnification { get; set; }

        public DateTime DateCreated { get; set; }

        public int MicroscopeId { get; set; }

        public Microscope Microscope { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }


    }
}
