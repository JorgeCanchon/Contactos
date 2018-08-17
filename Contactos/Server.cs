using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Sockets;
using System.Net;

namespace Contactos
{
    public class Server
    {
        public Server()
        {
            TcpListener server = new TcpListener(IPAddress.Parse("127.0.0.1"), 80);

            server.Start();
           // Console.WriteLine("El server se ha iniciado en 127.0.0.1:80.{0}Esperando una conexión...", Environment.NewLine);

            TcpClient client = server.AcceptTcpClient();

            //Console.WriteLine("Un cliente conectado.");
        }
    }
}