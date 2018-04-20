using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using Entidades;
namespace Datos.Repositorio
{
    public abstract class Repositorio<T>
    {
        private SqlConnection conexion;

        public Repositorio()
        {
            string cadenaConexion = ConfigurationManager.ConnectionStrings["Entities"].ConnectionString;
            Conexion = new SqlConnection(cadenaConexion);
        }
        private SqlConnection Conexion
        {
            get { return conexion; }
            set { conexion = value; }
        }
        protected DataTable Obtener(string sql)
        {
            VerificarConexion();
            using (SqlCommand command = new SqlCommand(sql, Conexion))
            {
                /**
                 * command.Connection = Conexion;
                 * commad.CommandType = CommanType.Text;
                 * command.CommandText = sql;
                 */
                SqlDataAdapter sqlAdapter = new SqlDataAdapter(command);
                DataTable dataTable = new DataTable();
                sqlAdapter.Fill(dataTable);
                desconectar();
                return dataTable;
            }
        }
        private void VerificarConexion()
        {
            if(Conexion.State != ConnectionState.Open)
                    Conexion.Open();
        }
        protected void EjecutarComando(string sql)
        {
            VerificarConexion();
            using (SqlCommand command = new SqlCommand(sql, Conexion))
            {
                command.ExecuteNonQuery();
            }
        
        }
        protected int EjecutarSP(string nombreSP, string[] nombreParametro, string[] parametro)
        {
            VerificarConexion();
            using (SqlCommand command = new SqlCommand())
            {
                command.Connection = Conexion;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = nombreSP;
                for (int i = 0; i < nombreParametro.Length; i++)
                {
                    command.Parameters.AddWithValue(nombreParametro[i],parametro[i]);  
                }
                return command.ExecuteNonQuery();
            }
        }
        protected DataTable GetDataSP(string nombreSP, string[] nombreParametro, string[] parametro)
        {
            VerificarConexion();
            using (SqlCommand command = new SqlCommand())
            {      
                command.Connection = Conexion;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = nombreSP;
                for (int i = 0; i < nombreParametro.Length; i++)
                {
                    command.Parameters.AddWithValue(nombreParametro[i], parametro[i]);
                }
                using (SqlDataAdapter da = new SqlDataAdapter(command)) { 
                    DataTable data = new DataTable();
                    da.Fill(data);
                    desconectar();
                    return data;
                }
            }
        }
        //Ejecuta un SP y retorna el valor devuelvo por este
        protected int GetId(string nombreSP, string[] nombreParametro, string[] parametro)
        {
            VerificarConexion();
            using (SqlCommand command = new SqlCommand()) { 
                command.Connection = Conexion;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = nombreSP;
                for (int i = 0; i < nombreParametro.Length; i++)
                {
                    command.Parameters.AddWithValue(nombreParametro[i], parametro[i]);
                }
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    try
                    {
                        reader.Read();
                        int NewId = int.Parse(reader[0].ToString()); 
                       // reader.Dispose();
                        desconectar();
                        return NewId;
                    }catch(Exception){
                        return -1;
                    }     
                }
            }
        }
        private void desconectar()
        {
            if (Conexion.State == ConnectionState.Open)
                Conexion.Close();
        }
    }
}
