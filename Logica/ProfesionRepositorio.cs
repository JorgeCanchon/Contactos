using Datos.Repositorio;
using Entidades;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica
{
    public class ProfesionRepositorio: Repositorio<Profesion>
    {
        public DataTable ObtenerProfesion()
        {
            DataTable result = Obtener("SELECT * FROM Profesion");
            if (result.Rows.Count <= 0)
                return null;

            return result;
        }
    }
}
