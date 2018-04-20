using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace Entidades
{
    public class Usuario
    {
        public int IdUsuario { get; set; }

        [StringLength(100)]
        public string Nombre { get; set; }
        public string _Usuario { get; set; }
        public string Contrasena { get; set; }
        public string Imagen { get; set; }
        public DateTime FH_creacion { get; set; }
    }
}
