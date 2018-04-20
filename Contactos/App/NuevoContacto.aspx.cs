using Entidades;
using Logica;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Contactos.App
{
    public partial class Default : BasicPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
             if(!Page.IsPostBack){
                 CargarProfesion();
                 buttonAgregar.Attributes.Add("onclick", "javascript: if(!ValidarForm()) return false;");
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
        protected void AgregarContacto_Click(object sender, EventArgs e)
        {
            string _nombre = nombre.Value.Trim();
            string _apellido = apellido.Value.Trim();
            string _direccion = autocomplete.Value.Trim();
            string _telefono = telefono.Value.Trim();
            string avatar = string.Empty;
            string profesion = DropDownListProfesion.SelectedValue;
            string genero = DropDownListGenero.SelectedValue;

            string mensaje = string.Empty;
            if (string.IsNullOrEmpty(_nombre) || string.IsNullOrEmpty(_apellido) || string.IsNullOrEmpty(_direccion) || string.IsNullOrEmpty(_telefono) || profesion.Equals("0") || genero.Equals("0"))
            {
                mensaje = "Todos los campos son obligatorios";
            }
            else if (!file2.HasFile)
            {
                avatar = "default.jpg";
            }
            else
            {
                avatar = Server.HtmlEncode(file2.FileName);
            }

            if (string.IsNullOrEmpty(mensaje))
            {
                ContactoRepositorio cr = new ContactoRepositorio();

                string geo = string.Format("POINT({0} {1})", lat.Value.Replace(',', '.'), lng.Value.Replace(',', '.'));

                Contacto contact = new Contacto { 
                    Nombre = _nombre,
                    Apellido = _apellido,
                    Direccion = _direccion,
                    Telefono = ulong.Parse(_telefono),
                    Genero = genero,
                    Imagen = avatar,
                    Geographic = System.Data.Entity.Spatial.DbGeography.FromText(geo, 4326),
                    Codigo_Usuario = (int) Session["IdUsuario"],
                    Codigo_Profesion = int.Parse(profesion)
                };
                int Id = cr.Agregar(contact) ; 
                if(Id > 0){
                    mensaje = "Contacto agregado con éxito";
                    saveImage(Id);
                    LimpiarForm();
                }
                else
                {
                    mensaje = "No se pudo agregar este contacto";
                }
            }
            Response.Write(string.Format("<script>alert('{0}')</script>",mensaje));
        }
        private void LimpiarForm(){
            nombre.Value = "";
            apellido.Value = "";
            autocomplete.Value = "";
            telefono.Value = "";
            file2 = new FileUpload();
            DropDownListGenero.SelectedValue = "0";
            DropDownListProfesion.SelectedValue = "0";
        }
        private bool saveImage(int Id)
        {
            try
            {
                string pathRoot = System.AppDomain.CurrentDomain.BaseDirectory;

                // Specify the path on the server to
                // save the uploaded file to. 
                string savePath = pathRoot + @"\Image\Contacto\";

                string userPath = string.Format(@"{0}\User_{1}", savePath, Session["IdUsuario"]);
                //Verify that the folder does not exists
                if (!Directory.Exists(userPath))
                {
                    Directory.CreateDirectory(userPath);
                }

                savePath = userPath + @"\";

                // Get the name of the file to upload.
                string fileName = Server.HtmlEncode(file2.FileName);

                // Get the extension of the uploaded file.
                string extension = System.IO.Path.GetExtension(fileName);

                // Allow only files with .doc or .xls extensions
                // to be uploaded.
                    if ((extension == ".jpg") || (extension == ".jpeg") || (extension == ".png"))
                    {
                        string newName = savePath + string.Format("{0}_{1}",Id.ToString() , fileName);

                        // Append the name of the file to upload to the path.
                        savePath += fileName;

                        // Call the SaveAs method to save the 
                        // uploaded file to the specified path.
                        // This example does not perform all
                        // the necessary error checking.               
                        // If a file with the same name
                        // already exists in the specified path,  
                        // the uploaded file overwrites it.
                        file2.SaveAs(savePath);

                        File.Move(savePath, newName);
                        return true;
                    }else
                    {
                        return false;
                    }
            }
            catch (Exception)
            {
                return false;
            }
            
        }
    }
}