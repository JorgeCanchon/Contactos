using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace Entidades
{
    public class Contacto
    {
        public int IdContacto { get; set; }
        [StringLength(100)]
        public string Nombre { get; set; }
        [StringLength(100)]
        public string Apellido { get; set; }
        [StringLength(100)]
        public string Direccion { get; set; }
        public ulong Telefono { get; set; }
        [StringLength(1)]
        public string Genero { get; set; }
        public string Imagen { get; set; }
        public System.Data.Entity.Spatial.DbGeography Geographic { get; set; }
        public System.DateTime FH_creacion { get; set; }
        public int Codigo_Usuario { get; set; }
        public int Codigo_Profesion{get;set;}
    }
}
