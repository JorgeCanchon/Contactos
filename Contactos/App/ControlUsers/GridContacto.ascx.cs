using Logica;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
namespace Contactos.App.ControlUsers
{
    public partial class GridContacto : System.Web.UI.UserControl
    {
        //public GridView gr = new GridView();
        //public UpdatePanel up = new UpdatePanel();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                LoadGrid();
            }
        }
        private void LoadGrid()
        {
            ContactoRepositorio cr = new ContactoRepositorio();
            ViewState["Consulta"] = cr.ObtenerContactos((int)Session["IdUsuario"]); 
            GridView_Contacto.DataSource = (DataTable)ViewState["Consulta"]; 
            GridView_Contacto.EmptyDataText = "No hay resultados disponibles.";
            GridView_Contacto.DataBind();
        }
        protected void GridView_Contacto_RowDeleting(object sender, GridViewDeleteEventArgs e)
        {
            ContactoRepositorio cr = new ContactoRepositorio();
            string id = this.GridView_Contacto.DataKeys[e.RowIndex].Values[0].ToString();
            if (cr.DeleteContact(int.Parse(id)))
            {
                LoadGrid();
                UpdatePanel1.Update();
                DeleteImage(id);
            }
        }
        private void DeleteImage(string idContacto)
        {
            //
            string pathRoot = System.AppDomain.CurrentDomain.BaseDirectory;

            // Specify the path on the server.
            string savePath = pathRoot + @"\Image\Contacto\";

            string userPath = string.Format(@"{0}\User_{1}", savePath, Session["IdUsuario"]);

            DirectoryInfo di = new DirectoryInfo(userPath);
            foreach (var fi in di.GetFiles(string.Format("{0}*",idContacto)))
            {
                 File.Delete(userPath + @"\" + fi.Name );
            }
        }
        protected void GridView_Contacto_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            GridView_Contacto.PageIndex = e.NewPageIndex;
            LoadGrid();
            GridView_Contacto.DataBind();
            UpdatePanel1.Update();
        }

        protected void PageDropDownList_SelectedIndexChanged(object sender, EventArgs e)
        {
            //  Recupera la fila.
            GridViewRow pagerRow = GridView_Contacto.BottomPagerRow;
            //  Recupera el control DropDownList...
            DropDownList pageList = ((DropDownList)(pagerRow.Cells[0].FindControl("PageDropDownList")));
            GridView_Contacto.PageIndex = pageList.SelectedIndex;
            LoadGrid();
            GridView_Contacto.DataBind();
            UpdatePanel1.Update();
        }
        public string GetSrcImage(string name, int id)
        {
            if((string)Eval("Imagen") == "default.jpg"){
                return "/Image/" + name;
            }else{
                return string.Format("/../Image/Contacto/User_{0}/{1}_{2}", (int)Session["IdUsuario"], id.ToString(), name);
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
            GridView_Contacto.DataSource = sortedView;
            GridView_Contacto.DataBind();
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