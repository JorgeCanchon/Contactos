<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Contactos.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="dist/css/styles.css" rel="stylesheet" />
    <title>Login</title>
</head>
<body style="background-color:#FAFAFA;">
    <form id="form1" runat="server">
        <div class="container">
            <div class="row vertical-offset-100">
    	        <div class="col-md-4 col-md-offset-4">
    		        <div class="panel panel-default">
			  	        <div class="panel-heading center">
			    	        <h3 class="panel-style" title="font-weight: bold; " >Iniciar sesión</h3>
			 	        </div>
			  	        <div class="panel-body">
                            <fieldset>
			    	  	        <div class="form-group">
			    		            <input class="form-control" placeholder="Usuario" name="usuario" id="usuario" type="text" runat="server"/>
			    		        </div>
			    		        <div class="form-group">
			    			        <input class="form-control" placeholder="Contraseña" name="password" id="password" type="password" value="" runat="server"/>
			    		        </div>
			    		        <input class="btn btn-lg btn-success btn-block" type="submit" value="Entrar" runat="server" onserverclick="IniciarSesion"/>
                                <div class="checkbox">
			    	    	        <a href="Registro.aspx" >
			    	    		        Registrarse
			    	    	        </a>
			    	            </div>
			    	        </fieldset>
			            </div>
			        </div>
		        </div>
	        </div>
        </div>
    </form>

    <script src="dist/js/jquery-1.11.1.js"></script>
    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script> 
    <script src="dist/js/bootstrap.min.js"></script>
    <script src="JS/funciones.js"></script>
</body>
</html>
