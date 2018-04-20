using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Entidades;
using Datos;
using Logica;

namespace Contactos
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack){

            }
        }
        protected void IniciarSesion(object sender, EventArgs e)
        {
            string _usuario = usuario.Value.Trim();
            string _password = password.Value.Trim();
            if (string.IsNullOrEmpty(_usuario) || string.IsNullOrEmpty(_password))
            {
                Response.Write("<script>alert('Los campos no pueden estar vacios');</script>");
                return;
            }

            UsuarioRepositorio ur = new UsuarioRepositorio();

            Usuario data = ur.IniciarSesion(new Usuario
                {
                    _Usuario = _usuario,
                    Contrasena = _password
                });
            if(data == null){
                Response.Write("<script>alert('Usuario o contraseña incorrectos')</script>");
                return;
            }else{
                Session["NameUser"] = data.Nombre;
                Session["Avatar"] = data.Imagen;
                Session["IdUsuario"] = data.IdUsuario;
                Response.Redirect("App/NuevoContacto.aspx");
            }
        }
    }
}