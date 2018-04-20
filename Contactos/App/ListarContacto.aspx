<%@ Page Title="" Language="C#" MasterPageFile="~/App/MasterPage.Master" AutoEventWireup="true" CodeBehind="ListarContacto.aspx.cs" Inherits="Contactos.App.ListarContacto" %>
<%@ Register TagPrefix="grid" TagName="Grid" Src="~/App/ControlUsers/GridContacto.ascx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent1" runat="server">
    <div class="col-lg-12 center">
        <h2><b>Contactos</b></h2>
    </div>
    <div class="col-lg-12">
        &nbsp;
    </div>
   <grid:Grid runat="server"/> 
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
