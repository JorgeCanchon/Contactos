<%@ Page Title="" Language="C#" MasterPageFile="~/App/MasterPage.Master" AutoEventWireup="true" CodeBehind="ModificarInformacionUsuario.aspx.cs" Inherits="Contactos.App.ModificarInformacionUsuario1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent1" runat="server">
    <div class="container-fluid border" style="margin-top:80px">
        <div class="panel">
		    <div class="panel-body">
			    <div class="row main">
			        <div class="main-login main-center">
                        <div class="form-group center">
						    <div class="file-field">
                                <div class="mb-4">
                                    <h2><b>Actualizar información usuario</b></h2>
                                </div>
                            </div>
					    </div>

                        <div class="form-group">
						    <div class="file-field center">
                                <div class="mb-4">
                                    <div class="pull-right">
                                        <a href="javascript:abortRead('MainContent1_avatar','MainContent1_image','MainContent1_file');" style="text-decoration:none">X</a>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <a href="#" id="imageZoom" runat="server" class="thumb">
                                        <asp:Image ImageUrl="imageurl" runat="server" ID="avatar" AlternateText="Avatar usuario" CssClass="img-circle" style="width: 150px;"  data-toggle="modal" data-target=".modal-profile-lg"/>
                                    </a>
                                </div>
                                <div style="display: inline-block;">
                                    <div>
                                        <input id="files" name="files[]" type="file"  accept="image/JPG,image/JPEG,image/PNG" class="custom-file-input" runat="server"/>
                                        <input type="hidden" id="image" name="image" value="" runat="server"/>
                                    </div>
                                </div>
                            </div>
					    </div>

					    <div class="form-group">
						    <label for="name" class="cols-sm-2 control-label">Nombre Completo</label>
						    <div class="cols-sm-10">
							    <div class="input-group">
								    <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
								    <input type="text" class="form-control" name="nombre" id="nombre"  placeholder="Ingrese su nombre completo" runat="server"/>
							    </div>
						    </div>
					    </div>

					    <div class="form-group">
						    <label for="username" class="cols-sm-2 control-label">Usuario</label>
						    <div class="cols-sm-10">
							    <div class="input-group">
								    <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
								    <input type="text" class="form-control" name="usuario" id="usuario"  placeholder="Ingrese su nombre de usuario" runat="server"/>
							    </div>
						    </div>
					    </div>

                        <div class="form-group">
						    <label for="password" class="cols-sm-2 control-label">Contraseña actual</label>
						    <div class="cols-sm-10">
							    <div class="input-group">
								    <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
								    <input type="password" class="form-control" name="oldPassword" id="oldPassword" placeholder="Ingrese su contraseña actual" runat="server"/>
							    </div>
						    </div>
					    </div>
                         
					    <div class="form-group ">
						    <button type="submit" class="btn btn-primary btn-lg btn-block login-button" runat="server" onserverclick="ActualizarInformacion_Click">Actualizar</button>
					    </div>
				    </div>
			    </div>
		    </div>
	    </div>
    </div>
    <!-- .modal-profile -->
	<div class="modal fade modal-profile" tabindex="-1" role="dialog" aria-labelledby="modalProfile" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<button class="close" type="button" data-dismiss="modal">X</button>
                        <br />
						<h3 class="modal-title"></h3>
					</div>
					<div class="modal-body" style="text-align:center">
					</div>
					<div class="modal-footer">
						<button class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
 <!--//.modal-profile -->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
