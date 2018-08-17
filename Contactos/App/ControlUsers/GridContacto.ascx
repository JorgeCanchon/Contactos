<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="GridContacto.ascx.cs" Inherits="Contactos.App.ControlUsers.GridContacto" %>
    <div class="table-responsive">
        <asp:UpdateProgress runat="server" ID="UpdateProgress1" AssociatedUpdatePanelID="UpdatePanel1">
            <ProgressTemplate>
                <div class="loader" id="loader"></div>
            </ProgressTemplate>
        </asp:UpdateProgress>
        <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="GridView_Contacto" EventName="PageIndexChanging" />
            </Triggers>
            <ContentTemplate>
                <asp:Button Text="Actualizar" runat="server" ID="update" CssClass="btn btn-default" OnClick="update_Click"/>
                <label class="pull-right"> <asp:Label Text="Última actualización - " runat="server" ID="labelUpdate"/></label>
                <div class="col-lg-12">
                    &nbsp;
                </div>
                <asp:GridView 
                    runat="server" ID="GridView_Contacto"  
                    AutoGenerateColumns="False"  
                    datakeynames="IdContacto" 
                    CssClass="table table-bordered bs-table" 
                    OnRowDeleting="GridView_Contacto_RowDeleting" 
                    AllowPaging="True" PageSize="10" OnPageIndexChanging="GridView_Contacto_PageIndexChanging"
                    EnableSortingAndPagingCallbacks="true" 
                    OnSorting="gvContact_Sorting" AllowSorting="true" > 
                    <PagerStyle CssClass="pagination-ys" />
                    <EmptyDataRowStyle BackColor="aliceblue" CssClass="center"/>
                    <%--
                    Paginador...<pagertemplate>  
                        <div class="row" style="margin-top:20px;">
                            <div class="col-lg-1" style="text-align:right;">
                                <h5><asp:label id="MessageLabel" text="Ir a la pág." runat="server" /></h5>
                            </div>
                             <div class="col-lg-1" style="text-align:left;">
                                <asp:dropdownlist id="PageDropDownList" Width="50px" autopostback="true" onselectedindexchanged="PageDropDownList_SelectedIndexChanged" runat="server" CssClass="form-control" /></h3>
                            </div>
                            <div class="col-lg-10" style="text-align:right;">
                                <h3><asp:label id="CurrentPageLabel" runat="server" CssClass="label label-warning" /></h3>
                            </div>
                        </div>      
                    </pagertemplate>  --%> 
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
            </ContentTemplate>
        </asp:UpdatePanel>
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
