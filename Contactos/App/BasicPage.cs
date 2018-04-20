using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Contactos.App
{
    public abstract class BasicPage: System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);
            if(Session["IdUsuario"] == null)
                Response.Redirect("../");
        }
        protected void CerrarSesion()
        {
            Session.RemoveAll();
            Response.Redirect("../");
        }
    }
}