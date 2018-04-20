using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
  using System.ComponentModel.DataAnnotations;

namespace Entidades
{
    public class Profesion
    {
        public int IdProfesion { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }
    }
}
