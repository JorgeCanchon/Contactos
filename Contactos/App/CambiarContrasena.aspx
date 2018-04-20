<%@ Page Title="" Language="C#" MasterPageFile="~/App/MasterPage.Master" AutoEventWireup="true" CodeBehind="CambiarContrasena.aspx.cs" Inherits="Contactos.App.CambiarContrasena" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent1" runat="server">
     <div class="container-fluid border" style="margin-top:80px">
        <div class="panel">
		    <div class="panel-body">
			    <div class="row main">
			        <div class="main-login main-center">
                        <div class="form-group">
						    <div class="file-field" style="text-align: center;">
                                <div class="mb-4">
                                    <h2><b>Cambiar Contraseña</b></h2>
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

                        <div id="div_pass">
					        <div class="form-group">
						        <label for="password" class="cols-sm-2 control-label">Nueva Contraseña</label>
						        <div class="cols-sm-10">
							        <div class="input-group">
								        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
								        <input type="password" class="form-control" name="password" id="password" onchange="validatePassword('MainContent1_password','MainContent1_confirm');" placeholder="Ingrese su nueva contraseña" runat="server"/>
							        </div>
						        </div>
					        </div>

					        <div class="form-group">
						        <label for="confirm" class="cols-sm-2 control-label">Confirmar Contraseña</label>
						        <div class="cols-sm-10">
							        <div class="input-group">
								        <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
								        <input type="password" class="form-control" name="confirm" id="confirm" onkeyup="validatePassword('MainContent1_password','MainContent1_confirm');"  placeholder="Confirme su contraseña" runat="server"/>
							        </div>
						        </div>
					        </div>

                        </div>
                         
					    <div class="form-group ">
						    <button type="submit" class="btn btn-primary btn-lg btn-block login-button" runat="server" onserverclick="ActualizarContrasena">Actualizar</button>
					    </div>
                        <div class="alert alert-danger" id="validate_div" hidden="hidden">
                            <p id="validate_p"></p>
                        </div>
				    </div>
			    </div>
		    </div>
	    </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
