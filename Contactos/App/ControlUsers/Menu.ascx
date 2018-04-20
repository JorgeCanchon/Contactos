<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Menu.ascx.cs" Inherits="Contactos.App.ControlUsers.Menu" %>
<div class="row">
    <div class="col-lg-12">
        <div>
            <asp:Label Text="<b>Bienvenido: </b>" runat="server" ID="Label_user" />
        </div>
        <nav class="navbar navbar-default" style="margin-top:15px;background-color: aliceblue;">
            <div class="container-fluid">
              <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar2">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="Default.aspx" style="padding: 5px 5px 0 0;margin-left:15px;">
                    <asp:Image ImageUrl="imageurl" runat="server" ID="Logo"  style="width:auto;height:41px;" AlternateText="Logo Contactos"/>
                </a>
              </div>
              <div id="navbar2" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                  <li><a href="../App/NuevoContacto.aspx">Nuevo <i class="fa fa-plus"></i> </a></li>
                  <li><a href="../App/ListarContacto.aspx" onclick="showLoader();">Listar <i class="fa fa-list-alt"></i></a></li>
                  <li><a href="../App/BuscarContacto.aspx">Buscar <i class="fa fa-search"></i></a></li>
                  <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style="padding: 5px 5px 0 0;"> 
                      <asp:Image ImageUrl="imageurl" runat="server" ID="avatar" AlternateText="Avatar usuario" CssClass="imgCard"/>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                      <li><a href="../App/ModificarInformacionUsuario.aspx">Infomación usuario</a></li>
                       <li><a href="../App/CambiarContrasena.aspx">Cambiar contraseña</a></li>
                      <li class="divider"></li>
                      <li><a href="javascript:void(0);" runat="server" onserverclick="CerrarSesion">Cerrar Sesión</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <!--/.nav-collapse -->
            </div>
            <!--/.container-fluid -->
          </nav>
    </div>
</div>
<div class="loader" id="loader" hidden="hidden">

</div>





