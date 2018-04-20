<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Registro.aspx.cs" Inherits="Contactos.Registro" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="stylesheet" type="text/css" href="dist/css/bootstrap.css" />

		<!-- Website CSS style -->
		<link rel="stylesheet" type="text/css" href="dist/css/styleRegister.css" />

		<!-- Website Font style -->
	    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css" />
		
		<!-- Google Fonts -->
		<link href='https://fonts.googleapis.com/css?family=Passion+One' rel='stylesheet' type='text/css' />
		<link href='https://fonts.googleapis.com/css?family=Oxygen' rel='stylesheet' type='text/css' />

    <title>Registro</title>
</head>
<body>
    <div class="container">
			<div class="row main">
				<div class="main-login main-center">
					<form id="form1" runat="server" method="POST">
                        <div class="form-group">
							<div class="file-field" style="text-align: center;">
                                <div class="mb-4">
                                    <div class="pull-right">
                                        <a href="javascript:abortRead('avatar','image','file');" style="text-decoration: none">X</a>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <img src="Image/default.jpg" class="img-circle" style="width: 150px;" id="avatar"/>
                                </div>
                                <div style="display: inline-block;">
                                    <div>
                                        <input id="files" name="files[]" type="file" onchange="setImage(event,'avatar','image');" accept="image/JPG,image/JPEG,image/PNG" class="custom-file-input" />
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
							<label for="password" class="cols-sm-2 control-label">Contraseña</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" class="form-control" name="password" id="password" onchange="validatePassword('password','confirm');" placeholder="Ingrese su contraseña" runat="server"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="confirm" class="cols-sm-2 control-label">Confirmar Contraseña</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" class="form-control" name="confirm" id="confirm" onkeyup="validatePassword('password','confirm');"  placeholder="Confirme su Contraseña" runat="server"/>
								</div>
							</div>
						</div>

						<div class="form-group ">
							<button type="submit" class="btn btn-primary btn-lg btn-block login-button" runat="server" onserverclick="Register_Click">Registrar</button>
						</div>
						<div class="login-register">
				            <a href="Login.aspx">Login</a>
				         </div>
                        <div class="alert alert-danger" id="validate_div" hidden="hidden">
                            <p id="validate_p"></p>
                        </div>
					</form>
				</div>
			</div>
		</div>
    <script src="dist/js/jquery-1.11.1.js"></script>
    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="dist/js/bootstrap.js"></script>
</body>
</html>
<script src="JS/funciones.js"></script>
