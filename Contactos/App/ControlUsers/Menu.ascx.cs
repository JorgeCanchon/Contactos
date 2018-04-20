using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Contactos.App.ControlUsers
{
    public partial class Menu : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!Page.IsPostBack){
                Logo.ImageUrl = "../../Image/logoContacto.jpg";
                avatar.ImageUrl = (string)Session["Avatar"];
                Label_user.Text += (string)Session["NameUser"];
            }
        }
        protected void CerrarSesion(object sender, EventArgs e)
        {
            Session.RemoveAll();
            Response.Redirect("../Login.aspx");
        }
    }
}