using Entidades;
using Logica;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Contactos.App
{
    public partial class CambiarContrasena : BasicPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void ActualizarContrasena(object sender, EventArgs e)
        {
            string _oldPassword = oldPassword.Value;
            string _password = password.Value.Trim();
            string _confirm = confirm.Value.Trim();

            UsuarioRepositorio ur = new UsuarioRepositorio();
            Usuario data = ur.ObtenerUsuario((int)Session["IdUsuario"]);

            if (data == null)
            {
                Response.Write("<script>alert('Error al cargar información de usuario.');</script>");
            }

            string mensaje = string.Empty;

            if(string.IsNullOrEmpty(_password) || string.IsNullOrEmpty(_confirm)){
                mensaje = "Todos los campos son obligatorios.";
            }if (_password.Length < 7)
            {
                mensaje = "La contraseña debe tener 7 o más caracteres";
            }
            else if (_password != _confirm)
            {
                mensaje = "Las contraseñas no coinciden";
            }
            else if (data.Contrasena != _oldPassword)
            {
                mensaje = "La contraseña actual no concuerda";
            }
            if(string.IsNullOrEmpty(mensaje)){
                if(ur.EditarPass(new Usuario{IdUsuario = (int)Session["IdUsuario"],Contrasena =_password})){
                    mensaje =  "Contraseña editada con éxito";
                    Session.RemoveAll();
                }
                else
                {
                    mensaje = "No se pudo cambiar la contraseña";
                }
            }        
            Response.Write(string.Format("<script>alert('{0}')</script>",mensaje));
            return;
        }
    }
}