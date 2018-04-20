using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entidades;
using Datos.Repositorio;
using System.Data;
namespace Logica
{
    public class UsuarioRepositorio : Repositorio<Usuario>
    {
        public string Agregar(Usuario usuario) 
        {
            string[] nombreParametro = new string[]{"@Nombre","@Usuario","@Contrasena","@Imagen"};
            string[] parametro = new string[]{usuario.Nombre,usuario._Usuario,usuario.Contrasena,usuario.Imagen};
            if (base.EjecutarSP("ADDUSER", nombreParametro, parametro) > 0)
            {
                return "Usuario agregado con éxito";
            }
            return "No se pudo agregar este usuario";
        }
        public string Editar(Usuario usuario)
        {
            string[] nombreParametro = new string[] {"@ID", "@Nombre", "@Usuario", "@Imagen" };
            string[] parametro = new string[]{ usuario.IdUsuario.ToString() ,usuario.Nombre, usuario._Usuario, usuario.Imagen };
            if (base.EjecutarSP("UPDATEUSER", nombreParametro, parametro) > 0)
            {
                return "Usuario editado con éxito";
            }
            return "No se pudo editar este usuario";
        }
        public bool EditarPass(Usuario usuario)
        {
            string[] nombreParametro = new string[] { "@ID", "@Contrasena"};
            string[] parametro = new string[] { usuario.IdUsuario.ToString(), usuario.Contrasena};
            if (base.EjecutarSP("EDITPASS", nombreParametro, parametro) > 0)
            {
                return true;
            }
            return false;
        }
        public bool VerificarUsuario(Usuario usuario)
        {
            DataTable dt = Obtener(string.Format("SELECT * FROM Usuario WHERE Usuario = '{0}'",usuario._Usuario));
            if (dt.Rows.Count > 0)
                return true;

           return false;
        }
        public Usuario ObtenerUsuario(int id)
        {
            DataTable result = Obtener(string.Format("SELECT * FROM Usuario WHERE IdUsuario = '{0}'", id));
            if (result.Rows.Count <= 0)
                return null;
            DataRow data = result.Rows[0];
            return new Usuario
            {
                IdUsuario = (int)data["IdUsuario"],
                Nombre = (string)data["Nombre"],
                _Usuario = (string)data["Usuario"],
                Contrasena = (string)data["Contrasena"],
                Imagen = (string)System.Text.ASCIIEncoding.ASCII.GetString((byte[])data["Imagen"]),
            };
        }
        public Usuario IniciarSesion(Usuario usuario)
        {
            string sql = string.Format("SELECT * FROM Usuario WHERE Usuario = '{0}' AND Contrasena = '{1}'",usuario._Usuario,usuario.Contrasena);
            DataTable resultados = base.Obtener(sql);
            if(resultados.Rows.Count <= 0)
                return null;
            DataRow data = resultados.Rows[0];
            return new Usuario
            {
                IdUsuario = (int)data["IdUsuario"],
                Nombre = (string)data["Nombre"],
                _Usuario = (string)data["Usuario"],
                Contrasena = (string)data["Contrasena"],
                Imagen = (string) System.Text.ASCIIEncoding.ASCII.GetString((byte[])data["Imagen"]),
            };
        }
    }
}
