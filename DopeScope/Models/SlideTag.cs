using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DopeScope.Models
{
    public class SlideTag
    {
        public int Id { get; set; }

        public int SlideId { get; set; }

        public Slide Slide { get; set; }

        public int TagId { get; set; }

        public Tag Tag { get; set; }
    }
}
