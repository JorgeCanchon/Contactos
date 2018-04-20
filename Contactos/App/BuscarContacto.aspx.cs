using Logica;
using Newtonsoft;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Contactos.App
{
    public partial class BuscarContacto : BasicPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                CargarProfesion();
                ViewState["Consulta"] = null;
                LoadGrid();
            }
        }
        private void CargarProfesion()
        {
            ProfesionRepositorio pr = new ProfesionRepositorio();
            DataTable data = pr.ObtenerProfesion();
            DropDownListProfesion.DataSource = data;
            DropDownListProfesion.DataTextField = data.Columns["Nombre"].ToString();
            DropDownListProfesion.DataValueField = data.Columns["IdProfesion"].ToString();
            DropDownListProfesion.DataBind();
            DropDownListProfesion.Items.Insert(0, new ListItem("--Seleccione Profesión--", "0"));
        }
        protected void GridView_Contacto_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            ContactoRepositorio cr = new ContactoRepositorio();
            string id = this.GridView_Buscar.DataKeys[e.RowIndex].Values[0].ToString();
            if (cr.DeleteContact(int.Parse(id)))
            {
                LoadGrid();
                UpdatePanel1.Update();
                DeleteImage(id);
            }
        }
        private void LoadGrid()
        {
            GridView_Buscar.DataSource = (DataTable)ViewState["Consulta"];
            GridView_Buscar.EmptyDataText = "No hay resultados disponibles.";
            GridView_Buscar.DataBind();
        }
        private void DeleteImage(string idContacto)
        {
            //
            string pathRoot = System.AppDomain.CurrentDomain.BaseDirectory;

            // Specify the path on the server.
            string savePath = pathRoot + @"\Image\Contacto\";

            string userPath = string.Format(@"{0}\User_{1}", savePath, Session["IdUsuario"]);

            DirectoryInfo di = new DirectoryInfo(userPath);
            foreach (var fi in di.GetFiles(string.Format("{0}*", idContacto)))
            {
                File.Delete(userPath + @"\" + fi.Name);
            }
        }
        protected void Search(object sender, EventArgs e)
        {
            string codigoProfesion = DropDownListProfesion.SelectedValue,
            genero = DropDownListGenero.SelectedValue,
            direccion = autocomplete.Value,
            _lat = lat.Value,
            _lng = lng.Value,
            _radio = radio.Value;
            string ResultJson = string.Empty;
            if (string.IsNullOrEmpty(direccion) && string.IsNullOrEmpty(_lat) && string.IsNullOrEmpty(_lng) && codigoProfesion.Equals("0") && genero.Equals("0") && string.IsNullOrEmpty(_lat) && string.IsNullOrEmpty(_lng) && string.IsNullOrEmpty(_radio))
            {
                ViewState["Consulta"] = null;
            }
            else
            {
                string sql = string.Format(
                "SELECT IdContacto,CONCAT(Apellido,'-',c.Nombre)   NombreCompleto,Imagen, Direccion, Telefono, Genero = (CASE Genero WHEN 'M' THEN 'Masculino' WHEN 'F' THEN 'Femenino' END),p.Nombre Profesion, Geography " +
                " FROM Contacto c" +
                " INNER JOIN Profesion p" +
                " ON  p.IdProfesion = c.Codigo_Profesion" +
                " WHERE Codigo_Usuario = {0} ", ((int)Session["IdUsuario"]).ToString());

                if (!string.IsNullOrEmpty(codigoProfesion) && !codigoProfesion.Equals("0"))
                {
                    sql += " and Codigo_Profesion = " + codigoProfesion;
                }

                if (!string.IsNullOrEmpty(genero) && !genero.Equals("0"))
                {
                    sql += " and Genero = '" + genero + "' ";
                }

                if (!string.IsNullOrEmpty(direccion) && !string.IsNullOrEmpty(_lat) && !string.IsNullOrEmpty(_lng) && !string.IsNullOrEmpty(_radio))
                {
                    sql += string.Format(" and geography::STGeomFromText('POINT({0} {1})', 4326).STDistance(Geography) <= {2} ", _lng, _lat, _radio);
                }

                ContactoRepositorio cr = new ContactoRepositorio();
                DataTable data = cr.ObtenerContacto(sql);
                ViewState["Consulta"] = data;
                
                if (data != null && data.Rows.Count > 0)
                {
                    JArray array = new JArray();
                    foreach (DataRow dr in data.Rows)
                    {
                        JObject item = new JObject();
                        item.Add("ID", dr[0].ToString());
                        item.Add("Geozona",dr[7].ToString());
                        array.Add(item);
                    }
                    ResultJson = array.ToString();
                }
            }
            LoadGrid();
            UpdatePanel1.Update();
            dataGeographic.Value = ResultJson;
            ScriptManager.RegisterStartupScript(this.UpdatePanel1, this.GetType(), "LoadMap", "LoadMapSearch()", true);
        }
        public string GetSrcImage(string name, int id)
        {
            if ((string)Eval("Imagen") == "default.jpg")
            {
                return "/Image/" + name;
            }
            else
            {
                return string.Format("/../Image/Contacto/User_{0}/{1}_{2}", (int)Session["IdUsuario"], id.ToString(), name);
            }
        }
        protected void GridView_Buscar_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            GridView_Buscar.PageIndex = e.NewPageIndex;
            LoadGrid();
            GridView_Buscar.DataBind();
            UpdatePanel1.Update();
        }

        [System.Web.Services.WebMethod]
        public static string GetInfo(int id)
        {
            string mensaje = "false";
            ContactoRepositorio cr = new ContactoRepositorio();
            string sql = string.Format(
            "SELECT IdContacto,CONCAT(c.Nombre,' ',Apellido) NombreCompleto,Imagen, Direccion, Telefono, Genero = (CASE Genero WHEN 'M' THEN 'Masculino' WHEN 'F' THEN 'Femenino' END),p.Nombre Profesion, Codigo_Usuario " +
            " FROM Contacto c" +
            " INNER JOIN Profesion p" +
            " ON  p.IdProfesion = c.Codigo_Profesion" +
            " WHERE IdContacto = {0}",id);
            DataTable data = cr.ObtenerContacto(sql);
            if (data != null && data.Rows.Count > 0)
            {
                JArray array = new JArray();
                foreach (DataRow dr in data.Rows)
                {
                    JObject item = new JObject();
                    item.Add("ID", dr[0].ToString());
                    item.Add("Nombre", dr[1].ToString());
                    item.Add("Imagen", GetSrcImageAjax( dr[2].ToString(), id, dr[7].ToString() ));
                    item.Add("Direccion", dr[3].ToString());
                    item.Add("Telefono", dr[4].ToString());
                    item.Add("Genero", dr[5].ToString());
                    item.Add("Profesion", dr[6].ToString());

                    array.Add(item);
                }
                mensaje = array.ToString();
            }
            return mensaje;
        }
        public static string GetSrcImageAjax(string name, int id, string codigoUsuario)
        {
            if (name == "default.jpg")
            {
                return "/Image/" + name;
            }
            else
            {
                return string.Format("/../Image/Contacto/User_{0}/{1}_{2}", codigoUsuario, id.ToString(), name);
            }
        }
        protected void gvContact_Sorting(object sender, GridViewSortEventArgs e)
        {
            DataTable dt = (DataTable)ViewState["Consulta"];
            string SortDir = string.Empty;
            if (dir == SortDirection.Ascending)
            {
                dir = SortDirection.Descending;
                SortDir = "Desc";
            }
            else
            {
                dir = SortDirection.Ascending;
                SortDir = "Asc";
            }
            DataView sortedView = new DataView(dt);
            sortedView.Sort = string.Format("{0} {1}", e.SortExpression, SortDir);
            GridView_Buscar.DataSource = sortedView;
            GridView_Buscar.DataBind();
        }
        public SortDirection dir
        {
            get
            {
                if (ViewState["dirState"] == null)
                {
                    ViewState["dirState"] = SortDirection.Ascending;
                }
                return (SortDirection)ViewState["dirState"];
            }

            set
            {
                ViewState["dirState"] = value;
            }

        }
    }
}
