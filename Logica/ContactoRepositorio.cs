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
    public class ContactoRepositorio: Repositorio<Contacto>
    {
        public int Agregar(Contacto contacto)
        {
            string[] nombreParametro = new string[] { "@Nombre", "@Apellido", "@Direccion", "@Telefono", "@Genero", "@Imagen", "@lat", "@lng", "@Codigo_Usuario", "@Codigo_Profesion" };
            string lat = contacto.Geographic.Latitude.ToString().Replace(',', '.');
            string lng = contacto.Geographic.Longitude.ToString().Replace(',', '.');
            string[] parametro = new string[] { contacto.Nombre, contacto.Apellido, contacto.Direccion, contacto.Telefono.ToString(), contacto.Genero, contacto.Imagen, lat, lng, contacto.Codigo_Usuario.ToString(), contacto.Codigo_Profesion.ToString() };
            return base.GetId("ADDCONTACT", nombreParametro, parametro);
        }
        public bool Modificar(Contacto contacto)
        {
            string[] nombreParametro = new string[] { "@ID", "@Nombre", "@Apellido", "@Direccion", "@Telefono", "@Genero", "@Imagen", "@lat", "@lng", "@Codigo_Profesion" };
            string lat = contacto.Geographic.Latitude.ToString().Replace(',', '.');
            string lng = contacto.Geographic.Longitude.ToString().Replace(',', '.');
            string[] parametro = new string[] { contacto.IdContacto.ToString(), contacto.Nombre, contacto.Apellido, contacto.Direccion, contacto.Telefono.ToString(), contacto.Genero, contacto.Imagen, lat, lng, contacto.Codigo_Profesion.ToString() };
            if (base.EjecutarSP("UPDATECONTACT", nombreParametro, parametro) > 0)
            {
                return true;
            }
            return false;
        }
        public DataTable ObtenerContactos(int id)
        {
            string[] nombreParametro = new string[] {"@ID"};
            string[] parametro = new string[] {id.ToString()};
            DataTable data = GetDataSP("GetContactos",nombreParametro, parametro);
            if(data.Rows.Count <= 0)
                return null;
            return data;
        }
        public bool DeleteContact(int id){
            string[] nombreParametro = new string[] {"@ID"};
            string[] parametro = new string[] {id.ToString()};
            if (base.EjecutarSP("DELETECONTACT",nombreParametro, parametro) > 0)
            {
                return true;
            }
            return false;
        }
        //Obtiene los contactos que cumplan con los parámetros de búsqueda dados por el usuario.
        public DataTable ObtenerContacto(string consulta)
        {
            DataTable result = base.Obtener(consulta);
            if (result.Rows.Count <= 0)
                return null;
            return result;
        }
        public Contacto ObtenerContacto(int IdUsuario, int IdContacto)
        {
            string[] nombreParametro = new string[] { "@IdUsuario" ,"@IdContacto" };
            string[] parametro = new string[] { IdUsuario.ToString(), IdContacto.ToString() };

            DataTable result = GetDataSP("GetContacto", nombreParametro, parametro);
            if (result.Rows.Count <= 0)
                return null;
            DataRow data = result.Rows[0];

            return new Contacto
            {
                IdContacto = (int)data["IdContacto"],
                Nombre = (string)data["Nombre"],
                Apellido = (string)data["Apellido"],
                Direccion = (string)data["Direccion"],
                Telefono = ulong.Parse(data["Telefono"].ToString()),
                Genero= (string)data["Genero"],
                Imagen = (string)data["Imagen"],
                Geographic = (System.Data.Entity.Spatial.DbGeography)(System.Data.Entity.Spatial.DbGeography.FromText(data["Geography"].ToString(), 4326)),
                Codigo_Usuario = (int)data["Codigo_usuario"],
                Codigo_Profesion = (int)data["Codigo_Profesion"]
            };
        }
    }
}
