<%@ Page Title="" Language="C#" MasterPageFile="~/App/MasterPage.Master" AutoEventWireup="true" CodeBehind="BuscarContacto.aspx.cs" Inherits="Contactos.App.BuscarContacto" %>
<%@ Register TagPrefix="grid" TagName="Grid" Src="~/App/ControlUsers/GridContacto.ascx" %> 
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent1" runat="server">
    <div class="row" style="align-content:center;margin-right:  10px;margin-left:  10px;">
            <div class="col-lg-12">
                <div class="col-lg-4">
                   <h2><b>Buscar Contactos</b></h2>
                </div>
                <div class="col-lg-8">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#MainContent1_lista" data-toggle="tab">Lista</a></li>
                        <li><a href="#MainContent1_map" data-toggle="tab">Mapa</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-12 ">
                <div class="col-lg-4 border" id="div_agregar">
                    <div class="panel">
		                <div class="panel-body">
			                <div class="row main">
						        <div class="col-lg-12">
							        <div class="input-group">
								        <span class="input-group-addon"><label for="DropDownListProfesion" class="cols-sm-2 control-label">Profesión</label></span>
                                        <asp:DropDownList ID="DropDownListProfesion" runat="server" CssClass="form-control">
                                            <asp:ListItem Value="0">Seleccione</asp:ListItem>
                                        </asp:DropDownList>
							        </div>
						        </div>

                                <div class="col-lg-12">
                                    &nbsp;
                                </div>

						        <div class="col-lg-12">
							        <div class="input-group">
								        <span class="input-group-addon"><label for="DropDownListGenero" class="cols-sm-2 control-label">Género &nbsp;&nbsp;&nbsp;</label></span>
                                        <asp:DropDownList ID="DropDownListGenero" runat="server" CssClass="form-control">
                                            <asp:ListItem Value="0">--Seleccione género--</asp:ListItem>
                                                <asp:ListItem Value="M">Masculino</asp:ListItem>
                                                <asp:ListItem Value="F">Femenino</asp:ListItem>
                                        </asp:DropDownList>
							        </div>
						        </div>

                                 <div class="col-lg-12">
                                    &nbsp;
                                </div>

						        <div class="col-lg-12">
							        <div class="input-group">
								        <span class="input-group-addon"><label for="username" class="cols-sm-2 control-label">Dirección</label></span>
								        <input type="text" class="form-control" name="direccion" id="autocomplete" placeholder="Ingrese dirección" runat="server" autocomplete="off"/>
                                        <input type="hidden" name="lng" id="lng" value="" runat="server"/>
                                        <input type="hidden" name="lat" id="lat" value="" runat="server"/>
                                        <input type="hidden" name="radio" id="radio" value="" runat="server"/>
							        </div>
						        </div>

                                 <div class="col-lg-12">
                                    &nbsp;
                                </div>

                                <div class="form-group">
                                    <div class="col-lg-12 border" id="mapSearch" runat="server" style="height: 300px;">
                    
                                    </div>
                                </div>

                                <div class="col-sm-12">
                                    &nbsp;
                                </div>
                                <asp:Button ID="buttonAgregar" Text="Buscar" runat="server" CssClass="btn btn-primary btn-lg btn-block login-button" type="submit" OnClientClick="validateDirection()" OnClick="Search"/>
			                </div>
		                </div>
	                </div> 
                </div>
                <div class="tab-content">        
                    <div class="col-lg-8 border tab-pane fade in active" id="lista" runat="server">
                        <div class="col-lg-12">
                            &nbsp;
                        </div>
                        <div class="col-lg-12">
                            &nbsp;
                        </div>
                        <div class="table-responsive">
                            <asp:UpdateProgress runat="server" ID="UpdateProgress1" AssociatedUpdatePanelID="UpdatePanel1">
                                <ProgressTemplate>
                                    <div class="loader" id="loader" runat="server"></div>
                                </ProgressTemplate>
                            </asp:UpdateProgress>
                            <asp:UpdatePanel runat="server" ID="UpdatePanel1" UpdateMode="Conditional">
                                <Triggers>
                                    <asp:AsyncPostBackTrigger ControlID="buttonAgregar" EventName="Click"/>   
                                </Triggers>   
                                <ContentTemplate>
                                    <asp:GridView runat="server" ID="GridView_Buscar"
                                        AutoGenerateColumns="False"  
                                        datakeynames="IdContacto" 
                                        CssClass="table table-bordered bs-table" 
                                        OnRowDeleting="GridView_Contacto_RowDeleting" 
                                        AllowPaging="True" PageSize="5" OnPageIndexChanging="GridView_Buscar_PageIndexChanging"
                                        EnableSortingAndPagingCallbacks="true"
                                        OnSorting="gvContact_Sorting" AllowSorting="true" > 
                                        <PagerStyle CssClass="pagination-ys" />
                                        <EmptyDataRowStyle BackColor="aliceblue" CssClass="center"/>

                                        <Columns>

                                            <asp:BoundField DataField="IdContacto"
                                                Readonly="false"      
                                                HeaderText="Id Contacto" 
                                                SortExpression="IdContacto"
                                                HeaderStyle-CssClass="center" ItemStyle-CssClass="center">
                                                <HeaderStyle CssClass="center" />
                                                <ItemStyle CssClass="center" />
                                            </asp:BoundField>

                                            <asp:BoundField DataField="NombreCompleto"
                                                Readonly="false"      
                                                HeaderText="Nombre" 
                                                SortExpression="NombreCompleto"
                                                HeaderStyle-CssClass="center"  ItemStyle-CssClass="center">
                                                <HeaderStyle CssClass="center" />
                                            </asp:BoundField>

                                            <asp:TemplateField HeaderText="Imagen" HeaderStyle-CssClass="center" ItemStyle-CssClass="center">
                                                <ItemTemplate>
                                                    <a href="#" id="imageZoom" runat="server" >
                                                        <asp:Image id="Image1" runat="server"
                                                            AlternateText="Avatar usuario"
                                                            ImageUrl='<%#  @"/.."+GetSrcImage((string)Eval("Imagen"),(int)Eval("IdContacto")) %>' CssClass="img-circle" Width="50" 
                                                            data-toggle="modal" data-target=".modal-profile-lg"
                                                            onclick="verModal(event,this.id);"
                                                            />
                                                    </a>      
                                                </ItemTemplate>  
                                                <HeaderStyle CssClass="center" />
                                                <ItemStyle CssClass="center" />
                                            </asp:TemplateField>

                                            <asp:BoundField DataField="Direccion"
                                                Readonly="false"      
                                                HeaderText="Dirección"
                                                SortExpression="Direccion"
                                                HeaderStyle-CssClass="center" ItemStyle-CssClass="center">
                                                <HeaderStyle CssClass="center" />
                                                <ItemStyle CssClass="center" />
                                            </asp:BoundField>
                        
                                            <asp:BoundField DataField="Telefono"
                                                Readonly="false"      
                                                HeaderText="Teléfono"
                                                SortExpression="Telefono"
                                                HeaderStyle-CssClass="center" ItemStyle-CssClass="center">
                                            <HeaderStyle CssClass="center" />
                                            <ItemStyle CssClass="center" />
                                            </asp:BoundField>

                                            <asp:BoundField DataField="Genero"
                                                Readonly="false"      
                                                HeaderText="Género" 
                                                SortExpression="Genero"
                                                HeaderStyle-CssClass="center" ItemStyle-CssClass="center">
                                                <HeaderStyle CssClass="center" />
                                                <ItemStyle CssClass="center" />
                                            </asp:BoundField>
                        
                                            <asp:BoundField DataField="Profesion"
                                                Readonly="false"      
                                                HeaderText="Profesión" 
                                                SortExpression="Profesion"
                                                HeaderStyle-CssClass="center" ItemStyle-CssClass="center">
                                                <HeaderStyle CssClass="center" />
                                                <ItemStyle CssClass="center" />
                                            </asp:BoundField>

                                            <asp:TemplateField ShowHeader="False" ItemStyle-CssClass="center" HeaderStyle-Width="10%">
                                                <ItemTemplate>
                                                    <a href="/App/EditarContacto.aspx?id=<%# Eval("IdContacto") %>" class="btn btn-warning" target="_blank">Editar</a>
                                                    <asp:Button ID="btnDelete" runat="server" CausesValidation="False" CommandName="Delete" CssClass="btn btn-danger" Text="Eliminar" OnClientClick="return confirm('¿Está seguro de eliminar este contacto?');"></asp:Button>
                                                </ItemTemplate>
                                            </asp:TemplateField>

                                        </Columns>

                                    </asp:GridView>
                                    <asp:HiddenField ID="dataGeographic" runat="server"></asp:HiddenField>
                                </ContentTemplate>
                            </asp:UpdatePanel>
                        </div>
                    </div>
                    <div class="col-lg-8 border tab-pane fade" id="map" runat="server">
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
    <script async="async" defer="defer"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBprTqFBiMFOQTGJvnvhP2fZ3Swa1NEJwQ&libraries=drawing,places">
    </script>
</asp:Content>
