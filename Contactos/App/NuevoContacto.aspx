<%@ Page Title="" Language="C#" MasterPageFile="~/App/MasterPage.Master" AutoEventWireup="true" CodeBehind="NuevoContacto.aspx.cs" Inherits="Contactos.App.Default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent1" runat="server">
        <div class="row" style="align-content:center;margin-right:  10px;margin-left:  10px;">
            <div class="col-lg-12">
                <div class="col-lg-4">
                   <h2><b>Agregar Contacto</b></h2>
                </div>
            </div>
            <div class="col-lg-12 ">
                <div class="col-lg-4 border" id="div_agregar">
                    <div class="panel">
		                <div class="panel-body">
			                <div class="row main">
			                    <div class="main-login main-center">
                                     
					                <div class="form-group">
						                <label for="name" class="cols-sm-2 control-label">Nombre</label>
						                <div class="cols-sm-10">
							                <div class="input-group">
								                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
								                <input type="text" class="form-control" name="nombre" id="nombre"  placeholder="Ingrese nombre" runat="server"/>
							                </div>
						                </div>
					                </div>


                                    <div class="form-group">
						                <label for="name" class="cols-sm-2 control-label">Apellidos</label>
						                <div class="cols-sm-10">
							                <div class="input-group">
								                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
								                <input type="text" class="form-control" name="apellido" id="apellido"  placeholder="Ingrese apellidos" runat="server"/>
							                </div>
						                </div>
					                </div>

					                <div class="form-group">
						                <label for="username" class="cols-sm-2 control-label">Dirección</label>
						                <div class="cols-sm-10">
							                <div class="input-group">
								                <span class="input-group-addon"><i class="fa fa-pencil fa" aria-hidden="true"></i></span>
								                <input type="text" class="form-control" name="direccion" id="autocomplete" placeholder="Ingrese dirección" runat="server" autocomplete="off"/>
                                                <input type="hidden" name="lng" id="lng" value="" runat="server"/>
                                                <input type="hidden" name="lat" id="lat" value="" runat="server"/>
							                </div>
						                </div>
					                </div>

                                    <div class="form-group">
						                <label for="password" class="cols-sm-2 control-label">Teléfono</label>
						                <div class="cols-sm-10">
							                <div class="input-group">
								                <span class="input-group-addon"><i class="fa fa-phone fa-lg"  aria-hidden="true"></i></span>
								                <input type="tel" class="form-control" name="telefono" id="telefono" placeholder="Ingrese teléfono" runat="server"/>
							                </div>
						                </div>
					                </div>

                                    <div class="form-group">
						                <label for="password" class="cols-sm-2 control-label">Imagen</label>
						                <div class="cols-sm-10">
							                <div class="input-group">
								                <span class="input-group-addon"><i class="fa fa-picture-o fa-lg"  aria-hidden="true"></i></span>
                                                <asp:FileUpload id="file2" accept="image/JPG,image/JPEG,image/PNG"
                                                    runat="server" CssClass="form-control"> 
                                                </asp:FileUpload>
                                                <span class="input-group-addon" onclick="abortRead('','','MainContent1_file2')"><i class="fa fa-window-close fa-lg"  aria-hidden="true"></i></span>
							                </div>
						                </div>
					                </div>

                                    <div class="form-group">
						                <label for="password" class="cols-sm-2 control-label">Profesión</label>
						                <div class="cols-sm-10">
							                <div class="input-group">
								                <span class="input-group-addon"><i class="fa fa-book fa-lg" aria-hidden="true"></i></span>
                                                <asp:DropDownList ID="DropDownListProfesion" runat="server" CssClass="form-control">
                                                    <asp:ListItem Value="0">Seleccione</asp:ListItem>
                                                </asp:DropDownList>
							                </div>
						                </div>
					                </div>

                                    <div class="form-group">
						                <label for="password" class="cols-sm-2 control-label">Género</label>
						                <div class="cols-sm-10">
							                <div class="input-group">
								                <span class="input-group-addon"><i class="fa fa-venus-mars fa-lg" aria-hidden="true"></i></span>
                                                <asp:DropDownList ID="DropDownListGenero" runat="server" CssClass="form-control">
                                                    <asp:ListItem Value="0">--Seleccione género--</asp:ListItem>
                                                        <asp:ListItem Value="M">Masculino</asp:ListItem>
                                                        <asp:ListItem Value="F">Femenino</asp:ListItem>
                                                </asp:DropDownList>
							                </div>
						                </div>
					                </div>

					                <div class="form-group ">
						                <asp:Button type="submit" ID="buttonAgregar" CssClass="btn btn-primary btn-lg btn-block login-button" runat="server" Text="Agregar"  onClick="AgregarContacto_Click" />
					                </div>
                                    <div class="alert alert-danger" id="validate_div" hidden="hidden">
                                        <p id="validate_p"></p>
                                    </div>
				                </div>
			                </div>
		                </div>
	                </div> 
                </div>
                <div class="col-lg-8 border" id="map" runat="server">
                    
                </div>
            </div>
        </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script async="async" defer="defer"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBprTqFBiMFOQTGJvnvhP2fZ3Swa1NEJwQ&libraries=drawing,places">
    </script><!--&callback=initMap-->
</asp:Content>


